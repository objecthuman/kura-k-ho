import httpx
from typing import Dict, Any, List, TypedDict
from src.config import settings


class SearchResult(TypedDict, total=False):
    title: str
    link: str
    snippet: str
    position: int
    date: str


class SearchResponse(TypedDict, total=False):
    searchParameters: Dict[str, Any]
    organic: List[SearchResult]
    error: str


class NewsArticle(TypedDict):
    title: str
    link: str
    date: str


async def search_google(query: str) -> SearchResponse:
    url: str = settings.SERPER_API_URL

    payload: Dict[str, str] = {"q": query, "gl": "np"}

    headers: Dict[str, str] = {
        "X-API-KEY": settings.SERPER_API_KEY,
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url, headers=headers, json=payload, timeout=30.0
            )
            response.raise_for_status()
            return response.json()

    except Exception as e:
        print(f"Error searching Google: {e}")
        return {"error": str(e)}


async def search_nepal_news(topic: str) -> List[NewsArticle]:
    query: str = f"{topic} (site:english.onlinekhabar.com OR site:kathmandupost.com OR site:thehimalayantimes.com OR site:nepalitimes.com OR site:theannapurnaexpress.com)"

    search_results: SearchResponse = await search_google(query)

    if "error" in search_results:
        return []

    organic_results: List[SearchResult] = search_results.get("organic", [])
    news_articles: List[NewsArticle] = []

    for result in organic_results:
        article: NewsArticle = {
            "title": result.get("title", ""),
            "link": result.get("link", ""),
            "date": result.get("date", ""),
        }
        news_articles.append(article)

    return news_articles
