# Указываем базовый образ
FROM node:18

# Создаем директорию приложения
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Копируем все файлы проекта в рабочую директорию
COPY . .

