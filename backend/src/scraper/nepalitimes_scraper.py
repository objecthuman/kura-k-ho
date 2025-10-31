import requests
import httpx
from bs4 import BeautifulSoup

async def scrape_news(url):
    """
    Scrapes the heading and body text of a Next.js-based news article.

    Args:
        url (str): The URL of the news article.

    Returns:
        dict: {"heading": str, "body": str}
    """
    try:
        async with httpx.AsyncClient as client: 
            response = await client.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            response.raise_for_status()

        # Step 2: Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')

        # Step 3: Extract the heading
        heading_tag = soup.select_one(
            "#__next > div > main > div > div.mainCols.article > div.main--left > article > h1"
        )
        heading = heading_tag.get_text(strip=True) if heading_tag else "No heading found"

        # Step 4: Extract body paragraphs
        body_container = soup.select_one(
            "#__next > div > main > div > div.mainCols.article > div.main--left > article > div.article__text"
        )

        if body_container:
            paragraphs = [p.get_text(strip=True) for p in body_container.find_all("p")]
            body = "\n\n".join(paragraphs)
        else:
            body = "No body content found"

        return {"heading": heading, "body": body}

    except Exception as e:
        print(f"❌ Error scraping {url}: {e}")
        return {"heading": None, "body": None}

