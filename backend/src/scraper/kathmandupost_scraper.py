import requests
from bs4 import BeautifulSoup

def scrape_news(url):
    """
    Scrapes the heading and body content of a news article from the given URL.

    Args:
        url (str): The URL of the news article.

    Returns:
        dict: {"heading": str, "body": str}
    """
    try:
        # Fetch the page HTML
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()

        # Parse the HTML
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract the heading using CSS selector
        heading_tag = soup.select_one(
            "#mainContent > main > div > div:nth-child(2) > div.col-sm-8 > h1"
        )
        heading = heading_tag.get_text(strip=True) if heading_tag else "No heading found"

        # Extract the body container using CSS selector
        body_container = soup.select_one(
            "#mainContent > main > div > div:nth-child(2) > div.col-sm-8 > div > div > div.subscribe--wrapperx > section"
        )

        # Collect all <p> tags text
        if body_container:
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
