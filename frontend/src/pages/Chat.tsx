import { useEffect } from 'react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { chatModeAtom, clearMessagesAtom, currentSessionAtom } from '@/store/chatAtoms';
import { MessageSquare, CheckCircle2, FileText, Plus } from 'lucide-react';
import { isAuthenticatedAtom, tokenAtom, userAtom } from '@/store/authAtoms';
import { useCreateSession } from '@/hooks/useSession';

export function Chat() {
  const chatMode = useAtomValue(chatModeAtom);
  const setChatMode = useSetAtom(chatModeAtom);
  const clearMessages = useSetAtom(clearMessagesAtom);
  const [currentSession, setCurrentSession] = useAtom(currentSessionAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);

  const { mutate: createSession, isPending: isCreatingSession } = useCreateSession();


  // Create a session on mount if authenticated and no session exists
  useEffect(() => {
    console.log({ isAuthenticated, currentSession, token })
    if (isAuthenticated && !currentSession) {
      console.log('here')
      createSession();
    }
  }, [isAuthenticated, currentSession, createSession]);

  const handleNewChat = () => {
    clearMessages();
    setCurrentSession(null);
    createSession();
  };

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      {/* Header */}
      <header className="border-b-4 border-black bg-cyan-300 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-black border-2 border-black p-2 rotate-6">
                <MessageSquare className="w-6 h-6 text-cyan-300" />
              </div>
              <h1 className="text-2xl font-black uppercase">Fact Checker</h1>
            </div>
            <button
              onClick={handleNewChat}
              className="px-4 py-2 bg-pink-500 border-3 border-black font-bold uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2 text-white"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>
        </div>
      </header>

      {/* Mode Selector */}
      <div className="border-b-4 border-black bg-yellow-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setChatMode('fact-check')}
              className={`px-5 py-2.5 border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2 ${chatMode === 'fact-check'
                ? 'bg-green-400'
                : 'bg-white'
                }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Fact Check
            </button>
            <button
              onClick={() => setChatMode('summarize')}
              className={`px-5 py-2.5 border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2 ${chatMode === 'summarize'
                ? 'bg-cyan-400'
                : 'bg-white'
                }`}
            >
              <FileText className="w-4 h-4" />
              Summarize
            </button>
            <button
              onClick={() => setChatMode('general')}
              className={`px-5 py-2.5 border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2 ${chatMode === 'general'
                ? 'bg-pink-400'
                : 'bg-white'
                }`}
            >
              <MessageSquare className="w-4 h-4" />
              General
            </button>
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
