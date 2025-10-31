from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from supabase import create_client, Client
from src.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_API_KEY)


class SignupRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup")
async def signup(request: SignupRequest):
    try:
        response = supabase.auth.sign_up(
            {"email": request.email, "password": request.password}
        )

        if response.user:
            return {
                "message": "User created successfully",
                "user": response.user.model_dump(),
                "session": response.session.model_dump() if response.session else None,
            }
        else:
            raise HTTPException(status_code=400, detail="Failed to create user")

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(request: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password(
            {"email": request.email, "password": request.password}
        )

        if response.user and response.session:
            return {
                "message": "Login successful",
                "user": response.user.model_dump(),
                "session": response.session.model_dump(),
                "access_token": response.session.access_token,
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")

    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
