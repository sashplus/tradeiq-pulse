import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface PerformanceFiltersProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  asset: string;
  setAsset: (asset: string) => void;
  strategy: string;
  setStrategy: (strategy: string) => void;
  tradeType: string;
  setTradeType: (tradeType: string) => void;
  result: string;
  setResult: (result: string) => void;
}

export function PerformanceFilters({
  dateRange,
  setDateRange,
  asset,
  setAsset,
  strategy,
  setStrategy,
  tradeType,
  setTradeType,
  result,
  setResult,
}: PerformanceFiltersProps) {
  const clearFilters = () => {
    setDateRange(undefined);
    setAsset('all');
    setStrategy('all');
    setTradeType('all');
    setResult('all');
  };

  const hasActiveFilters = dateRange || asset !== 'all' || strategy !== 'all' || tradeType !== 'all' || result !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card border border-border rounded-lg">
      {/* Date Range */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal min-w-[240px]",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Date Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-popover" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Asset Filter */}
      <Select value={asset} onValueChange={setAsset}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Asset" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Assets</SelectItem>
          <SelectItem value="BTC">BTC</SelectItem>
          <SelectItem value="ETH">ETH</SelectItem>
          <SelectItem value="SOL">SOL</SelectItem>
          <SelectItem value="AAPL">AAPL</SelectItem>
        </SelectContent>
      </Select>

      {/* Strategy Filter */}
      <Select value={strategy} onValueChange={setStrategy}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Strategy" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Strategies</SelectItem>
          <SelectItem value="Aggressive">Aggressive</SelectItem>
          <SelectItem value="Moderate">Moderate</SelectItem>
          <SelectItem value="Cautious">Cautious</SelectItem>
        </SelectContent>
      </Select>

      {/* Trade Type Filter */}
      <Select value={tradeType} onValueChange={setTradeType}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Trade Type" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Scalping">Scalp</SelectItem>
          <SelectItem value="Day trade">Day Trade</SelectItem>
          <SelectItem value="Swing">Swing</SelectItem>
        </SelectContent>
      </Select>

      {/* Result Filter */}
      <Select value={result} onValueChange={setResult}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Result" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Results</SelectItem>
          <SelectItem value="Win">Win</SelectItem>
          <SelectItem value="Loss">Loss</SelectItem>
          <SelectItem value="Break-even">Break-even</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
