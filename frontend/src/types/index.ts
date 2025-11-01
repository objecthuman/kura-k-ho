export interface User {
  id: string;
  email: string;
  preferences?: NewsPreferences;
  createdAt: Date;
}

export interface NewsPreferences {
  categories: string[];
  sources: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  factCheckResult?: FactCheckResult;
  newsSummary?: NewsSummary;
}

export interface FactCheckResult {
  claim: string;
  verdict: 'true' | 'false' | 'misleading' | 'unverified';
  confidence: number;
  sources: Source[];
  explanation: string;
  relatedNews?: NewsArticle[];
}

export interface NewsSummary {
  originalArticle: NewsArticle;
  summary: string;
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  source: string;
  author?: string;
  publishedAt: Date;
  url: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  verified: boolean;
}

export interface Source {
  name: string;
  url: string;
  reliability: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export type ChatMode = 'fact-check' | 'summarize' | 'general';

export interface ApiResponse<T = any> {
  success?: boolean;       // optional now (since backend may not send it)
  data?: T;                // optional payload container
  error?: string;          // backend or client error message
  message?: string;        // human-readable message
  user?: any;              // for Supabase-style responses
  session?: {
    access_token?: string;
    refresh_token?: string;
    user?: any;
  };
  access_token?: string;   // direct top-level token
}

