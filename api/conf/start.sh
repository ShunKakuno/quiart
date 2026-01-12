#!/bin/sh
set -e

bunx prisma migrate deploy
bun run src/api.ts
