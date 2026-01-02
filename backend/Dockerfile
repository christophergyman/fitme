FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Create data directory for SQLite
RUN mkdir -p /data

EXPOSE 3001

ENV DATABASE_PATH=/data/fitme.db
ENV PORT=3001

CMD ["node", "dist/index.js"]
