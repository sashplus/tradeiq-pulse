import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignalBadge } from "@/components/signals/SignalBadge";
import { StrategyBadge } from "@/components/signals/StrategyBadge";
import { TradeTypeBadge } from "@/components/signals/TradeTypeBadge";
import { Trade, TradeResult } from "@/lib/mockTradeData";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { CouncilIndicator } from "@/components/council/CouncilIndicator";
import { SignalCouncilModal } from "@/components/council/SignalCouncilModal";
import { generateSignalCouncilSummary } from "@/lib/mockCouncilData";

interface TradesTableProps {
  trades: Trade[];
}

type SortKey = 'timestamp' | 'asset' | 'pnl' | 'rating';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 5;

function ResultBadge({ result }: { result: TradeResult }) {
  const variants: Record<TradeResult, string> = {
    'Win': 'bg-bullish/20 text-bullish border-bullish/30',
    'Loss': 'bg-bearish/20 text-bearish border-bearish/30',
    'Break-even': 'bg-muted text-muted-foreground border-border',
  };

  return (
    <Badge variant="outline" className={cn(variants[result], "font-medium")}>
      {result}
    </Badge>
  );
}

export function TradesTable({ trades }: TradesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null);

  const sortedTrades = useMemo(() => {
    return [...trades].sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case 'timestamp':
          comparison = new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          break;
        case 'asset':
          comparison = a.asset.symbol.localeCompare(b.asset.symbol);
          break;
        case 'pnl':
          comparison = b.pnl - a.pnl;
          break;
        case 'rating':
          comparison = a.rating.localeCompare(b.rating);
          break;
      }
      return sortDirection === 'asc' ? -comparison : comparison;
    });
  }, [trades, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedTrades.length / ITEMS_PER_PAGE);
  const paginatedTrades = sortedTrades.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const SortHeader = ({ label, sortKeyName }: { label: string; sortKeyName: SortKey }) => (
    <th 
      className="p-3 text-left font-medium cursor-pointer hover:bg-muted/70 transition-colors"
      onClick={() => handleSort(sortKeyName)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className={cn(
          "h-3 w-3",
          sortKey === sortKeyName ? "text-primary" : "text-muted-foreground"
        )} />
      </div>
    </th>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Trades</CardTitle>
        <CardDescription>Detailed history of all trades with sorting and pagination</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b bg-muted/50">
                <SortHeader label="Time" sortKeyName="timestamp" />
                <SortHeader label="Asset" sortKeyName="asset" />
                <th className="p-3 text-left font-medium">Trade Type</th>
                <th className="p-3 text-left font-medium">Strategy</th>
                <SortHeader label="Rating" sortKeyName="rating" />
                <th className="p-3 text-left font-medium">Entry</th>
                <th className="p-3 text-left font-medium">Stop Loss</th>
                <th className="p-3 text-left font-medium">Target</th>
                <th className="p-3 text-left font-medium">Result</th>
                <SortHeader label="PnL" sortKeyName="pnl" />
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">AI Council</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrades.map((trade) => (
                <tr key={trade.id} className="border-b hover:bg-accent/50 transition-colors">
                  <td className="p-3 text-muted-foreground">
                    {formatDistanceToNow(new Date(trade.timestamp), { addSuffix: true })}
                  </td>
                  <td className="p-3 font-medium">{trade.asset.symbol}</td>
                  <td className="p-3">
                    <TradeTypeBadge holdingPeriod={trade.tradeType} />
                  </td>
                  <td className="p-3">
                    <StrategyBadge strategy={trade.strategy} />
                  </td>
                  <td className="p-3">
                    <SignalBadge rating={trade.rating} />
                  </td>
                  <td className="p-3 font-mono">${trade.entryPrice.toLocaleString()}</td>
                  <td className="p-3 font-mono text-bearish">${trade.stopLoss.toLocaleString()}</td>
                  <td className="p-3 font-mono text-bullish">${trade.targetPrice.toLocaleString()}</td>
                  <td className="p-3">
                    <ResultBadge result={trade.result} />
                  </td>
                  <td className={cn(
                    "p-3 font-mono font-medium",
                    trade.pnl > 0 ? "text-bullish" : trade.pnl < 0 ? "text-bearish" : "text-muted-foreground"
                  )}>
                    {trade.pnl > 0 ? '+' : ''}{trade.pnl !== 0 ? `$${trade.pnl.toLocaleString()}` : '-'}
                  </td>
                  <td className="p-3">
                    <Badge variant={trade.status === 'Active' ? 'default' : 'secondary'}>
                      {trade.status}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <button 
                      onClick={() => setSelectedTradeId(trade.id)}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <CouncilIndicator
                        verdict={generateSignalCouncilSummary(trade.id).verdict}
                        agreement={generateSignalCouncilSummary(trade.id).agreement}
                        modelCount={generateSignalCouncilSummary(trade.id).modelCount}
                        compact
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Council Modal */}
        <SignalCouncilModal
          open={!!selectedTradeId}
          onOpenChange={(open) => !open && setSelectedTradeId(null)}
          summary={selectedTradeId ? generateSignalCouncilSummary(selectedTradeId) : null}
          assetSymbol={paginatedTrades.find(t => t.id === selectedTradeId)?.asset.symbol}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, sortedTrades.length)} of {sortedTrades.length} trades
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
