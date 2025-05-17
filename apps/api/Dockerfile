FROM node:20-slim AS builder

# setup api
WORKDIR /apps/api
RUN apk add --no-cache sqlite
COPY ./apps/api .
RUN npm install && npm run build

# runtime
FROM builder AS runtime

# copy api code
WORKDIR /apps/api
COPY --from=builder /apps/api/dist .
RUN npx drizzle-kit push

