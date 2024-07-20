# Build stage
FROM node:lts AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Production stage
FROM node:lts-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built assets from the build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Add node_modules/.bin to PATH
ENV PATH ./node_modules/.bin:$PATH

# Expose the port Next.js runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
