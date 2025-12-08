import { PerformanceKPIs } from "@/components/performance/PerformanceKPIs";
import { PerformanceCharts } from "@/components/performance/PerformanceCharts";
import { AIInsights } from "@/components/performance/AIInsights";
import {
  mockPerformanceMetrics,
  mockEquityCurve,
  mockWeeklyProfit,
  mockProfitByTradeType,
  mockProfitByStrategy,
  mockProfitByAsset,
  mockAIInsights,
} from "@/lib/mockTradeData";

const TraderPerformance = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive analytics and insights on your trading performance
        </p>
      </div>

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

      {/* AI Insights */}
      <AIInsights insights={mockAIInsights} />
    </div>
  );
};

export default TraderPerformance;
