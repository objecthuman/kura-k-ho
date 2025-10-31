import { ChatContainer } from '@/components/chat/ChatContainer';
import { useChatStore } from '@/store/useChatStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, CheckCircle2, FileText, Plus } from 'lucide-react';

export function Chat() {
  const { chatMode, setChatMode, clearMessages, createSession } = useChatStore();

  const handleNewChat = () => {
    clearMessages();
    createSession();
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">News Fact Checker</h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleNewChat}>
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </header>

      {/* Mode Selector */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2">
            <Badge
              variant={chatMode === 'fact-check' ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 gap-2"
              onClick={() => setChatMode('fact-check')}
            >
              <CheckCircle2 className="w-4 h-4" />
              Fact Check
            </Badge>
            <Badge
              variant={chatMode === 'summarize' ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 gap-2"
              onClick={() => setChatMode('summarize')}
            >
              <FileText className="w-4 h-4" />
              Summarize
            </Badge>
            <Badge
              variant={chatMode === 'general' ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 gap-2"
              onClick={() => setChatMode('general')}
            >
              <MessageSquare className="w-4 h-4" />
              General
            </Badge>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
}
