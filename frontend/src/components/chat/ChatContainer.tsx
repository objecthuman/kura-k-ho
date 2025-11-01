import { useEffect, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { messagesAtom, chatLoadingAtom, chatModeAtom, addMessageAtom, currentSessionAtom, streamingMessageAtom } from "@/store/chatAtoms";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";
import type { Message } from "@/types";
import { Loader2 } from "lucide-react";
import { API_BASE_URL, getAuthHeaders } from "@/lib/api";

export function ChatContainer() {
  const messages = useAtomValue(messagesAtom);
  const [isLoading, setLoading] = useAtom(chatLoadingAtom);
  const chatMode = useAtomValue(chatModeAtom);
  const addMessage = useSetAtom(addMessageAtom);
  const currentSession = useAtomValue(currentSessionAtom);
  const [streamingMessage, setStreamingMessage] = useAtom(streamingMessageAtom);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log({ streamingMessage })

  // Set up real-time subscription for messages
  useRealtimeMessages(currentSession?.id || null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // When streaming completes, add the message to the messages list
  useEffect(() => {
    if (streamingMessage && !streamingMessage.isStreaming) {
      addMessage(streamingMessage);
      setStreamingMessage(null);
    }
  }, [streamingMessage, addMessage, setStreamingMessage]);

  const handleSendMessage = async (content: string, session_id: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      session_id,
      timestamp: new Date(),
    };
    addMessage(userMessage);

    // Send to API - response will come via streaming
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${currentSession?.id}/chat`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          session_id: session_id,
          user_query: content,
          mode: chatMode
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        session_id: session_id,
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <h2 className="text-2xl font-bold mb-2">
                Welcome to News Fact Checker
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Ask me to fact-check news, summarize articles, or answer
                questions about current events.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                <div className="border rounded-lg p-4 hover:bg-accent cursor-pointer transition">
                  <h3 className="font-semibold mb-2">Fact Check</h3>
                  <p className="text-sm text-muted-foreground">
                    Verify the accuracy of news claims and statements
                  </p>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent cursor-pointer transition">
                  <h3 className="font-semibold mb-2">Summarize</h3>
                  <p className="text-sm text-muted-foreground">
                    Get concise summaries of news articles
                  </p>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent cursor-pointer transition">
                  <h3 className="font-semibold mb-2">Ask Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    Get answers about current news and events
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {streamingMessage && (
                <ChatMessage key="streaming" message={streamingMessage} />
              )}
              {isLoading && !streamingMessage && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
