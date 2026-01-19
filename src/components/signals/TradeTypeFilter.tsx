import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type TradeTypeValue = "scalp" | "day" | "swing";

interface TradeTypeFilterProps {
  selectedTypes: Set<TradeTypeValue>;
  onSelectionChange: (selected: Set<TradeTypeValue>) => void;
}

const TRADE_TYPE_OPTIONS: { value: TradeTypeValue; label: string }[] = [
  { value: "scalp", label: "Scalp" },
  { value: "day", label: "Day" },
  { value: "swing", label: "Swing" },
];

export const normalizeTradeType = (type: string | null | undefined): TradeTypeValue | null => {
  if (!type) return null;
  const normalized = type.trim().toLowerCase();
  if (normalized.includes("scalp")) return "scalp";
  if (normalized.includes("day")) return "day";
  if (normalized.includes("swing")) return "swing";
  return null;
};

export const TradeTypeFilter = ({
  selectedTypes,
  onSelectionChange,
}: TradeTypeFilterProps) => {
  const [open, setOpen] = useState(false);

  const isFilterActive =
    selectedTypes.size > 0 && selectedTypes.size < TRADE_TYPE_OPTIONS.length;

  const handleToggle = (value: TradeTypeValue) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(value)) {
      newSelected.delete(value);
    } else {
      newSelected.add(value);
    }
    onSelectionChange(newSelected);
  };

  const handleSelectAll = () => {
    onSelectionChange(new Set(TRADE_TYPE_OPTIONS.map((o) => o.value)));
  };

  const handleClear = () => {
    onSelectionChange(new Set());
  };

  return (
    <div className="flex items-center gap-1">
      <span>Trade Type</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "inline-flex items-center justify-center rounded p-1 hover:bg-accent transition-colors",
              isFilterActive && "text-primary"
            )}
            aria-label="Filter trade types"
          >
            <Filter className="h-3.5 w-3.5" />
            {isFilterActive && (
              <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground px-1">
                {selectedTypes.size}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-3" align="start">
          <div className="space-y-3">
            <p className="text-sm font-medium">Filter Trade Type</p>
            <div className="space-y-2">
              {TRADE_TYPE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 rounded px-1 py-0.5 -mx-1"
                >
                  <Checkbox
                    checked={selectedTypes.has(option.value)}
                    onCheckedChange={() => handleToggle(option.value)}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs flex-1"
                onClick={handleSelectAll}
              >
                Select all
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs flex-1"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-7 text-xs"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
