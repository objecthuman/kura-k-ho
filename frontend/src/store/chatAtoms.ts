import { atom } from "jotai";
import type { Message, ChatSession, ChatMode } from "@/types";

// Base atoms for chat state
export const currentSessionAtom = atom<ChatSession | null>(null);
export const sessionsAtom = atom<ChatSession[]>([]);
export const messagesAtom = atom<Message[]>([]);
export const chatLoadingAtom = atom<boolean>(false);
export const chatModeAtom = atom<ChatMode>("fact-check");
export const streamingMessageAtom = atom<Message | null>(null);

// Write-only atoms for actions
export const addMessageAtom = atom(null, (get, set, message: Message) => {
  const currentMessages = get(messagesAtom);
  set(messagesAtom, [...currentMessages, message]);
});

export const clearMessagesAtom = atom(null, (_get, set) => {
  set(messagesAtom, []);
});

export const createSessionAtom = atom(null, (get, set) => {
  const newSession: ChatSession = {
    id: Date.now().toString(),
    title: "New Chat",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const currentSessions = get(sessionsAtom);
  set(currentSessionAtom, newSession);
  set(sessionsAtom, [...currentSessions, newSession]);
  set(messagesAtom, []);
});

export const loadSessionAtom = atom(null, (get, set, sessionId: string) => {
  const sessions = get(sessionsAtom);
  const session = sessions.find((s) => s.id === sessionId);
  if (session) {
    set(currentSessionAtom, session);
    set(messagesAtom, session.messages);
  }
});

export const updateLastMessageAtom = atom(
  null,
  (get, set, update: Partial<Message>) => {
    const messages = get(messagesAtom);
    if (messages.length > 0) {
      const updatedMessages = [...messages];
      updatedMessages[updatedMessages.length - 1] = {
        ...updatedMessages[updatedMessages.length - 1],
        ...update,
      };
      set(messagesAtom, updatedMessages);
    }
  }
);
