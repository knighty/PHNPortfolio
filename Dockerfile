# Build App
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN --mount=type=cache,target=./node_modules/.cache/webpack npm run build:prod

# Web Server
FROM nginx:latest
COPY --link default.conf /etc/nginx/conf.d/default.conf
COPY --link --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80