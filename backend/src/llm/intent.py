from dotenv import load_dotenv
from pydantic import BaseModel
from openai import AsyncOpenAI
from src.config import settings

load_dotenv()


class IntentOutput(BaseModel):
    is_valid: bool
    reason: str
    clarification_message: str


VALIDATION_SYSTEM_PROMPT = """You are a query validator for a news authentication system. Determine if a user's query is appropriate for fact-checking against news sources.

VALID queries ask about:
- Verifiable events, incidents, or occurrences
- Truth of news claims or statements
- Current events, deaths, elections, appointments, disasters, accidents, policy changes
- Quotes or statements by public figures
- Historical newsworthy events

Examples: "Is it true that Ramhari Dhakal died?", "Did the president resign?", "Was there an earthquake in Nepal?"

INVALID queries are:
- Math calculations or general knowledge (not news)
- Definitions, explanations, how-to questions
- Opinions, advice, recommendations
- Chitchat or conversational
- Creative content requests
- Too vague or unclear
- Future predictions
- Spam or gibberish

Examples: "1+1", "What is capital of France?", "How to cook?", "Hello", "What's the weather?"

Your response must include:
1. is_valid: true/false indicating if the query is valid
2. reason: brief internal explanation of your decision
3. clarification_message: A friendly, user-facing message explaining why the query is invalid (empty string if valid)

For clarification_message when invalid:
- Be polite and helpful
- Explain specifically why their query isn't suitable for news fact-checking
- Suggest what kind of queries would work better
- Keep it concise (1-2 sentences)

Examples of clarification_message:
- "I can only help verify news and current events. For math calculations, please use a calculator."
- "This seems like a general knowledge question rather than a news query. I specialize in fact-checking recent events and news claims."
- "Your query is too vague for me to search news sources. Could you be more specific about what event or claim you'd like me to verify?"
- "I can't help with how-to questions. I'm designed to verify news stories and fact-check claims about current events."
"""

client = AsyncOpenAI(api_key=settings.OPENAI_KEY)


async def validate_news_query(user_query: str) -> IntentOutput:
    try:
        user_message = (
            f'Is this a valid news fact-checking query?\n\nQuery: "{user_query}"'
        )

        response = await client.beta.chat.completions.parse(
            model="gpt-4",
            messages=[
                {"role": "system", "content": VALIDATION_SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            temperature=0.3,
            max_tokens=150,
            response_format=IntentOutput,
        )

        return response.output_parsed

    except Exception as e:
        return IntentOutput(
            is_valid=False,
            clarification_message="soemthing went wrong while generating valid clairification message.",
            reason=str(e),
        )
