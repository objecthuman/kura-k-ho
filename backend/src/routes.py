from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from src.db.pg_session import get_db_session
from src.db.models.chat_sesion import ChatSession
from src.dependencies import get_current_user

router = APIRouter(prefix="/sessions", tags=["sessions"])


class SessionResponse(BaseModel):
    id: UUID
    title: str
    user_id: UUID

    class Config:
        from_attributes = True


@router.post("/", response_model=SessionResponse)
async def create_session(
    db: AsyncSession = Depends(get_db_session),
    current_user=Depends(get_current_user),
):
    try:
        new_session = ChatSession(
            user_id=UUID(current_user.id),
        )

        db.add(new_session)
        await db.commit()
        await db.refresh(new_session)

        return new_session

    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
