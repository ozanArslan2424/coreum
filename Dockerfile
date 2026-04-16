FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS build
COPY . .
RUN bun install --frozen-lockfile
RUN bun run --sequential --workspaces build

FROM base AS release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/packages/docs/dist .
COPY --from=build /usr/src/app/packages/docs/package.json .

EXPOSE 3000
ENV NODE_ENV=production

RUN ls -la .

CMD ["bun", "run", "index.js"]
