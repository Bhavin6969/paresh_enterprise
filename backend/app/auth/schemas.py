from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


# --------- Request Schemas ---------

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str
    username: str
    phone: Optional[str] = None


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


# --------- Response Schemas ---------

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    username: str
    role: str
    is_active: bool
    email_verified: bool
    phone: Optional[str] = None
    created_at: Optional[datetime] = None
    last_login_at: Optional[datetime] = None


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int
    user: UserResponse


class MessageResponse(BaseModel):
    message: str
    success: bool = True
