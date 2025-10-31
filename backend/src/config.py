from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_API_KEY: str
    POSTGRES_URI: str  # For migrations (direct connection)
    POSTGRES_URI_ORM: str  # For ORM operations (connection pooling)

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()  # type: ignore
