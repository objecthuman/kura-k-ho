from typing import TypedDict


class ScrapedNews(TypedDict):
    title: str
    body: str
    date: str
    source: str


class ScrapedArticle(TypedDict):
    heading: str
    body: str
