# Base Image
FROM node:18

# Set Working Directory
WORKDIR /app

# Copy package.json and related config files first to leverage Docker layer caching
COPY package.json package-lock.json remix.config.js tsconfig.json ./

# Install Dependencies
RUN npm install

# Copy Entire App Source
COPY . .

# Build the App
RUN npm run build

# Expose Production Port
EXPOSE 3000

# Start the Production Server
CMD ["npm", "run", "start"]
