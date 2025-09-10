# ---------- Stage 1: Frontend Build ----------
FROM node:20-alpine AS frontend-build

WORKDIR /frontend

# Copy package files and install dependencies
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# Copy frontend source code
COPY frontend/ .

#  Ensure vite is available (if not in package.json, install it here)
RUN npm install vite --save-dev

# Build static files
RUN npx vite build

# ---------- Stage 2: Backend ----------
FROM python:3.11-slim AS backend

WORKDIR /app

# Install Python deps
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/app ./app

# Copy frontend build output into backend static folder
COPY --from=frontend-build /frontend/dist ./app/static

EXPOSE 8000

# Start FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
