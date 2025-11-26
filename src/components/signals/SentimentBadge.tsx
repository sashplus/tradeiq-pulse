import { Badge } from "@/components/ui/badge";
import { SentimentLabel } from "@/types";
import { cn } from "@/lib/utils";

interface SentimentBadgeProps {
  sentiment: SentimentLabel;
  className?: string;
}

export function SentimentBadge({ sentiment, className }: SentimentBadgeProps) {
  const variants = {
    'Bullish': 'bg-bullish/20 text-bullish border-bullish/30',
    'Bearish': 'bg-bearish/20 text-bearish border-bearish/30',
    'Neutral': 'bg-neutral/20 text-neutral border-neutral/30',
  };

  return (
    <Badge variant="outline" className={cn(variants[sentiment], "font-medium", className)}>
      {sentiment}
    </Badge>
  );
}
