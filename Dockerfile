# 1️⃣ Use Node.js image to build the Vite.js app
FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2️⃣ Use NGINX to serve the built files
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Ensure the directory exists before copying files
RUN mkdir -p /usr/share/nginx/html

# Copy the built app from the builder stage
COPY --from=builder /app/dist .

# Copy a custom NGINX config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
