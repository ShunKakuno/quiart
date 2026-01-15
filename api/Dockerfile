FROM oven/bun:1

WORKDIR /api

COPY package.json bun.lock ./
RUN bun install

COPY prisma ./prisma
RUN bunx prisma generate
COPY . .

CMD ["sh", "start.sh"]
