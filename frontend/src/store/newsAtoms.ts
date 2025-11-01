import { atom } from "jotai";
import type { NewsArticle } from "@/types";

// Base atoms for news state
export const articlesAtom = atom<NewsArticle[]>([]);
export const personalizedArticlesAtom = atom<NewsArticle[]>([]);
export const selectedArticleAtom = atom<NewsArticle | null>(null);
export const newsLoadingAtom = atom<boolean>(false);
