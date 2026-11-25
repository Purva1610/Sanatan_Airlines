import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { config } from '../config.js';
import { getLead, listLeads, updateLead } from '../db.js';
import { teamByForm } from '../validate.js';
import { safeTokenEqual } from '../security.js';

const STATUSES = new Set(['new', 'in_progress', 'contacted', 'closed', 'spam']);
const TEAMS = new Set(Object.values(teamByForm));
const FORM_TYPES = new Set(Object.keys(teamByForm));

const limiter = rateLimit({
  windowMs: config.rateLimits.adminWindowMs,
  limit: config.rateLimits.adminMax,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many admin requests. Please slow down.' },
});

function requireAdmin(request, response, next) {
  if (!config.adminToken) {
    return response.status(503).json({ error: 'Admin API is not configured.' });
  }
  const header = request.get('authorization') || '';
  const token = header.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  if (!token || !safeTokenEqual(token, config.adminToken)) {
    response.set('WWW-Authenticate', 'Bearer');
    return response.status(401).json({ error: 'Unauthorized.' });
  }
  return next();
}

function parseId(value) {
  const id = Number.parseInt(value, 10);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

const router = Router();

router.use(limiter, requireAdmin);
router.use((request, response, next) => {
  response.set('Cache-Control', 'no-store');
  next();
});

router.get('/leads', async (request, response, next) => {
  try {
    const page = Math.max(1, Number.parseInt(request.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(request.query.limit, 10) || 25));
    const status = typeof request.query.status === 'string' && STATUSES.has(request.query.status) ? request.query.status : undefined;
    const team = typeof request.query.team === 'string' && TEAMS.has(request.query.team) ? request.query.team : undefined;
    const formType = typeof request.query.formType === 'string' && FORM_TYPES.has(request.query.formType) ? request.query.formType : undefined;
    const query = typeof request.query.q === 'string' ? request.query.q.trim().slice(0, 100) : '';

    const result = await listLeads({ status, team, formType, query, page, limit });
    return response.json(result);
  } catch (error) {
    return next(error);
  }
});

router.get('/leads/:id', async (request, response, next) => {
  try {
    const id = parseId(request.params.id);
    if (!id) return response.status(400).json({ error: 'Invalid lead id.' });
    const lead = await getLead(id);
    if (!lead) return response.status(404).json({ error: 'Lead not found.' });
    return response.json({ lead });
  } catch (error) {
    return next(error);
  }
});

router.patch('/leads/:id', async (request, response, next) => {
  try {
    const id = parseId(request.params.id);
    if (!id) return response.status(400).json({ error: 'Invalid lead id.' });

    const body = request.body && typeof request.body === 'object' ? request.body : {};
    const keys = Object.keys(body);
    if (keys.length === 0) return response.status(400).json({ error: 'No changes were provided.' });
    if (keys.some((key) => key !== 'status' && key !== 'adminNotes')) {
      return response.status(400).json({ error: 'Unsupported change.' });
    }

    const changes = {};
    if ('status' in body) {
      if (typeof body.status !== 'string' || !STATUSES.has(body.status)) {
        return response.status(400).json({ error: 'Invalid lead status.' });
      }
      changes.status = body.status;
    }
    if ('adminNotes' in body) {
      if (typeof body.adminNotes !== 'string' || body.adminNotes.length > 5000) {
        return response.status(400).json({ error: 'Notes must be text under 5000 characters.' });
      }
      changes.adminNotes = body.adminNotes;
    }

    const existing = await getLead(id);
    if (!existing) return response.status(404).json({ error: 'Lead not found.' });

    await updateLead(id, changes);
    const lead = await getLead(id);
    return response.json({ lead });
  } catch (error) {
    return next(error);
  }
});

export default router;
