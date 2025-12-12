import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Clock, History } from "lucide-react";
import type { FeedMode } from "@/hooks/useFeedMode";

interface FeedModeToggleProps {
  mode: FeedMode;
  onModeChange: (mode: FeedMode) => void;
}

export function FeedModeToggle({ mode, onModeChange }: FeedModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={(value) => {
        if (value) onModeChange(value as FeedMode);
      }}
      className="bg-muted rounded-md p-0.5"
    >
      <ToggleGroupItem
        value="realtime"
        aria-label="Real-time mode"
        className="text-xs px-3 py-1.5 h-auto data-[state=on]:bg-background data-[state=on]:shadow-sm gap-1.5"
      >
        <Clock className="h-3 w-3" />
        Real-time
      </ToggleGroupItem>
      <ToggleGroupItem
        value="timeline"
        aria-label="Timeline mode"
        className="text-xs px-3 py-1.5 h-auto data-[state=on]:bg-background data-[state=on]:shadow-sm gap-1.5"
      >
        <History className="h-3 w-3" />
        Timeline
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
