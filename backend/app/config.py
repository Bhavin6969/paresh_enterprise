"""Configuration settings"""
import os

class Settings:
    def __init__(self):
        self.mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        self.database_name = os.getenv("DATABASE_NAME", "paresh_enterprises")
        self.secret_key = os.getenv("SECRET_KEY", "your-super-secret-jwt-key-here-replace-with-random-string")
        self.algorithm = os.getenv("ALGORITHM", "HS256")
        self.access_token_expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
        self.refresh_token_expire_days = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))
        self.allowed_origins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:8080", "https://paresh-enterprise.onrender.com"]
        self.environment = os.getenv("ENVIRONMENT", "development")
        self.debug = os.getenv("DEBUG", "true").lower() == "true"
        self.host = os.getenv("HOST", "0.0.0.0")
        self.port = int(os.getenv("PORT", "8000"))
        self.admin_email = os.getenv("ADMIN_EMAIL", "paresh_udr@yahoo.in")
        self.admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
        self.admin_full_name = os.getenv("ADMIN_FULL_NAME", "Admin User")

settings = Settings()

def is_production() -> bool:
    return settings.environment.lower() == "production"

def is_debug() -> bool:
    return settings.debug and not is_production()