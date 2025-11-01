from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, ConfigDict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID
from datetime import datetime
from typing import List

from src.db.pg_session import get_db_session
from src.db.models.chat_sesion import ChatSession
from src.db.models.chat_message import ChatMessage
from src.dependencies import get_current_user
import traceback

router = APIRouter(prefix="/sessions", tags=["sessions"])


class SessionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    title: str | None
    user_id: UUID


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    session_id: UUID
    role: str
    content: str
    created_at: datetime
    updated_at: datetime


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

        return SessionResponse(
            id=new_session.id,
            title=None,
            user_id=current_user.id,
        )

    except Exception as e:
        await db.rollback()
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{session_id}/messages", response_model=List[MessageResponse])
async def get_session_messages(
    session_id: UUID,
    db: AsyncSession = Depends(get_db_session),
    current_user=Depends(get_current_user),
):
    try:
        result = await db.execute(
            select(ChatSession).where(
                ChatSession.id == session_id,
                ChatSession.user_id == UUID(current_user.id),
            )
        )
        session = result.scalar_one_or_none()

        if not session:
            raise HTTPException(
                status_code=404,
                detail="Session not found or you don't have access to it",
            )

        messages_result = await db.execute(
            select(ChatMessage)
            .where(ChatMessage.session_id == session_id)
            .order_by(ChatMessage.created_at)
        )
        messages = messages_result.scalars().all()

        return messages

    except HTTPException:
        traceback.print_exc()
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
