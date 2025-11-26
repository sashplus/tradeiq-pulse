import { cn } from "@/lib/utils";

interface ScoreBarProps {
  score: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function ScoreBar({ score, max = 100, className, showLabel = true }: ScoreBarProps) {
  const percentage = (score / max) * 100;
  
  const getColor = () => {
    if (score >= 80) return 'bg-bullish';
    if (score >= 65) return 'bg-bullish/70';
    if (score >= 40) return 'bg-neutral';
    if (score >= 25) return 'bg-bearish/70';
    return 'bg-bearish';
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full transition-all", getColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium w-10 text-right">{score}</span>
      )}
    </div>
  );
}
