import { apiService } from "./api";
import type {
  Message,
  FactCheckResult,
  NewsSummary,
  ApiResponse,
} from "@/types";

export interface ChatRequest {
  message: string;
  mode: "fact-check" | "summarize" | "general";
  context?: Message[];
}

export interface ChatResponse {
  message: string;
  factCheckResult?: FactCheckResult;
  newsSummary?: NewsSummary;
}

export const chatService = {
  async sendMessage(request: ChatRequest): Promise<ApiResponse<ChatResponse>> {
    return apiService.post<ChatResponse>("/chat", request);
  },

  async factCheck(claim: string): Promise<ApiResponse<FactCheckResult>> {
    return apiService.post<FactCheckResult>("/chat/fact-check", { claim });
  },

  async summarizeNews(articleUrl: string): Promise<ApiResponse<NewsSummary>> {
    return apiService.post<NewsSummary>("/chat/summarize", { articleUrl });
  },

  async getChatHistory(sessionId: string): Promise<ApiResponse<Message[]>> {
    return apiService.get<Message[]>(`/chat/history/${sessionId}`);
  },
};
