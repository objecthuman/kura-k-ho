import { apiService } from "./api";
import type { NewsArticle, ApiResponse } from "@/types";

export interface NewsQuery {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const newsService = {
  async getNews(query?: NewsQuery): Promise<ApiResponse<NewsArticle[]>> {
    const params = new URLSearchParams();
    if (query?.category) params.append("category", query.category);
    if (query?.search) params.append("search", query.search);
    if (query?.page) params.append("page", query.page.toString());
    if (query?.limit) params.append("limit", query.limit.toString());

    const queryString = params.toString();
    return apiService.get<NewsArticle[]>(
      `/news${queryString ? `?${queryString}` : ""}`,
    );
  },

  async getPersonalizedNews(): Promise<ApiResponse<NewsArticle[]>> {
    return apiService.get<NewsArticle[]>("/news/personalized");
  },

  async getNewsById(id: string): Promise<ApiResponse<NewsArticle>> {
    return apiService.get<NewsArticle>(`/news/${id}`);
  },

  async getTrendingNews(): Promise<ApiResponse<NewsArticle[]>> {
    return apiService.get<NewsArticle[]>("/news/trending");
  },
};
