# ---------- Stage 1: Build Frontend ----------
FROM node:20-alpine AS frontend-build

WORKDIR /frontend

# Install bash (needed for npm scripts) and git (optional for some dependencies)
RUN apk add --no-cache bash git

# Copy package files and install dependencies
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# Copy source code
COPY frontend/ .

# Ensure node_modules/.bin is in PATH and build frontend
ENV PATH=/frontend/node_modules/.bin:$PATH
RUN npx vite build

# ---------- Stage 2: Backend ----------
FROM python:3.11-slim AS backend

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/app ./app

# Copy built frontend into backend's static folder
COPY --from=frontend-build /frontend/dist ./app/static

# Expose backend port
EXPOSE 8000

# Start FastAPI with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
