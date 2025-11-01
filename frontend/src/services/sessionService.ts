import { apiService } from './api';
import type { ApiResponse } from '@/types';

export interface SessionResponse {
  id: string;
  title: string;
  user_id: string;
}

export interface MessageResponse {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
  updated_at: string;
}

class SessionService {
  async createSession(): Promise<ApiResponse<SessionResponse>> {
    return apiService.post<SessionResponse>('/sessions/');
  }

  async getSessionMessages(sessionId: string): Promise<ApiResponse<MessageResponse[]>> {
    return apiService.get<MessageResponse[]>(`/sessions/${sessionId}/messages`);
  }
}

export const sessionService = new SessionService();
