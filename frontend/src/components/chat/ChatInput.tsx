import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useAtomValue } from "jotai";
import { currentSessionAtom } from "@/store/chatAtoms";

interface ChatInputProps {
  onSend: (message: string, session_id: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading, placeholder }: ChatInputProps) {
  const [input, setInput] = useState("");
  const currentSession = useAtomValue(currentSessionAtom);

  const handleSend = () => {
    if (input.trim() && !isLoading && currentSession?.id) {
      onSend(input.trim(), currentSession.id);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="flex gap-2 items-end max-w-4xl mx-auto">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder ||
            "Ask me to fact-check news, summarize articles, or answer questions..."
          }
          className="min-h-[60px] max-h-[200px] resize-none"
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="h-[60px]"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
