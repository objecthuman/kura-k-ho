from supabase import create_client, Client
from src.config import settings

supabase_client: Client = create_client(
    settings.SUPABASE_URL, settings.SUPABASE_API_KEY
)
