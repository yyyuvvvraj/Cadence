FROM node:20-alpine

WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the server with node (use nodemon only in dev)
CMD ["node", "server.js"]
