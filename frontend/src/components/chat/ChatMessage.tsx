import type { Message } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "true":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "false":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "misleading":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getVerdictVariant = (
    verdict: string,
  ): "success" | "destructive" | "warning" | "default" => {
    switch (verdict) {
      case "true":
        return "success";
      case "false":
        return "destructive";
      case "misleading":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            AI
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-[80%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  code: ({ className, children }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-muted-foreground/20 px-1 py-0.5 rounded text-xs font-mono">
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-muted-foreground/20 p-2 rounded text-xs font-mono overflow-x-auto">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => <pre className="mb-2 overflow-x-auto">{children}</pre>,
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                  a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-3 italic my-2">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Fact Check Result */}
        {message.factCheckResult && (
          <Card className="mt-2">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                {getVerdictIcon(message.factCheckResult.verdict)}
                <Badge
                  variant={getVerdictVariant(message.factCheckResult.verdict)}
                >
                  {message.factCheckResult.verdict.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {(message.factCheckResult.confidence * 100).toFixed(0)}%
                  confidence
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {message.factCheckResult.explanation}
              </p>
              {message.factCheckResult.sources.length > 0 && (
                <div className="border-t pt-2">
                  <p className="text-xs font-semibold mb-1">Sources:</p>
                  {message.factCheckResult.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline block"
                    >
                      {source.name}
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* News Summary */}
        {message.newsSummary && (
          <Card className="mt-2">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-sm mb-2">Summary</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {message.newsSummary.summary}
              </p>
              {message.newsSummary.keyPoints.length > 0 && (
                <div className="border-t pt-2">
                  <p className="text-xs font-semibold mb-1">Key Points:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {message.newsSummary.keyPoints.map((point, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
