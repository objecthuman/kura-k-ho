import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { currentSessionAtom } from '@/store/chatAtoms';
import { API_BASE_URL, getAuthHeaders } from '@/lib/api';

interface SessionResponse {
  id: string;
  title: string;
  message?: string;
  user_id: string;
}

interface MessageResponse {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  const [, setCurrentSession] = useAtom(currentSessionAtom);

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/sessions/`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      return response.json() as Promise<SessionResponse>;
    },
    onSuccess: (response) => {
      console.log(response);
      if (response.id) {
        setCurrentSession({
          id: response.id,
          title: response.message || response.title,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        queryClient.invalidateQueries({ queryKey: ['sessions'] });
      }
    },
    onError: (error) => {
      console.error('Failed to create session:', error);
    },
  });
}

export function useSessionMessages(sessionId: string | null) {
  return useQuery({
    queryKey: ['session-messages', sessionId],
    queryFn: async () => {
      if (!sessionId) return null;

      const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/messages`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      return data.data || data as MessageResponse[];
    },
    enabled: !!sessionId,
    refetchInterval: false,
  });
}
