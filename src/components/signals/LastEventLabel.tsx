import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LastEventLabelProps {
  label: string | null;
  fullReason?: string;
  className?: string;
}

export function LastEventLabel({ label, fullReason, className }: LastEventLabelProps) {
  if (!label) return null;

  const content = (
    <span
      className={cn(
        "text-[10px] text-muted-foreground/80 block mt-0.5",
        className
      )}
    >
      {label}
    </span>
  );

  if (fullReason && fullReason !== label) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-xs">{fullReason}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}
