# Step 1. Rebuild the source code only when needed
FROM node:14.17.1-alpine as base

ENV LANG=C.UTF-8 \
    APP_ROOT=/app
WORKDIR $APP_ROOT

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm install --force; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY next-i18next.config.js .
COPY tsconfig.json .
COPY .env .env.production
# Build Next.js based on the preferred package manager

# Start Next.js in development mode based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else yarn build; \
  fi

EXPOSE 3000
# ENV PORT 3000

# CMD node server.js
CMD [ "yarn", "start" ]