import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TimeRangePreset } from "@/hooks/useTimeRange";

interface TimeRangeSelectorProps {
  preset: TimeRangePreset;
  customStart: Date | null;
  customEnd: Date | null;
  onPresetChange: (preset: TimeRangePreset) => void;
  onCustomRangeChange: (start: Date, end: Date) => void;
}

const PRESETS: { value: TimeRangePreset; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "ytd", label: "YTD" },
  { value: "all", label: "All Time" },
];

export function TimeRangeSelector({
  preset,
  customStart,
  customEnd,
  onPresetChange,
  onCustomRangeChange,
}: TimeRangeSelectorProps) {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [tempStart, setTempStart] = useState<Date | undefined>(customStart || undefined);
  const [tempEnd, setTempEnd] = useState<Date | undefined>(customEnd || undefined);

  const handlePresetClick = (value: TimeRangePreset) => {
    if (value === "custom") {
      setIsCustomOpen(true);
    } else {
      onPresetChange(value);
    }
  };

  const handleApplyCustom = () => {
    if (tempStart && tempEnd) {
      onCustomRangeChange(tempStart, tempEnd);
      setIsCustomOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Preset buttons */}
      <div className="flex items-center rounded-md border border-border bg-muted/30 p-0.5">
        {PRESETS.map((item) => (
          <Button
            key={item.value}
            variant="ghost"
            size="sm"
            onClick={() => handlePresetClick(item.value)}
            className={cn(
              "h-7 px-2.5 text-xs font-medium rounded-sm",
              preset === item.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-transparent"
            )}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* Custom date picker */}
      <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 px-2.5 text-xs font-medium gap-1.5",
              preset === "custom"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            {preset === "custom" && customStart && customEnd ? (
              <span>
                {format(customStart, "MMM d")} - {format(customEnd, "MMM d")}
              </span>
            ) : (
              <span>Custom</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="flex flex-col sm:flex-row">
            <div className="p-3 border-b sm:border-b-0 sm:border-r border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">Start Date</p>
              <Calendar
                mode="single"
                selected={tempStart}
                onSelect={setTempStart}
                className="pointer-events-auto"
                disabled={(date) => tempEnd ? date > tempEnd : false}
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">End Date</p>
              <Calendar
                mode="single"
                selected={tempEnd}
                onSelect={setTempEnd}
                className="pointer-events-auto"
                disabled={(date) => tempStart ? date < tempStart : false}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 p-3 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleApplyCustom}
              disabled={!tempStart || !tempEnd}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
