import { Badge } from "@/components/ui/badge";
import { SignalResult } from "@/types/signal";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SignalResultBadgeProps {
  result: SignalResult | null;
  fullReason?: string;
  className?: string;
}

const resultStyles: Record<SignalResult, string> = {
  TP1: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  TP2: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  TP3: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  SL: "border-red-500/50 bg-red-500/10 text-red-400",
  Risk: "border-orange-500/50 bg-orange-500/10 text-orange-400",
  Flip: "border-purple-500/50 bg-purple-500/10 text-purple-400",
  Invalidated: "border-slate-500/50 bg-slate-500/10 text-slate-400",
  Closed: "border-muted-foreground/30 bg-muted/50 text-muted-foreground",
};

const resultLabels: Record<SignalResult, string> = {
  TP1: "TP1",
  TP2: "TP2",
  TP3: "TP3",
  SL: "SL",
  Risk: "Risk (EVaR)",
  Flip: "Flip",
  Invalidated: "Invalidated",
  Closed: "Closed",
};

export function SignalResultBadge({ result, fullReason, className }: SignalResultBadgeProps) {
  if (!result) {
    return <span className="text-muted-foreground">—</span>;
  }

  const badge = (
    <Badge
      variant="outline"
      className={cn(
        "font-medium text-xs",
        resultStyles[result],
        className
      )}
    >
      {resultLabels[result]}
    </Badge>
  );

  if (fullReason) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-xs">{fullReason}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
}
