# Single image: builds the store and the API, then the API serves both.
# Must be a glibc linux/amd64 image: pnpm-workspace.yaml drops every other
# platform's native binaries.
FROM --platform=linux/amd64 node:24-slim

WORKDIR /app
RUN npm install -g pnpm@10

COPY . .
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production
RUN pnpm --filter @workspace/store run build \
 && pnpm --filter @workspace/api-server run build

ENV STATIC_DIR=/app/artifacts/store/dist/public
ENV PORT=8080
EXPOSE 8080

CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
