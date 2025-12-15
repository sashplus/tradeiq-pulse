import { useMemo } from "react";
import { PerformanceKPIs } from "@/components/performance/PerformanceKPIs";
import { PerformanceCharts } from "@/components/performance/PerformanceCharts";
import { AIInsights } from "@/components/performance/AIInsights";
import { TimeRangeSelector } from "@/components/performance/TimeRangeSelector";
import { useTimeRange } from "@/hooks/useTimeRange";
import {
  mockPerformanceMetrics,
  mockEquityCurve,
  mockWeeklyProfit,
  mockProfitByTradeType,
  mockProfitByStrategy,
  mockProfitByAsset,
  mockAIInsights,
  mockTrades,
} from "@/lib/mockTradeData";
import { isAfter, isBefore, parseISO, startOfDay } from "date-fns";

const TraderPerformance = () => {
  const { timeRange, setPreset, setCustomRange, getDateRange, getLabel } = useTimeRange('30d');
  const { start, end } = getDateRange();
  const periodLabel = getLabel();

  // Filter trades based on time range
  const filteredTrades = useMemo(() => {
    if (!start && !end) return mockTrades;
    
    return mockTrades.filter((trade) => {
      const tradeDate = parseISO(trade.timestamp);
      if (start && isBefore(tradeDate, startOfDay(start))) return false;
      if (end && isAfter(tradeDate, end)) return false;
      return true;
    });
  }, [start, end]);

  // Recalculate metrics based on filtered trades
  const metrics = useMemo(() => {
    const closedTrades = filteredTrades.filter(t => t.status === 'Closed');
    if (closedTrades.length === 0) {
      return {
        ...mockPerformanceMetrics,
        totalPnL: 0,
        totalPnLPercent: 0,
        winRate: 0,
        totalTrades: 0,
        profitByStrategy: { Aggressive: 0, Moderate: 0, Cautious: 0 },
      };
    }

    const totalPnL = closedTrades.reduce((sum, t) => sum + t.pnl, 0);
    const wins = closedTrades.filter(t => t.result === 'Win').length;
    const winRate = Math.round((wins / closedTrades.length) * 100 * 10) / 10;

    const profitByStrategy = {
      Aggressive: closedTrades.filter(t => t.strategy === 'Aggressive').reduce((s, t) => s + t.pnl, 0),
      Moderate: closedTrades.filter(t => t.strategy === 'Moderate').reduce((s, t) => s + t.pnl, 0),
      Cautious: closedTrades.filter(t => t.strategy === 'Cautious').reduce((s, t) => s + t.pnl, 0),
    };

    // Find most traded asset
    const assetCounts: Record<string, number> = {};
    closedTrades.forEach(t => {
      assetCounts[t.asset.symbol] = (assetCounts[t.asset.symbol] || 0) + 1;
    });
    const mostTradedAsset = Object.entries(assetCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      ...mockPerformanceMetrics,
      totalPnL,
      winRate,
      totalTrades: closedTrades.length,
      mostTradedAsset,
      profitByStrategy,
    };
  }, [filteredTrades]);

  // Filter equity curve based on date range
  const filteredEquityCurve = useMemo(() => {
    if (!start && !end) return mockEquityCurve;
    
    return mockEquityCurve.filter((point) => {
      const pointDate = parseISO(point.date);
      if (start && isBefore(pointDate, startOfDay(start))) return false;
      if (end && isAfter(pointDate, end)) return false;
      return true;
    });
  }, [start, end]);

  // Recalculate profit breakdown by trade type
  const profitByTradeType = useMemo(() => {
    const closedTrades = filteredTrades.filter(t => t.status === 'Closed');
    const byType: Record<string, { profit: number; count: number }> = {};
    
    closedTrades.forEach(t => {
      const type = t.tradeType === 'Scalping' ? 'Scalp' : t.tradeType === 'Day trade' ? 'Day Trade' : 'Swing';
      if (!byType[type]) byType[type] = { profit: 0, count: 0 };
      byType[type].profit += t.pnl;
      byType[type].count += 1;
    });

    return Object.entries(byType).map(([name, data]) => ({ name, ...data }));
  }, [filteredTrades]);

  // Recalculate profit breakdown by strategy
  const profitByStrategy = useMemo(() => {
    const closedTrades = filteredTrades.filter(t => t.status === 'Closed');
    const byStrategy: Record<string, { profit: number; count: number }> = {};
    
    closedTrades.forEach(t => {
      if (!byStrategy[t.strategy]) byStrategy[t.strategy] = { profit: 0, count: 0 };
      byStrategy[t.strategy].profit += t.pnl;
      byStrategy[t.strategy].count += 1;
    });

    return Object.entries(byStrategy).map(([name, data]) => ({ name, ...data }));
  }, [filteredTrades]);

  // Recalculate profit breakdown by asset
  const profitByAsset = useMemo(() => {
    const closedTrades = filteredTrades.filter(t => t.status === 'Closed');
    const byAsset: Record<string, { profit: number; count: number }> = {};
    
    closedTrades.forEach(t => {
      const symbol = t.asset.symbol;
      if (!byAsset[symbol]) byAsset[symbol] = { profit: 0, count: 0 };
      byAsset[symbol].profit += t.pnl;
      byAsset[symbol].count += 1;
    });

    return Object.entries(byAsset).map(([name, data]) => ({ name, ...data }));
  }, [filteredTrades]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights on your trading performance
          </p>
        </div>
        <TimeRangeSelector
          preset={timeRange.preset}
          customStart={timeRange.startDate}
          customEnd={timeRange.endDate}
          onPresetChange={setPreset}
          onCustomRangeChange={setCustomRange}
        />
      </div>

      {/* KPI Cards */}
      <PerformanceKPIs metrics={metrics} periodLabel={periodLabel} />

      {/* Performance Charts */}
      <PerformanceCharts
        equityCurve={filteredEquityCurve}
        weeklyProfit={mockWeeklyProfit}
        profitByTradeType={profitByTradeType.length > 0 ? profitByTradeType : mockProfitByTradeType}
        profitByStrategy={profitByStrategy.length > 0 ? profitByStrategy : mockProfitByStrategy}
        profitByAsset={profitByAsset.length > 0 ? profitByAsset : mockProfitByAsset}
      />

      {/* AI Insights */}
      <AIInsights insights={mockAIInsights} />
    </div>
  );
};

export default TraderPerformance;
