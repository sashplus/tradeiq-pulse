import { Badge } from "@/components/ui/badge";
import { SignalState } from "@/types/signal";
import { cn } from "@/lib/utils";

interface SignalStateBadgeProps {
  state: SignalState;
  className?: string;
}

export function SignalStateBadge({ state, className }: SignalStateBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",
        state === 'OPEN' 
          ? "border-blue-500/50 bg-blue-500/10 text-blue-400" 
          : "border-muted-foreground/30 bg-muted/50 text-muted-foreground",
        className
      )}
    >
      {state}
    </Badge>
  );
}
