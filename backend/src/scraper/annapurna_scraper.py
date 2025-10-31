import httpx
from bs4 import BeautifulSoup
import asyncio


async def scrape_news(url):
    """
    Asynchronously scrapes the heading and body text of a news article using specific CSS selectors.

    Args:
        url (str): The URL of the news article.

    Returns:
        dict: {"heading": str, "body": str}
    """
    try:
        # Step 1: Fetch the webpage asynchronously
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers={"User-Agent": "Mozilla/5.0"})
            response.raise_for_status()

        # Step 2: Parse HTML content
        soup = BeautifulSoup(response.text, "html.parser")

        # Step 3: Extract heading
        heading_tag = soup.select_one(
            "body > main > section.section__wrapper.section__wrapper-detailPage > div.background__overlay-top > div > div > div.single__column-info > h1"
        )
        heading = heading_tag.get_text(strip=True) if heading_tag else "No heading found"

        # Step 4: Extract body paragraphs
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
        return {"heading": None, "body": None}


