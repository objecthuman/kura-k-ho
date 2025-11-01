from openai import AsyncOpenAI
from src.config import settings
from src.scraper.types import ScrapedArticle

SUMMARIZER_SYSTEM_PROMPT = """You are a professional news summarizer specializing in extracting key information from news articles.

Your task:
1. Read the provided news article carefully and thoroughly
2. Extract ALL main points, facts, and important details - do not omit anything significant
3. Identify key information including:
   - What happened (the main event or issue)
   - Who is involved (people, organizations, locations)
   - When it happened (dates, timeframes)
   - Where it happened (specific locations)
   - Why it happened (causes, reasons, context)
   - Impact and consequences
   - Any statistics, numbers, or data mentioned
   - Quotes from key individuals or officials

Important guidelines:
- Be comprehensive - do NOT miss any important points
- Maintain factual accuracy - do not add information not in the article
- Present information in a clear, organized manner
- Use bullet points or structured format for clarity
- Preserve the original meaning and context
- Keep the summary concise but complete

Output format:
Present your summary in a structured format with clear sections or bullet points that make it easy to understand all the key information from the article."""

client = AsyncOpenAI(api_key=settings.OPENAI_KEY)


async def summarize(article: ScrapedArticle) -> str | None:
    try:
        user_message = f"""Title: {article["heading"]}

Article Content:
{article["body"]}"""

        response = await client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": SUMMARIZER_SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            temperature=0.3,
        )

        summary = response.choices[0].message.content
        return summary if summary else None

    except Exception as e:
        print(f"Error summarizing article: {e}")
        return None
