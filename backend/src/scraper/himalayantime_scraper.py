import requests
from bs4 import BeautifulSoup

def scrape_news(url):
    """
    Scrapes the heading and body text of a news article from the given URL.

    Args:
        url (str): URL of the news article.

    Returns:
        dict: {"heading": str, "body": str}
    """
    try:
        # Step 1: Fetch page
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()

        # Step 2: Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')

        # Step 3: Extract heading
        heading_tag = soup.select_one(
            "body > main > div:nth-child(4) > div > div.col-md-8.col-xs-12 > div.ht-article-details > article > h1"
        )
        heading = heading_tag.get_text(strip=True) if heading_tag else "No heading found"

        # Step 4: Extract body content
        body_container = soup.select_one(
            "body > main > div:nth-child(4) > div > div.col-md-8.col-xs-12 > div.ht-article-details > article > div.post-content"
        )

        if body_container:
            # Extract all <p> tags text
            paragraphs = [p.get_text(strip=True) for p in body_container.find_all("p")]
            body_text = "\n\n".join(paragraphs)
        else:
            body_text = "No body content found"

        return {"heading": heading, "body": body_text}

    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return {"heading": None, "body": None}


# Example usage
if __name__ == "__main__":
    url = input("Enter news article URL: ").strip()
    data = scrape_news(url)
    print("\n📰 Heading:\n", data["heading"])
    print("\n📜 Body:\n", data["body"])
