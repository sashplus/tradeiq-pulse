import { Badge } from "@/components/ui/badge";
import { StrategyType } from "@/types";
import { cn } from "@/lib/utils";

interface StrategyBadgeProps {
  strategy: StrategyType;
  className?: string;
}

export function StrategyBadge({ strategy, className }: StrategyBadgeProps) {
  const variants: Record<StrategyType, string> = {
    'Cautious': 'bg-chart-4/20 text-chart-4 border-chart-4/30',
    'Moderate': 'bg-chart-2/20 text-chart-2 border-chart-2/30',
    'Aggressive': 'bg-chart-5/20 text-chart-5 border-chart-5/30',
  };

  return (
    <Badge variant="outline" className={cn(variants[strategy], "font-medium", className)}>
      {strategy}
    </Badge>
  );
}
