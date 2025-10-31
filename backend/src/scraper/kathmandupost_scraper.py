import httpx
from bs4 import BeautifulSoup


async def scrape_news(url):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers={"User-Agent": "Mozilla/5.0"})
            response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        heading_tag = soup.select_one(
            "#mainContent > main > div > div:nth-child(2) > div.col-sm-8 > h1"
        )
        heading = (
            heading_tag.get_text(strip=True) if heading_tag else "No heading found"
        )

        body_container = soup.select_one(
            "#mainContent > main > div > div:nth-child(2) > div.col-sm-8 > div > div > div.subscribe--wrapperx > section"
        )

        if body_container:
            paragraphs = [p.get_text(strip=True) for p in body_container.find_all("p")]
            body_text = "\n\n".join(paragraphs)
        else:
            body_text = "No body content found"

        return {"heading": heading, "body": body_text}

    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return {"heading": None, "body": None}
