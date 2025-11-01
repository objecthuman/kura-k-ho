import asyncio
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID
from src.llm.intent import validate_news_query
from src.llm.answer import generate_answer

from supabase import acreate_client

from src.db.pg_session import get_db_session
from src.db.models.chat_sesion import ChatSession
from src.db.models.chat_message import ChatMessage
from src.dependencies import get_current_user
from src.scraper.annapurna_scraper import scrape_news as scrape_annapurna
from src.scraper.online_khabar_scrape import scrape_news as scrape_online_khabar
from src.scraper.kathmandupost_scraper import scrape_news as scrape_kathmandupost
from src.scraper.himalayantime_scraper import scrape_news as scrape_himalayantimes
from src.scraper.nepalitimes_scraper import scrape_news as scrape_nepalitimes
from src.scraper.google_search import NewsArticle, search_nepal_news
from src.llm.summarizer import summarize
from src.config import settings
from src.scraper.types import ScrapedNews

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    user_query: str


class ChatResponse(BaseModel):
    message: str
    session_id: UUID


async def send_message(channel, db: AsyncSession, session_id: UUID, content: str):
    await channel.send_broadcast(
        event="message-broadcast",
        data={
            "session_id": str(session_id),
            "role": "assistant",
            "content": content,
        },
    )

    message = ChatMessage(
        session_id=session_id,
        role="assistant",
        content=content,
    )
    db.add(message)
    await db.commit()


async def scrape_link(article: NewsArticle) -> ScrapedNews | None:
    link = article["link"]
    source = ""

    if "english.onlinekhabar.com" in link:
        result = await scrape_online_khabar(link)
        source = "Online Khabar"
    elif "kathmandupost.com" in link:
        result = await scrape_kathmandupost(link)
        source = "The Kathmandu Post"
    elif "thehimalayantimes.com" in link:
        result = await scrape_himalayantimes(link)
        source = "The Himalayan Times"
    elif "nepalitimes.com" in link:
        result = await scrape_nepalitimes(link)
        source = "Nepali Times"
    elif "theannapurnaexpress.com" in link:
        result = await scrape_annapurna(link)
        source = "The Annapurna Express"
    else:
        print(f"No scraper available for: {link}")
        return None

    if result:
        return ScrapedNews(
            title=result["heading"],
            body=result["body"],
            date=article["date"],
            source=source,
        )

    return None


async def scrape_articles(news_articles: list[NewsArticle]) -> list[ScrapedNews]:
    scraped_articles = await asyncio.gather(
        *[scrape_link(article) for article in news_articles]
    )
    return [article for article in scraped_articles if article is not None]


async def summarize_articles(articles: list[ScrapedNews]) -> list[str]:
    summaries = await asyncio.gather(
        *[
            summarize(
                {
                    "heading": article["title"],
                    "body": article["body"],
                }
            )
            for article in articles
        ]
    )
    return [summary for summary in summaries if summary is not None]


async def start_chat_flow(
    session_id: UUID,
    user_query: str,
    db: AsyncSession,
):
    try:
        client = await acreate_client(settings.SUPABASE_URL, settings.SUPABASE_API_KEY)
        channel = client.channel(str(session_id))
        await channel.subscribe()

        intent_output = await validate_news_query(user_query=user_query)
        if not intent_output.is_valid:
            print(
                f"invalid question recieved:  {user_query}, reason: {intent_output.reason}, clarification message: {intent_output.clarification_message}"
            )
            await send_message(
                channel,
                db,
                session_id,
                intent_output.clarification_message,
            )
            return

        await channel.subscribe()

        searching_message = (
            "Searching for news in the following sites: "
            "english.onlinekhabar.com, kathmandupost.com, thehimalayantimes.com, "
            "nepalitimes.com, theannapurnaexpress.com"
        )
        await send_message(channel, db, session_id, searching_message)

        news_articles = await search_nepal_news(user_query)

        if not news_articles:
            await send_message(
                channel,
                db,
                session_id,
                "No particular news was found regarding your query.",
            )
            print("No news articles found")
            return

        print(f"Found {len(news_articles)} news articles")

        links_list = "\n".join([f"- {article['title']}" for article in news_articles])
        checking_message = f"Found {len(news_articles)} articles. Checking the following links:\n\n{links_list}"
        await send_message(channel, db, session_id, checking_message)

        valid_articles = await scrape_articles(news_articles)

        if not valid_articles:
            print("No articles could be scraped")
            await send_message(
                channel,
                db=db,
                session_id=session_id,
                content="something went wrong while getting news articles :(",
            )
            return

        print(f"Successfully scraped {len(valid_articles)} articles")

        summarizing_message = f"Summarizing {len(valid_articles)} articles..."
        await send_message(channel, db, session_id, summarizing_message)

        summaries = await summarize_articles(valid_articles)

        curating_message = "Finished summarizing. Creating a final response for you..."
        await send_message(channel, db, session_id, curating_message)

        summaries_with_sources = [
            {"source": article["source"], "summary": summary}
            for article, summary in zip(valid_articles, summaries)
            if summary is not None
        ]

        if not summaries_with_sources:
            print("No summaries were generated")
            return

        final_answer = await generate_answer(user_query, summaries_with_sources)

        if final_answer:
            await send_message(channel, db, session_id, final_answer)
            print("Final answer sent to user")
        else:
            await send_message(
                channel,
                db,
                session_id,
                "something went wrong while generating the final response :(",
            )
            print("Failed to generate final answer")

    except Exception as e:
        await send_message(
            channel,
            db,
            session_id,
            "Something went wrong while generating your response.",
        )
        print(f"Error in chat flow: {e}")
    finally:
        await channel.unsubscribe()


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
            db=db,
        )

        return ChatResponse(message="Chat processing started", session_id=session_id)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
