FROM node:20-slim AS builder

# setup web
WORKDIR /apps/web
RUN apk add --no-cache sqlite
COPY ./apps/web .
RUN npm install && npm run build

# runtime
FROM builder AS runtime


# copy web code
WORKDIR /apps/web
COPY --from=builder /apps/web/.next/standalone .
COPY --from=builder /apps/web/public ./public

