# Use an official lightweight Node.js image
FROM node:20-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first (to optimize caching)
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the app files
COPY . .

# Set executable permission for the bin script
RUN chmod +x index.js

# Define the default command (if your bin script is "mycommand" in package.json)
ENTRYPOINT ["npx", "rwc"]

