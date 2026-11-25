import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config.js';
import { verifyConnection } from './db.js';
import leadsRouter from './routes/leads.js';
import adminRouter from './routes/admin.js';

const allowedOrigins = new Set(config.corsOrigins);

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  if (config.trustProxy) app.set('trust proxy', config.trustProxy);

  app.use(helmet());
  app.use((request, response, next) => {
    const origin = request.get('origin');
    if (origin && !allowedOrigins.has(origin)) {
      return response.status(403).json({ error: 'Origin not allowed.' });
    }
    return next();
  });
  app.use(cors({
    origin: (origin, callback) => callback(null, !origin || allowedOrigins.has(origin)),
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
  }));

  app.use((request, response, next) => {
    const started = Date.now();
    response.on('finish', () => {
      console.log(`${request.method} ${request.path} ${response.statusCode} ${Date.now() - started}ms`);
    });
    next();
  });

  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', async (request, response) => {
    try {
      await verifyConnection();
      response.set('Cache-Control', 'no-store').json({ status: 'ok', time: new Date().toISOString() });
    } catch {
      response.status(503).json({ status: 'degraded' });
    }
  });

  app.use('/api/leads', leadsRouter);
  app.use('/api/admin', adminRouter);

  app.use((request, response) => {
    response.status(404).json({ error: 'Not found.' });
  });

  app.use((error, request, response, next) => {
    if (response.headersSent) return next(error);
    if (error?.name === 'MulterError') {
      const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
      const message = error.code === 'LIMIT_FILE_SIZE' ? 'The attached file is too large.' : 'The upload could not be processed.';
      return response.status(status).json({ error: message });
    }
    if (error?.type === 'entity.too.large') {
      return response.status(413).json({ error: 'The request is too large.' });
    }
    if (error?.type === 'entity.parse.failed') {
      return response.status(400).json({ error: 'The request could not be read.' });
    }
    console.error('[backend] Unhandled error:', error?.code || error?.message || 'unknown');
    return response.status(500).json({ error: 'The request could not be completed.' });
  });

  return app;
}
