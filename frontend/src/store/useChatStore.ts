import { create } from "zustand";
import type { Message, ChatSession, ChatMode } from "@/types";

interface ChatState {
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  messages: Message[];
  isLoading: boolean;
  chatMode: ChatMode;
  setChatMode: (mode: ChatMode) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setLoading: (loading: boolean) => void;
  createSession: () => void;
  loadSession: (sessionId: string) => void;
  clearMessages: () => void;
  updateLastMessage: (message: Partial<Message>) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentSession: null,
  sessions: [],
  messages: [],
  isLoading: false,
  chatMode: "fact-check",

  setChatMode: (mode) => set({ chatMode: mode }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setMessages: (messages) => set({ messages }),

  setLoading: (loading) => set({ isLoading: loading }),

  createSession: () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      currentSession: newSession,
      sessions: [...state.sessions, newSession],
      messages: [],
    }));
  },

  loadSession: (sessionId) => {
    const session = get().sessions.find((s) => s.id === sessionId);
    if (session) {
      set({ currentSession: session, messages: session.messages });
    }
  },

  clearMessages: () => set({ messages: [] }),

  updateLastMessage: (update) =>
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        messages[messages.length - 1] = {
          ...messages[messages.length - 1],
          ...update,
        };
      }
      return { messages };
    }),
}));
