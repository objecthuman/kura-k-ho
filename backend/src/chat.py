from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID

from supabase import acreate_client

from src.db.pg_session import get_db_session
from src.db.models.chat_sesion import ChatSession
from src.db.models.chat_message import ChatMessage
from src.dependencies import get_current_user
from src.scraper.annapurna_scraper import scrape_news
from src.scraper.google_search import NewsArticle, search_nepal_news
from src.config import settings

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    user_query: str


class ChatResponse(BaseModel):
    message: str
    session_id: UUID


class ScrapedNews(BaseModel):
    title: str
    body: str
    date: str


async def scrape_link(article: NewsArticle) -> ScrapedNews:
    if article["link"].startswith("https://anarpurna.com"):
        await scrape_news(article["link"])


async def start_chat_flow(
    session_id: UUID,
    user_query: str,
    user_id: str,
    db: AsyncSession,
):
    try:
        searching_message = (
            "Searching for news in the following sites: "
            "english.onlinekhabar.com, kathmandupost.com, thehimalayantimes.com, "
            "nepalitimes.com, theannapurnaexpress.com"
        )

        client = await acreate_client(settings.SUPABASE_URL, settings.SUPABASE_API_KEY)

        channel = client.channel(str(session_id))

        await channel.send_broadcast(
            event="message-broadcast",
            data={
                "session_id": str(session_id),
                "role": "assistant",
                "content": searching_message,
            },
        )

        message = ChatMessage(
            session_id=session_id,
            role="assistant",
            content=searching_message,
        )
        db.add(message)
        await db.commit()

        news_articles = await search_nepal_news(user_query)

        # scraped_artciles = await asyncio.gather()

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
            db=db,
        )

        return ChatResponse(message="Chat processing started", session_id=session_id)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
