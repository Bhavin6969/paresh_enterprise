# Use official Python image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements.txt from backend folder
COPY backend/requirements.txt ./requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY backend/app ./app

# Expose port
EXPOSE 8000

# Run Uvicorn with proper module path
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
