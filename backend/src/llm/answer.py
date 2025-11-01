from openai import AsyncOpenAI
from src.config import settings
from typing import List, Dict

ANSWER_SYSTEM_PROMPT = """You are a news analysis assistant. Your role is to provide comprehensive, factual answers based on multiple news sources.

Your task:
1. Analyze the provided news summaries from different sources
2. Answer the user's query based on the information available

When presenting information:
- If multiple sources report the same information, group them together (e.g., "According to The Kathmandu Post and The Himalayan Times...")
- If sources have different information or perspectives, present each viewpoint clearly
- If sources contradict each other, explicitly point out the contradictions and what each source claims
- Cite which news source provided each piece of information

Format your response:
- Start directly with the answer - no greetings or small talk
- Use clear, structured formatting with sections or bullet points when appropriate
- Be comprehensive but concise
- Focus only on answering the query with news information

Critical rules:
- ONLY use information from the provided news summaries
- Do NOT add your own opinions or speculation
- Do NOT make up information not present in the sources
- Do NOT engage in small talk or pleasantries
- If the sources don't contain information to answer the query, state this clearly"""

client = AsyncOpenAI(api_key=settings.OPENAI_KEY)


async def generate_answer(
    user_query: str, summaries_with_sources: List[Dict[str, str]]
) -> str | None:
    try:
        summaries_text = "\n\n".join(
            [
                f"Source: {item['source']}\nSummary: {item['summary']}"
                for item in summaries_with_sources
            ]
        )

        user_message = f"""User Query: {user_query}

News Summaries:
{summaries_text}"""

        response = await client.chat.completions.create(
            model="gpt-4.1",
            messages=[
                {"role": "system", "content": ANSWER_SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            temperature=0.3,
        )

        answer = response.choices[0].message.content
        return answer if answer else None

    except Exception as e:
        print(f"Error generating answer: {e}")
        return None
