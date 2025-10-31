import type { Message } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";

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
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
