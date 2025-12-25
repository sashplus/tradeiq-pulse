import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CouncilVerdict } from "@/types/council";

interface CouncilIndicatorProps {
  verdict: CouncilVerdict;
  agreement: number;
  modelCount: number;
  className?: string;
  compact?: boolean;
}

export function CouncilIndicator({
  verdict,
  agreement,
  modelCount,
  className,
  compact = false,
}: CouncilIndicatorProps) {
  const verdictColors = {
    Bullish: "bg-bullish/10 text-bullish border-bullish/30",
    Neutral: "bg-neutral/10 text-neutral border-neutral/30",
    Bearish: "bg-bearish/10 text-bearish border-bearish/30",
  };

  const agreementBarColor = {
    Bullish: "bg-bullish",
    Neutral: "bg-neutral",
    Bearish: "bg-bearish",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-1 rounded-md border cursor-default",
              verdictColors[verdict],
              className
            )}
          >
            {/* Mini ring/progress indicator */}
            <div className="relative h-3 w-3">
              <svg className="h-3 w-3 -rotate-90" viewBox="0 0 12 12">
                <circle
                  cx="6"
                  cy="6"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.2"
                  strokeWidth="2"
                />
                <circle
                  cx="6"
                  cy="6"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${(agreement / 100) * 25.13} 25.13`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {!compact && (
              <span className="text-xs font-medium">{verdict}</span>
            )}
            
            <span className="text-xs opacity-75">{agreement}%</span>
            
            {!compact && (
              <span className="text-xs opacity-60">• {modelCount}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          <div className="space-y-1">
            <p className="font-medium">Multi-Model AI Council</p>
            <p>{modelCount} models • {agreement}% agreement</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
