# Multi-stage build for hosseini.net Next.js app
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build with production env
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Build args for public env vars (add yours as needed)
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Build the app (uses env-cmd with .env.production from context)
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./

# Copy i18n messages
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages

# Install only production dependencies
RUN npm ci --omit=dev

USER nextjs

EXPOSE 3313

ENV PORT=3313
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]