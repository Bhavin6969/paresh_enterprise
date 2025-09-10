# frontend/Dockerfile

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (no node_modules!)
COPY package.json package-lock.json* ./

# Install dependencies inside container
RUN npm ci
# Copy the rest of the frontend code
COPY . .

# Expose port
EXPOSE 5173

# Start frontend
CMD ["npm", "run", "dev", "--", "--host"]
