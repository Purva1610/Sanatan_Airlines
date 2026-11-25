FROM node:24-slim

ENV NODE_ENV=production
WORKDIR /app

COPY server/package.json server/package-lock.json ./
# Optional local root CA for development machines behind TLS inspection.
COPY docker/certs /tmp/certs
RUN if ls /tmp/certs/*.crt >/dev/null 2>&1; then cat /tmp/certs/*.crt > /tmp/local-ca.pem; export NODE_EXTRA_CA_CERTS=/tmp/local-ca.pem; fi; npm ci --omit=dev && npm cache clean --force

# The API reuses the website's Zod schemas.
COPY src/leadSchemas.js ./src/leadSchemas.js
COPY server ./server

WORKDIR /app/server
RUN mkdir -p /app/server/uploads/cv && chown -R node:node /app/server/uploads

USER node
EXPOSE 4000
CMD ["node", "src/index.js"]
