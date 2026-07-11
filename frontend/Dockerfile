FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ARG VITE_CDN_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CDN_URL=$VITE_CDN_URL

RUN npm run build

FROM alpine:3.19 AS production

COPY --from=builder /app/dist /dist

CMD ["sh", "-c", "mkdir -p /output && cp -r /dist/. /output/ && sleep infinity"]
