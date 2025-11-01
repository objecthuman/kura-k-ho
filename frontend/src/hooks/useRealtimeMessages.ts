import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { supabase } from '@/lib/supabase';
import { updateMessageAtom } from '@/store/chatAtoms';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface MessageChunk {
  type: 'start' | 'chunk' | 'end';
  session_id: string;
  message_id?: string;
  content?: string;
  role?: 'user' | 'assistant';
  factCheckResult?: any;
  newsSummary?: any;
  timestamp?: string;
}

export function useRealtimeMessages(sessionId: string | null) {
  const updateMessage = useSetAtom(updateMessageAtom);

  useEffect(() => {
    if (!sessionId) return;

    let channel: RealtimeChannel;

    const setupSubscription = async () => {
      // Subscribe to broadcast messages for this session
      channel = supabase
        .channel(sessionId)
        .on(
          'broadcast',
          { event: 'message-broadcast' },
          (payload) => {
            console.log('Message chunk received:', payload);

            const chunk = payload.payload as MessageChunk;

            // Update or create the message with streaming content
            updateMessage(
              chunk.message_id || Date.now().toString(),
              {
                role: chunk.role || 'assistant',
                content: chunk.content ?? "",
                session_id: chunk.session_id,
                timestamp: new Date(chunk.timestamp || Date.now()),
                isStreaming: chunk.type !== 'end',
                factCheckResult: chunk.factCheckResult,
                newsSummary: chunk.newsSummary,
              }
            );
          }
        )
        .subscribe((status) => {
          console.log('Subscription status:', status);
        });
    };

    setupSubscription();

    // Cleanup on unmount or when sessionId changes
    return () => {
      if (channel) {
        console.log('Unsubscribing from channel');
        supabase.removeChannel(channel);
      }
    };
  }, [sessionId, updateMessage]);
}
