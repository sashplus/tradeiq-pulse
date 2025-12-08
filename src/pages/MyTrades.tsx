import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { PerformanceFilters } from "@/components/performance/PerformanceFilters";
import { TradesTable } from "@/components/performance/TradesTable";
import { mockTrades } from "@/lib/mockTradeData";

const MyTrades = () => {
  // Filter states
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [asset, setAsset] = useState('all');
  const [strategy, setStrategy] = useState('all');
  const [tradeType, setTradeType] = useState('all');
  const [result, setResult] = useState('all');

  // Filtered trades
  const filteredTrades = useMemo(() => {
    return mockTrades.filter((trade) => {
      if (dateRange?.from && new Date(trade.timestamp) < dateRange.from) return false;
      if (dateRange?.to && new Date(trade.timestamp) > dateRange.to) return false;
      if (asset !== 'all' && trade.asset.symbol !== asset) return false;
      if (strategy !== 'all' && trade.strategy !== strategy) return false;
      if (tradeType !== 'all' && trade.tradeType !== tradeType) return false;
      if (result !== 'all' && trade.result !== result) return false;
      return true;
    });
  }, [dateRange, asset, strategy, tradeType, result]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Trades</h1>
        <p className="text-muted-foreground">
          Complete history of all your executed trades
        </p>
      </div>

      <PerformanceFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        asset={asset}
        setAsset={setAsset}
        strategy={strategy}
        setStrategy={setStrategy}
        tradeType={tradeType}
        setTradeType={setTradeType}
        result={result}
        setResult={setResult}
      />

      <TradesTable trades={filteredTrades} />
    </div>
  );
};

export default MyTrades;
