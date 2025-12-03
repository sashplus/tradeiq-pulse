import { DollarSign, Percent, BarChart3, TrendingUp, Shield, Coins, PieChart } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceMetrics } from "@/lib/mockTradeData";
import { cn } from "@/lib/utils";

interface PerformanceKPIsProps {
  metrics: PerformanceMetrics;
}

export function PerformanceKPIs({ metrics }: PerformanceKPIsProps) {
  return (
    <div className="space-y-4">
      {/* Main KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <KPICard
          title="Total Profit (PnL)"
          value={`$${metrics.totalPnL.toLocaleString()}`}
          icon={DollarSign}
          trend={{
            value: `+${metrics.pnlChange}% vs last period`,
            positive: metrics.pnlChange > 0,
          }}
        />
        <KPICard
          title="Win Rate"
          value={`${metrics.winRate}%`}
          icon={Percent}
          trend={{
            value: "+5.2% vs last month",
            positive: true,
          }}
        />
        <KPICard
          title="Total Trades"
          value={metrics.totalTrades}
          icon={BarChart3}
        />
        <KPICard
          title="Avg Risk/Reward"
          value={`${metrics.avgRiskReward}:1`}
          icon={TrendingUp}
          trend={{
            value: "+0.3 improvement",
            positive: true,
          }}
        />
        <KPICard
          title="Risk-Adjusted Score"
          value={metrics.riskAdjustedScore.toFixed(2)}
          icon={Shield}
          trend={{
            value: "Sharpe-like metric",
            positive: true,
          }}
        />
        <KPICard
          title="Most Traded Asset"
          value={metrics.mostTradedAsset}
          icon={Coins}
        />
      </div>

      {/* Profit by Strategy */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <PieChart className="h-4 w-4 text-primary" />
            Profit by Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(metrics.profitByStrategy).map(([strategy, profit]) => {
              const isPositive = profit > 0;
              return (
                <div
                  key={strategy}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-accent/30"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">{strategy}</p>
                    <p className={cn(
                      "text-xl font-bold",
                      isPositive ? "text-bullish" : profit < 0 ? "text-bearish" : "text-muted-foreground"
                    )}>
                      {isPositive ? '+' : ''}{profit < 0 ? '-' : ''}${Math.abs(profit).toLocaleString()}
                    </p>
                  </div>
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    strategy === 'Aggressive' ? 'bg-chart-5' :
                    strategy === 'Moderate' ? 'bg-chart-2' : 'bg-chart-4'
                  )} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
