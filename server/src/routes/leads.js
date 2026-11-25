import { Router } from 'express';
import multer from 'multer';
import { rateLimit } from 'express-rate-limit';
import { config } from '../config.js';
import { createLead } from '../db.js';
import { forwardLeadToCrm } from '../crm.js';
import { validateLead } from '../validate.js';
import {
  hashIp,
  isEmailRateLimited,
  persistCv,
  removeStoredCv,
  sanitizeUserAgent,
  scanWithClamav,
  validateCvFile,
} from '../security.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.maxCvBytes,
    files: 1,
    fields: 5,
    fieldSize: 64 * 1024,
    parts: 10,
  },
});

const limiter = rateLimit({
  windowMs: config.rateLimits.leadWindowMs,
  limit: config.rateLimits.leadMax,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many enquiries were sent from this connection. Please wait and try again.' },
});

const router = Router();

function parsePayload(request) {
  if (request.is('multipart/form-data')) {
    if (typeof request.body?.lead !== 'string') return null;
    try {
      return JSON.parse(request.body.lead);
    } catch {
      return null;
    }
  }
  return request.body;
}

async function handleLead(request, response, next) {
  const payload = parsePayload(request);
  if (!payload || typeof payload !== 'object') {
    return response.status(400).json({ error: 'The request could not be read.' });
  }

  if (String(payload?.data?.website || '').trim()) {
    return response.status(400).json({ error: 'This request could not be processed.' });
  }

  const validation = validateLead(payload);
  if (!validation.ok) {
    return response.status(validation.status).json({ error: validation.message });
  }
  const lead = validation.lead;

  if (isEmailRateLimited(lead.email)) {
    return response.status(429).json({ error: 'Too many enquiries were sent for this contact. Please wait and try again.' });
  }

  let attachment;
  try {
    if (request.file) {
      const cv = validateCvFile(request.file);
      if (!cv.ok) {
        return response.status(422).json({ error: 'The attached CV must be a PDF, DOC or DOCX file under 5 MB.' });
      }
      if (!config.clamav.host) {
        return response.status(503).json({ error: 'CV upload is not enabled on this deployment. Send the enquiry without a file.' });
      }
      let scan;
      try {
        scan = await scanWithClamav(request.file.buffer);
      } catch {
        return response.status(503).json({ error: 'The CV could not be scanned right now. Send the enquiry without a file or try again later.' });
      }
      if (scan.infected) {
        return response.status(422).json({ error: 'The attached file was rejected by the security scan.' });
      }
      const storedName = await persistCv(request.file.buffer, cv.extension);
      attachment = {
        originalName: cv.originalName,
        storedName,
        mimeType: cv.mimeType,
        byteSize: request.file.size,
        sha256: cv.sha256,
      };
    }

    const result = await createLead(
      {
        ...lead,
        ipHash: hashIp(request.ip),
        userAgent: sanitizeUserAgent(request.get('user-agent')),
      },
      attachment,
    );

    // Forward to the CRM after the lead is safely stored; never blocks or fails the response.
    forwardLeadToCrm(lead, result.reference, Boolean(attachment)).catch(() => {});

    return response
      .status(201)
      .set('Cache-Control', 'no-store')
      .json({ reference: result.reference, receivedAt: new Date().toISOString() });
  } catch (error) {
    if (attachment) await removeStoredCv(attachment.storedName);
    return next(error);
  }
}

router.post('/', limiter, (request, response, next) => {
  if (!request.is('multipart/form-data')) return handleLead(request, response, next);
  return upload.single('cv')(request, response, (error) => {
    if (error) return next(error);
    return handleLead(request, response, next);
  });
});

export default router;
