# Backend Dockerfile - multi-stage build
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
COPY tsconfig.json ./
COPY src ./src
RUN npm ci --silent
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json ./
EXPOSE 8080
CMD ["node", "dist/index.js"]
