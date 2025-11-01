from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_API_KEY: str
    POSTGRES_URI: str
    POSTGRES_URI_ORM: str
    SERPER_API_KEY: str
    SERPER_API_URL: str = "https://google.serper.dev/search"
    OPENAI_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()  # type: ignore
