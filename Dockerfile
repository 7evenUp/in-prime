# Указываем базовый образ
FROM node:18
WORKDIR /app
ENV NEXT_PUBLIC_ID_URL=https://id.crypton.xyz
ENV NEXT_PUBLIC_PROMOS=CRYPTON
ENV NEXT_PUBLIC_EVENT_URL=https://events-api.crypton.xyz
ENV NEXT_WALLET_CONNECT_PROJECT_ID=c38d93a6461fbd2f984ef33364e5b3c9
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi
COPY . .
RUN npm run build
