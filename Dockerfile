FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS build
RUN bun add -g pnpm

# Copy root workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy package.json files for the app and its dependency to cache install
COPY packages/docs/package.json ./packages/docs/
COPY packages/corpus/package.json ./packages/corpus/

# Install dependencies (resolves the workspace link)
RUN pnpm install --frozen-lockfile

# Copy the actual source code for both packages
COPY packages/docs ./packages/docs
COPY packages/corpus ./packages/corpus

# Build the package
RUN pnpm --filter corpus-docs build

# Verify build output
RUN find ./packages/docs/dist -maxdepth 2

FROM base AS release
WORKDIR /usr/src/app

# Copy the built assets
COPY --from=build /usr/src/app/packages/docs/dist .

EXPOSE 3000
ENV NODE_ENV=production

# Verification of the release structure
RUN ls -R .

CMD ["bun", "run", "index.js"]
