from datetime import datetime, timezone, timedelta
from typing import Optional
from passlib.context import CryptContext
from jose import jwt
from bson import ObjectId

from ..config import settings
from ..database import get_users_collection
from .models import UserInDB, UserRole
from .schemas import UserRegisterRequest

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days)

    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        return payload
    except:
        return None

async def create_user(user_data: UserRegisterRequest) -> UserInDB:
    users_collection = await get_users_collection()

    existing_user = await users_collection.find_one({
        "$or": [{"email": user_data.email}, {"username": user_data.username}]
    })

    if existing_user:
        raise ValueError("User already exists")

    now = datetime.now(timezone.utc)
    user_dict = {
        "email": user_data.email,
        "username": user_data.username,
        "full_name": user_data.full_name,
        "password_hash": get_password_hash(user_data.password),
        "phone": user_data.phone,
        "role": UserRole.USER,
        "is_active": True,
        "email_verified": False,
        "created_at": now,
        "updated_at": now,
        "preferences": {},
        "address": None,
        "profile_picture": None,
        "last_login_at": None
    }

    result = await users_collection.insert_one(user_dict)
    user_dict["_id"] = result.inserted_id

    return UserInDB.from_dict(user_dict)

async def authenticate_user(email: str, password: str) -> Optional[UserInDB]:
    users_collection = await get_users_collection()

    user_doc = await users_collection.find_one({"email": email})

    if not user_doc or not verify_password(password, user_doc["password_hash"]):
        return None

    if not user_doc.get("is_active", True):
        return None

    await users_collection.update_one(
        {"_id": user_doc["_id"]},
        {"$set": {"last_login_at": datetime.now(timezone.utc)}}
    )

    return UserInDB.from_dict(user_doc)

async def get_user_by_id(user_id: str) -> Optional[UserInDB]:
    users_collection = await get_users_collection()

    if not ObjectId.is_valid(user_id):
        return None

    user_doc = await users_collection.find_one({"_id": ObjectId(user_id)})

    if not user_doc:
        return None

    return UserInDB.from_dict(user_doc)

def create_user_tokens(user: UserInDB) -> dict:
    access_token_data = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
        "type": "access"
    }

    refresh_token_data = {
        "sub": str(user.id),
        "type": "refresh"
    }

    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    refresh_token_expires = timedelta(days=settings.refresh_token_expire_days)

    access_token = create_access_token(access_token_data, access_token_expires)
    refresh_token = create_refresh_token(refresh_token_data, refresh_token_expires)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "expires_in": settings.access_token_expire_minutes * 60
    }

async def create_admin_user() -> None:
    users_collection = await get_users_collection()

    admin_exists = await users_collection.find_one({"email": settings.admin_email})

    if admin_exists:
        return

    now = datetime.now(timezone.utc)
    admin_user = {
        "email": settings.admin_email,
        "username": "admin",
        "full_name": settings.admin_full_name,
        "password_hash": get_password_hash(settings.admin_password),
        "role": UserRole.ADMIN,
        "is_active": True,
        "email_verified": True,
        "created_at": now,
        "updated_at": now,
        "preferences": {},
        "address": None,
        "profile_picture": None,
        "last_login_at": None,
        "phone": None
    }

    await users_collection.insert_one(admin_user)
    print(f"Admin user created: {settings.admin_email}")