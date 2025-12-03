import { Badge } from "@/components/ui/badge";
import { HoldingPeriod } from "@/types";
import { cn } from "@/lib/utils";

interface TradeTypeBadgeProps {
  holdingPeriod: HoldingPeriod;
  className?: string;
}

const displayLabels: Record<HoldingPeriod, string> = {
  'Scalping': 'Scalp',
  'Day trade': 'Day Trade',
  'Swing': 'Swing',
  'Position': 'Position',
};

export function TradeTypeBadge({ holdingPeriod, className }: TradeTypeBadgeProps) {
  const variants: Record<HoldingPeriod, string> = {
    'Scalping': 'bg-chart-1/20 text-chart-1 border-chart-1/30',
    'Day trade': 'bg-chart-2/20 text-chart-2 border-chart-2/30',
    'Swing': 'bg-chart-3/20 text-chart-3 border-chart-3/30',
    'Position': 'bg-chart-4/20 text-chart-4 border-chart-4/30',
  };

  return (
    <Badge variant="outline" className={cn(variants[holdingPeriod], "font-medium", className)}>
      {displayLabels[holdingPeriod]}
    </Badge>
  );
}
