import { Badge } from "@/components/ui/badge";
import { SignalRating } from "@/types";
import { cn } from "@/lib/utils";

interface SignalBadgeProps {
  rating: SignalRating;
  className?: string;
}

export function SignalBadge({ rating, className }: SignalBadgeProps) {
  const variants = {
    'Strong Buy': 'bg-bullish text-bullish-foreground hover:bg-bullish/90',
    'Buy': 'bg-bullish/70 text-bullish-foreground hover:bg-bullish/60',
    'Neutral': 'bg-neutral text-neutral-foreground hover:bg-neutral/90',
    'Sell': 'bg-bearish/70 text-bearish-foreground hover:bg-bearish/60',
    'Strong Sell': 'bg-bearish text-bearish-foreground hover:bg-bearish/90',
  };

  return (
    <Badge className={cn(variants[rating], "font-medium", className)}>
      {rating}
    </Badge>
  );
}
