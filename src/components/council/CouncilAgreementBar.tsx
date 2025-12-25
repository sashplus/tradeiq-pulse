import { cn } from "@/lib/utils";
import type { CouncilVerdict } from "@/types/council";

interface CouncilAgreementBarProps {
  agreement: number;
  verdict: CouncilVerdict;
  showLabel?: boolean;
  className?: string;
}

export function CouncilAgreementBar({
  agreement,
  verdict,
  showLabel = true,
  className,
}: CouncilAgreementBarProps) {
  const barColors = {
    Bullish: "bg-bullish",
    Neutral: "bg-neutral",
    Bearish: "bg-bearish",
  };

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Agreement</span>
          <span className="font-medium">{agreement}%</span>
        </div>
      )}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", barColors[verdict])}
          style={{ width: `${agreement}%` }}
        />
      </div>
    </div>
  );
}
