FROM node:24-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Optional local root CA for development machines behind TLS inspection.
COPY docker/certs /tmp/certs
RUN if ls /tmp/certs/*.crt >/dev/null 2>&1; then cat /tmp/certs/*.crt > /tmp/local-ca.pem; export NODE_EXTRA_CA_CERTS=/tmp/local-ca.pem; fi; npm ci

FROM node:24-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the browser bundle at build time.
ARG SITE_URL=
ARG NEXT_PUBLIC_SITE_URL=
ARG NEXT_PUBLIC_LEAD_API_URL=
ARG NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=false
ARG NEXT_PUBLIC_WHATSAPP_NUMBER=
ARG NEXT_PUBLIC_CONTACT_PHONE=
ARG NEXT_PUBLIC_CONTACT_EMAIL=
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=
ARG NEXT_PUBLIC_CONFIRMED_DESTINATIONS=[]
ARG ENABLE_HSTS=false
ENV SITE_URL=$SITE_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_LEAD_API_URL=$NEXT_PUBLIC_LEAD_API_URL \
    NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=$NEXT_PUBLIC_PRIVACY_POLICY_APPROVED \
    NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER \
    NEXT_PUBLIC_CONTACT_PHONE=$NEXT_PUBLIC_CONTACT_PHONE \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_CONFIRMED_DESTINATIONS=$NEXT_PUBLIC_CONFIRMED_DESTINATIONS \
    ENABLE_HSTS=$ENABLE_HSTS

RUN npm run build

FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
