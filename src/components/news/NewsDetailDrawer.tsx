import { useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SentimentBadge } from "@/components/signals/SentimentBadge";
import { ScoreBar } from "@/components/signals/ScoreBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewsItem } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { X, ExternalLink, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NewsDetailDrawerProps {
  news: NewsItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showNavigation?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  variant?: "dashboard" | "newsfeed";
}

export function NewsDetailDrawer({
  news,
  open,
  onOpenChange,
  showNavigation = false,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  variant = "dashboard",
}: NewsDetailDrawerProps) {
  const navigate = useNavigate();

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!news) return null;

  const handleOpenOnNewsFeed = () => {
    onOpenChange(false);
    navigate(`/news?selectedId=${news.id}`);
  };

  const handleOpenOriginalSource = () => {
    if (news.original_url) {
      window.open(news.original_url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[70vw] sm:max-w-[800px] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{news.source}</Badge>
              <SentimentBadge sentiment={news.sentiment_label} />
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(news.timestamp), { addSuffix: true })}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <SheetTitle className="text-xl font-semibold leading-tight text-left mt-3">
            {news.headline}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Full article from {news.source}
          </SheetDescription>
        </SheetHeader>

        {/* Meta Section */}
        <div className="px-6 py-4 border-b border-border flex-shrink-0 space-y-4">
          {/* Asset tags and status */}
          <div className="flex items-center gap-2 flex-wrap">
            {news.assets.map((asset) => (
              <Badge key={asset.id} variant="outline">
                {asset.symbol}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className={
                news.status === "used_in_signal"
                  ? "border-primary/30 text-primary"
                  : news.status === "processed"
                  ? "border-bullish/30 text-bullish"
                  : "border-muted-foreground/30 text-muted-foreground"
              }
            >
              {news.status.replace("_", " ")}
            </Badge>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-sm">
              <span className="text-muted-foreground">Sentiment:</span>
              <span className="font-medium ml-2">
                {Math.round(news.sentiment_score * 100)}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Relevance:</span>
              <span className="font-medium ml-2">{news.relevance_score}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Fundamental:</span>
              <div className="w-24">
                <ScoreBar score={news.fundamental_score} showLabel={false} />
              </div>
              <span className="text-sm font-medium">{news.fundamental_score}</span>
            </div>
          </div>
        </div>

        {/* Body - Scrollable */}
        <ScrollArea className="flex-1 px-6">
          <div className="py-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {news.full_text.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            {/* Navigation buttons (only for News Feed) */}
            {showNavigation && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onNext}
                  disabled={!hasNext}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Action buttons */}
            <div className={`flex items-center gap-2 ${!showNavigation ? "w-full justify-end" : "ml-auto"}`}>
              {variant === "dashboard" && (
                <Button variant="outline" onClick={handleOpenOnNewsFeed}>
                  <Newspaper className="h-4 w-4 mr-2" />
                  Open on News Feed
                </Button>
              )}
              {news.original_url && (
                <Button variant="default" onClick={handleOpenOriginalSource}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Original Source
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
