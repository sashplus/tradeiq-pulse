import { Activity, TrendingUp, FileText, CheckCircle2, BarChart3, AlertCircle } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignalBadge } from "@/components/signals/SignalBadge";
import { StrategyBadge } from "@/components/signals/StrategyBadge";
import { SentimentBadge } from "@/components/signals/SentimentBadge";
import { ScoreBar } from "@/components/signals/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { mockSignals, mockNews } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const activeSignals = mockSignals.filter(s => s.status === 'Active').length;
  const strongBuySignals = mockSignals.filter(s => s.rating === 'Strong Buy' || s.rating === 'Buy').length;
  const newsProcessed = mockNews.length;
  const avgFundamentalScore = Math.round(mockSignals.reduce((acc, s) => acc + s.fundamental_score, 0) / mockSignals.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your trading signals and market activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Active Signals"
          value={activeSignals}
          icon={Activity}
          trend={{ value: "+2 from yesterday", positive: true }}
        />
        <KPICard
          title="Strong Buy/Buy"
          value={strongBuySignals}
          icon={TrendingUp}
          trend={{ value: "+3 this week", positive: true }}
        />
        <KPICard
          title="News Processed (24h)"
          value={newsProcessed}
          icon={FileText}
        />
        <KPICard
          title="Avg Fundamental Score"
          value={avgFundamentalScore}
          icon={BarChart3}
          trend={{ value: "+5 vs last week", positive: true }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Top Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Top Opportunities
            </CardTitle>
            <CardDescription>Highest-scoring signals from the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSignals.slice(0, 3).map((signal) => (
              <div key={signal.id} className="p-4 border border-border rounded-lg space-y-2 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg">{signal.asset.symbol}</div>
                    <SignalBadge rating={signal.rating} />
                    <StrategyBadge strategy={signal.strategy} />
                  </div>
                  <Badge variant="outline">{signal.holding_period}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">F:</span>
                    <span className="font-medium ml-1">{signal.fundamental_score}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">T:</span>
                    <span className="font-medium ml-1">{signal.technical_score}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">O:</span>
                    <span className="font-medium ml-1">{signal.onchain_score}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium ml-1">{signal.total_score}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                  <div>
                    <span className="text-muted-foreground">Entry:</span>
                    <span className="font-mono ml-1">${signal.entry_price.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target:</span>
                    <span className="font-mono ml-1 text-bullish">${signal.target_price.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">SL:</span>
                    <span className="font-mono ml-1 text-bearish">${signal.stop_loss.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent News */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Recent News
            </CardTitle>
            <CardDescription>Latest market-moving news items</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockNews.slice(0, 4).map((news) => (
              <div key={news.id} className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{news.source}</Badge>
                    <SentimentBadge sentiment={news.sentiment_label} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(news.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <h4 className="font-medium text-sm leading-snug mb-2">{news.headline}</h4>
                <div className="flex items-center gap-2">
                  {news.assets.map((asset) => (
                    <Badge key={asset.id} variant="outline" className="text-xs">
                      {asset.symbol}
                    </Badge>
                  ))}
                  <div className="ml-auto">
                    <ScoreBar score={news.fundamental_score} showLabel={false} className="w-20" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Signals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Signals</CardTitle>
          <CardDescription>All generated signals from the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Time</th>
                  <th className="p-3 text-left font-medium">Asset</th>
                  <th className="p-3 text-left font-medium">Timeframe</th>
                  <th className="p-3 text-left font-medium">Strategy</th>
                  <th className="p-3 text-left font-medium">Rating</th>
                  <th className="p-3 text-left font-medium">Scores</th>
                  <th className="p-3 text-left font-medium">Entry</th>
                  <th className="p-3 text-left font-medium">Target</th>
                  <th className="p-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockSignals.map((signal) => (
                  <tr key={signal.id} className="border-b hover:bg-accent/50 transition-colors cursor-pointer">
                    <td className="p-3 text-muted-foreground">
                      {formatDistanceToNow(new Date(signal.created_at), { addSuffix: true })}
                    </td>
                    <td className="p-3 font-medium">{signal.asset.symbol}</td>
                    <td className="p-3">
                      <Badge variant="outline">{signal.timeframe}</Badge>
                    </td>
                    <td className="p-3">
                      <StrategyBadge strategy={signal.strategy} />
                    </td>
                    <td className="p-3">
                      <SignalBadge rating={signal.rating} />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-muted-foreground">F:</span>
                        <span>{signal.fundamental_score}</span>
                        <span className="text-muted-foreground mx-1">/</span>
                        <span className="text-muted-foreground">T:</span>
                        <span>{signal.technical_score}</span>
                        <span className="text-muted-foreground mx-1">/</span>
                        <span className="text-muted-foreground">O:</span>
                        <span>{signal.onchain_score}</span>
                        <span className="text-muted-foreground mx-1">=</span>
                        <span className="font-medium">{signal.total_score}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono">${signal.entry_price.toLocaleString()}</td>
                    <td className="p-3 font-mono text-bullish">${signal.target_price.toLocaleString()}</td>
                    <td className="p-3">
                      <Badge variant={signal.status === 'Active' ? 'default' : 'secondary'}>
                        {signal.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
