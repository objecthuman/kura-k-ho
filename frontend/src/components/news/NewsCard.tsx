import type { NewsArticle } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle } from "lucide-react";

interface NewsCardProps {
  article: NewsArticle;
  onSummarize?: (article: NewsArticle) => void;
  onFactCheck?: (article: NewsArticle) => void;
}

export function NewsCard({ article, onSummarize, onFactCheck }: NewsCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      {article.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary">{article.category}</Badge>
          {article.verified && (
            <Badge variant="success" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {article.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{article.source}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.open(article.url, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Read
          </Button>
          {onSummarize && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onSummarize(article)}
            >
              Summarize
            </Button>
          )}
          {onFactCheck && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onFactCheck(article)}
            >
              Fact Check
            </Button>
          )}
        </div>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {article.tags.slice(0, 3).map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
