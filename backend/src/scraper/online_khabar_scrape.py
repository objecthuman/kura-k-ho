import requests
from bs4 import BeautifulSoup

def scrape_news(url):
    """
    Scrapes the heading and body text of a news article from the given URL.

    Returns:
        dict: {"heading": str, "body": str}
    """
    try:
        # Fetch HTML content
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()

        # Parse HTML with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract heading using CSS selector
        heading_tag = soup.select_one(
            "#primary > div > div > div.ok-details-content-left > div.ok-post-header > h1"
        )
        heading = heading_tag.get_text(strip=True) if heading_tag else "No heading found"

        # Extract body paragraphs
        body_container = soup.select_one(
            "#primary > div > div > div.ok-details-content-left > div.post-content-wrap"
        )
        if body_container:
            paragraphs = [p.get_text(strip=True) for p in body_container.find_all("p")]
            body = "\n\n".join(paragraphs)
        else: 
            body = "No body content found"

        return {"heading": heading, "body": body}

    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return {"heading": None, "body": None}


# Example usage
if __name__ == "__main__":
    url = input("Enter news article URL: ").strip()
    data = scrape_news(url)
    print("\n📰 Heading:\n", data["heading"])
    print("\n📜 Body:\n", data["body"])
