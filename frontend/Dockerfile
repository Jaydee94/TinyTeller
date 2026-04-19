# Frontend Dockerfile - multi-stage build
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies and build
COPY package.json package-lock.json* ./
COPY tsconfig.json ./
COPY index.html ./
COPY src ./src
RUN npm ci --silent
RUN npm run build

# Serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
