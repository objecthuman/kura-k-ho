import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { supabase } from '@/lib/supabase';
import { addMessageAtom } from '@/store/chatAtoms';
import type { Message } from '@/types';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface SupabaseMessage {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export function useRealtimeMessages(sessionId: string | null) {
  const addMessage = useSetAtom(addMessageAtom);

  useEffect(() => {
    if (!sessionId) return;

    let channel: RealtimeChannel;

    const setupSubscription = async () => {
      // Subscribe to inserts on the chat_messages table for this session
      channel = supabase
        .channel(`chat_messages:session_id=eq.${sessionId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `session_id=eq.${sessionId}`,
          },
          (payload) => {
            console.log('New message received:', payload);

            const newMessage = payload.new as SupabaseMessage;

            // Convert to our Message format
            const message: Message = {
              id: newMessage.id,
              role: newMessage.role as 'user' | 'assistant',
              content: newMessage.content,
              timestamp: new Date(newMessage.created_at),
            };

            // Add to our local state
            addMessage(message);
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
  }, [sessionId, addMessage]);
}
