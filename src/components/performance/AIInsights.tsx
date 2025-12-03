import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Clock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightsProps {
  insights: {
    mostProfitableAsset: string;
    bestTradeType: string;
    bestStrategy: string;
    commonMistakes: string[];
    timeOfDayPerformance: string;
    topTrades: { asset: string; pnl: number; date: string; strategy: string }[];
    worstTrades: { asset: string; pnl: number; date: string; strategy: string }[];
  };
}

export function AIInsights({ insights }: AIInsightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights & Recommendations
        </CardTitle>
        <CardDescription>
          AI-generated analysis of your trading patterns and performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Insights Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 rounded-lg border border-border bg-accent/30">
            <p className="text-xs text-muted-foreground mb-1">Most Profitable Asset</p>
            <p className="text-xl font-bold text-bullish">{insights.mostProfitableAsset}</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-accent/30">
            <p className="text-xs text-muted-foreground mb-1">Best Trade Type</p>
            <p className="text-xl font-bold text-primary">{insights.bestTradeType}</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-accent/30">
            <p className="text-xs text-muted-foreground mb-1">Best Strategy</p>
            <p className="text-xl font-bold text-chart-4">{insights.bestStrategy}</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-accent/30">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Clock className="h-3 w-3" />
              Best Trading Time
            </div>
            <p className="text-sm font-medium">Asian Hours</p>
          </div>
        </div>

        {/* Time Performance */}
        <div className="p-4 rounded-lg border border-border bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <h4 className="font-medium">Time-of-Day Performance</h4>
          </div>
          <p className="text-sm text-muted-foreground">{insights.timeOfDayPerformance}</p>
        </div>

        {/* Common Mistakes */}
        <div className="p-4 rounded-lg border border-border bg-muted/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-chart-4" />
            <h4 className="font-medium">Common Mistakes to Avoid</h4>
          </div>
          <ul className="space-y-2">
            {insights.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-chart-4 mt-0.5">•</span>
                <span className="text-muted-foreground">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top & Worst Trades */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Top 5 Trades */}
          <div className="p-4 rounded-lg border border-bullish/30 bg-bullish/5">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-4 w-4 text-bullish" />
              <h4 className="font-medium text-bullish">Top 5 Best Trades</h4>
            </div>
            <div className="space-y-2">
              {insights.topTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">{trade.asset}</span>
                    <Badge variant="outline" className="text-xs">{trade.strategy}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">{trade.date}</span>
                    <span className="font-mono font-medium text-bullish">+${trade.pnl.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worst 5 Trades */}
          <div className="p-4 rounded-lg border border-bearish/30 bg-bearish/5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-4 w-4 text-bearish" />
              <h4 className="font-medium text-bearish">Top 5 Worst Trades</h4>
            </div>
            <div className="space-y-2">
              {insights.worstTrades.length > 0 ? (
                insights.worstTrades.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium">{trade.asset}</span>
                      <Badge variant="outline" className="text-xs">{trade.strategy}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">{trade.date}</span>
                      <span className="font-mono font-medium text-bearish">-${Math.abs(trade.pnl).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No losing trades recorded</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
