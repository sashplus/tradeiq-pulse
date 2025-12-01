import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignalBadge } from "@/components/signals/SignalBadge";
import { StrategyBadge } from "@/components/signals/StrategyBadge";
import { ScoreBar } from "@/components/signals/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { mockSignals } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Signals = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trading Signals</h1>
          <p className="text-muted-foreground">Comprehensive view of all generated trading signals</p>
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Signals</CardTitle>
          <CardDescription>Click on any signal to view detailed analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Created</th>
                  <th className="p-3 text-left font-medium">Asset</th>
                  <th className="p-3 text-left font-medium">Timeframe</th>
                  <th className="p-3 text-left font-medium">Strategy</th>
                  <th className="p-3 text-left font-medium">Rating</th>
                  <th className="p-3 text-left font-medium">Total Score</th>
                  <th className="p-3 text-left font-medium">F / T</th>
                  <th className="p-3 text-left font-medium">Entry</th>
                  <th className="p-3 text-left font-medium">Target</th>
                  <th className="p-3 text-left font-medium">Stop Loss</th>
                  <th className="p-3 text-left font-medium">Risk</th>
                  <th className="p-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockSignals.map((signal) => (
                  <tr key={signal.id} className="border-b hover:bg-accent/50 transition-colors cursor-pointer">
                    <td className="p-3 text-muted-foreground">
                      {formatDistanceToNow(new Date(signal.created_at), { addSuffix: true })}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{signal.asset.symbol}</div>
                      <div className="text-xs text-muted-foreground">{signal.asset.name}</div>
                    </td>
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
                      <div className="space-y-1">
                        <div className="font-bold">{signal.total_score}</div>
                        <ScoreBar score={signal.total_score} showLabel={false} />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-muted-foreground">F:</span>
                          <span className="font-medium">{signal.fundamental_score}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-muted-foreground">T:</span>
                          <span className="font-medium">{signal.technical_score}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono">${signal.entry_price.toLocaleString()}</td>
                    <td className="p-3 font-mono text-bullish">${signal.target_price.toLocaleString()}</td>
                    <td className="p-3 font-mono text-bearish">${signal.stop_loss.toLocaleString()}</td>
                    <td className="p-3">
                      <Badge 
                        variant="outline"
                        className={
                          signal.risk_level === 'Low' ? 'border-bullish/30 text-bullish' :
                          signal.risk_level === 'High' ? 'border-bearish/30 text-bearish' :
                          'border-neutral/30 text-neutral'
                        }
                      >
                        {signal.risk_level}
                      </Badge>
                    </td>
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

export default Signals;
