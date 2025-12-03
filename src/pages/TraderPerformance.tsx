import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { PerformanceFilters } from "@/components/performance/PerformanceFilters";
import { PerformanceKPIs } from "@/components/performance/PerformanceKPIs";
import { PerformanceCharts } from "@/components/performance/PerformanceCharts";
import { TradesTable } from "@/components/performance/TradesTable";
import { AIInsights } from "@/components/performance/AIInsights";
import {
  mockTrades,
  mockPerformanceMetrics,
  mockEquityCurve,
  mockWeeklyProfit,
  mockProfitByTradeType,
  mockProfitByStrategy,
  mockProfitByAsset,
  mockAIInsights,
} from "@/lib/mockTradeData";

const TraderPerformance = () => {
  // Filter states
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [asset, setAsset] = useState('all');
  const [strategy, setStrategy] = useState('all');
  const [tradeType, setTradeType] = useState('all');
  const [result, setResult] = useState('all');

  // Filtered trades
  const filteredTrades = useMemo(() => {
    return mockTrades.filter((trade) => {
      // Date range filter
      if (dateRange?.from && new Date(trade.timestamp) < dateRange.from) return false;
      if (dateRange?.to && new Date(trade.timestamp) > dateRange.to) return false;

      // Asset filter
      if (asset !== 'all' && trade.asset.symbol !== asset) return false;

      // Strategy filter
      if (strategy !== 'all' && trade.strategy !== strategy) return false;

      // Trade type filter
      if (tradeType !== 'all' && trade.tradeType !== tradeType) return false;

      // Result filter
      if (result !== 'all' && trade.result !== result) return false;

      return true;
    });
  }, [dateRange, asset, strategy, tradeType, result]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trader Performance</h1>
        <p className="text-muted-foreground">
          Full analytical overview of your trading results across all trades
        </p>
      </div>

      {/* Filters */}
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

      {/* KPI Cards */}
      <PerformanceKPIs metrics={mockPerformanceMetrics} />

      {/* Performance Charts */}
      <PerformanceCharts
        equityCurve={mockEquityCurve}
        weeklyProfit={mockWeeklyProfit}
        profitByTradeType={mockProfitByTradeType}
        profitByStrategy={mockProfitByStrategy}
        profitByAsset={mockProfitByAsset}
      />

      {/* Trades Table */}
      <TradesTable trades={filteredTrades} />

      {/* AI Insights */}
      <AIInsights insights={mockAIInsights} />
    </div>
  );
};

export default TraderPerformance;
