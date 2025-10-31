from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID

from src.db.pg_session import get_db_session
from src.db.models.chat_sesion import ChatSession
from src.dependencies import get_current_user
from src.scraper.google_search import search_nepal_news

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    user_query: str


class ChatResponse(BaseModel):
    message: str
    session_id: UUID


async def start_chat_flow(
    session_id: UUID,
    user_query: str,
    user_id: str,
):
    try:
        news_articles = await search_nepal_news(user_query)

        if not news_articles:
            print("No news articles found")
            return

        print(f"Found {len(news_articles)} news articles")

        for article in news_articles:
            print(f"Title: {article['title']}")
            print(f"Link: {article['link']}")
            print(f"Date: {article['date']}")
            print("---")

    except Exception as e:
        print(f"Error in chat flow: {e}")


@router.post("/{session_id}/chat", response_model=ChatResponse)
async def chat(
    session_id: UUID,
    request: ChatRequest,
    background_tasks: BackgroundTasks,
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

        background_tasks.add_task(
            start_chat_flow,
            session_id=session_id,
            user_query=request.user_query,
            user_id=current_user.id,
        )

        return ChatResponse(message="Chat processing started", session_id=session_id)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
