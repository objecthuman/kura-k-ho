import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNewsStore } from "@/store/useNewsStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { newsService } from "@/services/newsService";
import { NewsCard } from "@/components/news/NewsCard";
import type { NewsArticle } from "@/types";
import { Loader2, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsFeed() {
  const navigate = useNavigate();
  const {
    personalizedArticles,
    isLoading,
    setPersonalizedArticles,
    setLoading,
  } = useNewsStore();
  const { isAuthenticated, user } = useAuthStore();
  const { setChatMode, addMessage, clearMessages } = useChatStore();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = isAuthenticated
        ? await newsService.getPersonalizedNews()
        : await newsService.getNews();

      if (response.success && response.data) {
        setPersonalizedArticles(response.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = (article: NewsArticle) => {
    clearMessages();
    setChatMode("summarize");
    addMessage({
      id: Date.now().toString(),
      role: "user",
      content: `Summarize this news article: ${article.url}`,
      timestamp: new Date(),
    });
    navigate("/chat");
  };

  const handleFactCheck = (article: NewsArticle) => {
    clearMessages();
    setChatMode("fact-check");
    addMessage({
      id: Date.now().toString(),
      role: "user",
      content: `Fact check this news: ${article.title}`,
      timestamp: new Date(),
    });
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">
              {isAuthenticated && user?.preferences
                ? "Your Personalized Feed"
                : "Latest News"}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {isAuthenticated && user?.preferences
              ? "News articles tailored to your interests"
              : "Stay informed with the latest verified news"}
          </p>
        </div>

        {!isAuthenticated && (
          <div className="bg-muted/50 rounded-lg p-6 mb-8">
            <h2 className="font-semibold mb-2">Get Personalized News</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Sign up to receive news tailored to your interests and preferences
            </p>
            <Button onClick={() => navigate("/signup")}>Sign Up Now</Button>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : personalizedArticles.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No News Available</h3>
            <p className="text-muted-foreground">
              {isAuthenticated
                ? "Update your preferences to see personalized news"
                : "Check back later for the latest news"}
            </p>
            {isAuthenticated && (
              <Button onClick={() => navigate("/preferences")} className="mt-4">
                Update Preferences
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalizedArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onSummarize={handleSummarize}
                onFactCheck={handleFactCheck}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
