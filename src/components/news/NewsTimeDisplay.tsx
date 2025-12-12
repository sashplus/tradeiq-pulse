import { formatDistanceToNowStrict, format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { FeedMode } from "@/hooks/useFeedMode";

interface NewsTimeDisplayProps {
  publishedAt?: string;
  scrapedAt?: string;
  mode: FeedMode;
  className?: string;
}

function formatRelative(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const distance = formatDistanceToNowStrict(date, { addSuffix: false });
    // Convert "1 minute" to "1m", "2 hours" to "2h", etc.
    return distance
      .replace(/ seconds?/, "s")
      .replace(/ minutes?/, "m")
      .replace(/ hours?/, "h")
      .replace(/ days?/, "d")
      .replace(/ weeks?/, "w")
      .replace(/ months?/, "mo")
      .replace(/ years?/, "y")
      + " ago";
  } catch {
    return "—";
  }
}

function formatLocalDateTime(dateStr: string): string {
  try {
    return format(new Date(dateStr), "MMM d, yyyy 'at' h:mm a");
  } catch {
    return "—";
  }
}

function formatUTCDateTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
  } catch {
    return "—";
  }
}

export function NewsTimeDisplay({ publishedAt, scrapedAt, mode, className = "" }: NewsTimeDisplayProps) {
  // Determine primary and secondary based on mode
  const primaryTime = mode === "realtime" ? scrapedAt : publishedAt;
  const secondaryTime = mode === "realtime" ? publishedAt : scrapedAt;
  const primaryLabel = mode === "realtime" ? "Arrived" : "Published";
  const secondaryLabel = mode === "realtime" ? "Published" : "Arrived";

  if (!primaryTime) {
    return <span className={`text-xs text-muted-foreground ${className}`}>—</span>;
  }

  const tooltipContent = (
    <div className="text-xs space-y-1.5">
      {publishedAt && (
        <div>
          <span className="text-muted-foreground">Published: </span>
          <span>{formatLocalDateTime(publishedAt)}</span>
          <span className="text-muted-foreground ml-1">({formatUTCDateTime(publishedAt)})</span>
        </div>
      )}
      {scrapedAt && (
        <div>
          <span className="text-muted-foreground">Arrived: </span>
          <span>{formatLocalDateTime(scrapedAt)}</span>
          <span className="text-muted-foreground ml-1">({formatUTCDateTime(scrapedAt)})</span>
        </div>
      )}
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`cursor-help ${className}`}>
            <div className="text-xs text-foreground">
              {primaryLabel} {formatRelative(primaryTime)}
            </div>
            {secondaryTime && (
              <div className="text-[10px] text-muted-foreground">
                {secondaryLabel} {formatRelative(secondaryTime)}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end" className="max-w-sm">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
