import { useEffect, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { messagesAtom, chatLoadingAtom, chatModeAtom, addMessageAtom } from "@/store/chatAtoms";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { chatService } from "@/services/chatService";
import type { Message } from "@/types";
import { Loader2 } from "lucide-react";

export function ChatContainer() {
  const messages = useAtomValue(messagesAtom);
  const [isLoading, setLoading] = useAtom(chatLoadingAtom);
  const chatMode = useAtomValue(chatModeAtom);
  const addMessage = useSetAtom(addMessageAtom);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    addMessage(userMessage);

    // Send to API
    setLoading(true);
    try {
      const response = await chatService.sendMessage({
        message: content,
        mode: chatMode,
        context: messages.slice(-5), // Send last 5 messages for context
      });

      if (response.success && response.data) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.data.message,
          timestamp: new Date(),
          factCheckResult: response.data.factCheckResult,
          newsSummary: response.data.newsSummary,
        };
        addMessage(assistantMessage);
      } else {
        // Error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            response.error ||
            "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        };
        addMessage(errorMessage);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
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
              {isLoading && (
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
