from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
import logging

from .schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    UserResponse,
    MessageResponse,
)
from .models import UserInDB
from .utils import create_user, authenticate_user, create_user_tokens
from .dependencies import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=TokenResponse)
async def register_user(payload: UserRegisterRequest):
    """
    Register a new user and return tokens + profile
    """
    try:
        user = await create_user(payload)
        token_data = create_user_tokens(user)

        user_response = UserResponse(
            id=str(user.id),
            email=user.email,
            full_name=user.full_name,
            username=user.username,
            role=user.role,
            is_active=user.is_active,
            email_verified=user.email_verified,
            phone=user.phone,
            created_at=user.created_at,
            last_login_at=user.last_login_at,
        )

        token_response = TokenResponse(
            access_token=token_data["access_token"],
            refresh_token=token_data["refresh_token"],
            token_type=token_data["token_type"],
            expires_in=token_data["expires_in"],
            user=user_response,
        )

        logger.info(f"✅ User registered: {user.email}")
        return JSONResponse(content=token_response.to_dict(), status_code=201)

    except ValueError as e:
        logger.warning(f"⚠️ Registration failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"❌ Registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user account",
        )


@router.post("/login", response_model=TokenResponse)
async def login_user(payload: UserLoginRequest):
    """
    Authenticate user and return tokens + profile
    """
    user = await authenticate_user(payload.email, payload.password)

    if not user:
        logger.warning(f"❌ Login failed for {payload.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token_data = create_user_tokens(user)

    user_response = UserResponse(
        id=str(user.id),
        email=user.email,
        full_name=user.full_name,
        username=user.username,
        role=user.role,
        is_active=user.is_active,
        email_verified=user.email_verified,
        phone=user.phone,
        created_at=user.created_at,
        last_login_at=user.last_login_at,
    )

    token_response = TokenResponse(
        access_token=token_data["access_token"],
        refresh_token=token_data["refresh_token"],
        token_type=token_data["token_type"],
        expires_in=token_data["expires_in"],
        user=user_response,
    )

    logger.info(f"✅ User logged in: {user.email}")
    return JSONResponse(content=token_response.to_dict())


@router.get("/profile", response_model=UserResponse)
async def get_user_profile(current_user: UserInDB = Depends(get_current_user)):
    """
    Get full user profile of the currently logged-in user
    """
    user_response = UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        full_name=current_user.full_name,
        username=current_user.username,
        role=current_user.role,
        is_active=current_user.is_active,
        email_verified=current_user.email_verified,
        phone=current_user.phone,
        created_at=current_user.created_at,
        last_login_at=current_user.last_login_at,
    )

    logger.info(f"👤 Profile accessed: {current_user.email}")
    return JSONResponse(content=user_response.to_dict())


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: UserInDB = Depends(get_current_user)):
    """
    Shortcut to get current logged-in user info
    """
    user_response = UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        full_name=current_user.full_name,
        username=current_user.username,
        role=current_user.role,
        is_active=current_user.is_active,
        email_verified=current_user.email_verified,
        phone=current_user.phone,
        created_at=current_user.created_at,
        last_login_at=current_user.last_login_at,
    )

    return JSONResponse(content=user_response.to_dict())


@router.post("/logout", response_model=MessageResponse)
async def logout_user(current_user: UserInDB = Depends(get_current_user)):
    """
    Logout current user (invalidate token if implemented)
    """
    message_response = MessageResponse("Successfully logged out", True)
    logger.info(f"👋 User logged out: {current_user.email}")
    return JSONResponse(content=message_response.to_dict())

