import { create } from "zustand";
import type { NewsArticle } from "@/types";

interface NewsState {
  articles: NewsArticle[];
  personalizedArticles: NewsArticle[];
  selectedArticle: NewsArticle | null;
  isLoading: boolean;
  setArticles: (articles: NewsArticle[]) => void;
  setPersonalizedArticles: (articles: NewsArticle[]) => void;
  setSelectedArticle: (article: NewsArticle | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  articles: [],
  personalizedArticles: [],
  selectedArticle: null,
  isLoading: false,

  setArticles: (articles) => set({ articles }),
  setPersonalizedArticles: (articles) =>
    set({ personalizedArticles: articles }),
  setSelectedArticle: (article) => set({ selectedArticle: article }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
