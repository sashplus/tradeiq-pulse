import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CouncilVerdict } from "@/types/council";

interface CouncilVerdictBadgeProps {
  verdict: CouncilVerdict;
  className?: string;
}

export function CouncilVerdictBadge({ verdict, className }: CouncilVerdictBadgeProps) {
  const styles = {
    Bullish: "bg-bullish/10 text-bullish border-bullish/30 hover:bg-bullish/20",
    Neutral: "bg-neutral/10 text-neutral border-neutral/30 hover:bg-neutral/20",
    Bearish: "bg-bearish/10 text-bearish border-bearish/30 hover:bg-bearish/20",
  };

  return (
    <Badge variant="outline" className={cn(styles[verdict], className)}>
      {verdict}
    </Badge>
  );
}
