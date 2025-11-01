import httpx
from bs4 import BeautifulSoup
from src.scraper.types import ScrapedArticle


async def scrape_news(url: str) -> ScrapedArticle | None:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers={"User-Agent": "Mozilla/5.0"})
            response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        heading_tag = soup.select_one(
            "body > main > section.section__wrapper.section__wrapper-detailPage > div.background__overlay-top > div > div > div.single__column-info > h1"
        )
        heading = (
            heading_tag.get_text(strip=True) if heading_tag else "No heading found"
        )

        body_container = soup.select_one(
            "body > main > section.section__wrapper.section__wrapper-detailPage > div.custom-container > div > div > div.detail__left > div > div.content__description"
        )
        if body_container:
            paragraphs = [p.get_text(strip=True) for p in body_container.find_all("p")]
            body = "\n\n".join(paragraphs)
        else:
            body = "No body content found"

        return {"heading": heading, "body": body}

    except Exception as e:
        print(f" Error scraping {url}: {e}")
        return None
