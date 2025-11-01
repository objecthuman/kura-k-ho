import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sessionService, type SessionResponse, type MessageResponse } from '@/services/sessionService';
import { useAtom, useAtomValue } from 'jotai';
import { currentSessionAtom } from '@/store/chatAtoms';
import { tokenAtom } from '@/store/authAtoms';

export function useCreateSession() {
  const queryClient = useQueryClient();
  const [, setCurrentSession] = useAtom(currentSessionAtom);
  const token = useAtomValue(tokenAtom)

  return useMutation({
    mutationFn: () => sessionService.createSession(),
    onSuccess: (response) => {
      if (response.success && response.data) {
        // Update the current session atom
        setCurrentSession({
          id: response.data.id,
          title: response.data.title,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        // Invalidate and refetch any related queries
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
      const response = await sessionService.getSessionMessages(sessionId);
      return response.success ? response.data : null;
    },
    enabled: !!sessionId,
    refetchInterval: false, // We'll use Supabase real-time instead
  });
}
