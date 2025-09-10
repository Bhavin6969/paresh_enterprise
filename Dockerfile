# ---------- Stage 1: Build Frontend ----------
FROM node:20-slim AS frontend-build

WORKDIR /frontend

# Copy package files and install dependencies
COPY frontend/package.json frontend/package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy frontend source code
COPY frontend/ ./

# Ensure all binaries in node_modules/.bin are executable
RUN chmod +x ./node_modules/.bin/*

# Build frontend using npx to avoid any PATH/permission issues
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
