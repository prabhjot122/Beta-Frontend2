# Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY vite.config.ts ./
COPY remix.config.js ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Expose the production port
EXPOSE 3000

# Start the Remix production server
CMD ["npm", "run", "start"]
