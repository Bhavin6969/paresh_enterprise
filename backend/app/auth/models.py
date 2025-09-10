from datetime import datetime, timezone
from typing import Optional, Dict, Any

class UserRole:
    ADMIN = "admin"
    USER = "user"
    MODERATOR = "moderator"

class UserBase:
    def __init__(self, email: str, full_name: str, username: str, is_active: bool = True, role: str = UserRole.USER):
        self.email = email
        self.full_name = full_name
        self.username = username
        self.is_active = is_active
        self.role = role

class UserInDB(UserBase):
    def __init__(self, id: str, email: str, full_name: str, username: str, password_hash: str, 
                 is_active: bool = True, role: str = UserRole.USER, created_at: datetime = None, 
                 updated_at: datetime = None, last_login_at: datetime = None, 
                 email_verified: bool = False, phone: str = None, address: dict = None, 
                 preferences: dict = None, profile_picture: str = None):
        super().__init__(email, full_name, username, is_active, role)
        self.id = id
        self.password_hash = password_hash
        self.created_at = created_at or datetime.now(timezone.utc)
        self.updated_at = updated_at or datetime.now(timezone.utc)
        self.last_login_at = last_login_at
        self.email_verified = email_verified
        self.phone = phone
        self.address = address or {}
        self.preferences = preferences or {}
        self.profile_picture = profile_picture

    @classmethod
    def from_dict(cls, data: dict):
        return cls(
            id=str(data.get("_id", "")),
            email=data.get("email", ""),
            full_name=data.get("full_name", ""),
            username=data.get("username", ""),
            password_hash=data.get("password_hash", ""),
            is_active=data.get("is_active", True),
            role=data.get("role", UserRole.USER),
            created_at=data.get("created_at"),
            updated_at=data.get("updated_at"),
            last_login_at=data.get("last_login_at"),
            email_verified=data.get("email_verified", False),
            phone=data.get("phone"),
            address=data.get("address"),
            preferences=data.get("preferences"),
            profile_picture=data.get("profile_picture")
        )
