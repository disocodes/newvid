# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++ git ffmpeg

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Create tsconfig for server
RUN echo '{"compilerOptions":{"target":"ES2020","module":"ES2020","moduleResolution":"node","esModuleInterop":true,"outDir":"dist-server"},"include":["server/**/*"]}' > server-tsconfig.json

# Compile server
RUN npx tsc -p server-tsconfig.json

# Production stage
FROM nginx:alpine

# Install runtime dependencies
RUN apk add --no-cache ffmpeg nodejs npm curl

WORKDIR /app

# Copy build artifacts and server files
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/dist-server /app/server
COPY --from=build /app/package*.json ./

# Install production dependencies
RUN npm install --production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start both nginx and node server
CMD nginx && cd /app && node server/index.js
