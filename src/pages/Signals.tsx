import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignalBadge } from "@/components/signals/SignalBadge";
import { StrategyBadge } from "@/components/signals/StrategyBadge";
import { TradeTypeBadge } from "@/components/signals/TradeTypeBadge";
import { ScoreBar } from "@/components/signals/ScoreBar";
import { SignalStateBadge } from "@/components/signals/SignalStateBadge";
import { SignalResultBadge } from "@/components/signals/SignalResultBadge";
import { LastEventLabel } from "@/components/signals/LastEventLabel";
import { SignalDetailsDrawer } from "@/components/signals/SignalDetailsDrawer";
import { TradeTypeFilter, TradeTypeValue, normalizeTradeType } from "@/components/signals/TradeTypeFilter";
import { mockSignalsWithActions } from "@/lib/mockSignalActions";
import { signalCouncilData, generateCouncilData } from "@/lib/mockCouncilData";
import { getSignalState, getSignalResult, getLastEventLabel, SignalWithActions } from "@/types/signal";
import { formatDistanceToNow } from "date-fns";
import { Filter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CouncilIndicator } from "@/components/council/CouncilIndicator";
import { SignalCouncilModal } from "@/components/council/SignalCouncilModal";

const Signals = () => {
  const [selectedTradeTypes, setSelectedTradeTypes] = useState<Set<TradeTypeValue>>(new Set());
  const [councilModalOpen, setCouncilModalOpen] = useState(false);
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(null);
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [selectedSignalData, setSelectedSignalData] = useState<{
    symbol: string;
    actions: Array<{
      sl: number;
      qty: number;
      tp1: number;
      tp2: number;
      tp3: number;
      side: string | null;
      price: number;
      rating: string | null;
      reason: string;
      symbol: string;
      trade_type: string | null;
      action_type: string;
      total_score: number;
    }>;
  } | null>(null);

  const handleCouncilClick = (e: React.MouseEvent, signalId: string) => {
    e.stopPropagation();
    setSelectedSignalId(signalId);
    setCouncilModalOpen(true);
  };

  const handleDetailsClick = (e: React.MouseEvent, signal: SignalWithActions) => {
    e.stopPropagation();
    // Transform to the new drawer format
    const drawerData = {
      symbol: signal.asset.symbol,
      actions: signal.actions.map(action => ({
        sl: signal.stop_loss,
        qty: action.size_change ? Math.abs(action.size_change) / 100 : 0,
        tp1: signal.target_price,
        tp2: signal.target_price_2 ?? 0,
        tp3: signal.target_price_3 ?? 0,
        side: null,
        price: signal.entry_price,
        rating: signal.rating,
        reason: action.reason,
        symbol: signal.asset.symbol,
        trade_type: signal.holding_period,
        action_type: action.action_type,
        total_score: signal.total_score,
      }))
    };
    setSelectedSignalData(drawerData);
    setDetailsDrawerOpen(true);
  };

  // Filter signals by trade type
  const filteredSignals = useMemo(() => {
    // If none selected or all selected, show all
    if (selectedTradeTypes.size === 0 || selectedTradeTypes.size === 3) {
      return mockSignalsWithActions;
    }
    return mockSignalsWithActions.filter((signal) => {
      const normalized = normalizeTradeType(signal.holding_period);
      return normalized && selectedTradeTypes.has(normalized);
    });
  }, [selectedTradeTypes]);

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
          <CardDescription>Click on any signal to view AI Council analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Created</th>
                  <th className="p-3 text-left font-medium">Asset</th>
                  <th className="p-3 text-left font-medium">
                    <TradeTypeFilter
                      selectedTypes={selectedTradeTypes}
                      onSelectionChange={setSelectedTradeTypes}
                    />
                  </th>
                  <th className="p-3 text-left font-medium">Strategy</th>
                  <th className="p-3 text-left font-medium">Rating</th>
                  <th className="p-3 text-left font-medium">AI Council</th>
                  <th className="p-3 text-left font-medium">Total Score</th>
                  <th className="p-3 text-left font-medium">Entry</th>
                  <th className="p-3 text-left font-medium">Target</th>
                  <th className="p-3 text-left font-medium">Stop Loss</th>
                  <th className="p-3 text-left font-medium">State</th>
                  <th className="p-3 text-left font-medium">Result</th>
                  <th className="p-3 text-left font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredSignals.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="p-8 text-center text-muted-foreground">
                      No signals match the selected trade types
                    </td>
                  </tr>
                ) : (
                  filteredSignals.map((signal) => {
                  const councilData = signalCouncilData[signal.id] || generateCouncilData(parseInt(signal.id));
                  const state = getSignalState(signal.actions);
                  const result = getSignalResult(signal.actions);
                  const lastEvent = getLastEventLabel(signal.actions);
                  const lastAction = signal.actions[signal.actions.length - 1];
                  
                  // Find the reason that caused the close for tooltip
                  const closeReason = state === 'CLOSED' 
                    ? signal.actions.find(a => 
                        a.reason.includes('TP') || 
                        a.reason.includes('SL') || 
                        a.reason.includes('EVaR') ||
                        a.reason === 'Flip Signal' ||
                        a.reason === 'Invalidate Signal'
                      )?.reason
                    : undefined;

                  return (
                    <tr
                      key={signal.id}
                      className="border-b hover:bg-accent/50 transition-colors"
                    >
                      <td className="p-3 text-muted-foreground">
                        {formatDistanceToNow(new Date(signal.created_at), { addSuffix: true })}
                      </td>
                      <td className="p-3">
                        <div className="font-medium">{signal.asset.symbol}</div>
                        <div className="text-xs text-muted-foreground">{signal.asset.name}</div>
                      </td>
                      <td className="p-3">
                        <TradeTypeBadge holdingPeriod={signal.holding_period as any} />
                      </td>
                      <td className="p-3">
                        <StrategyBadge strategy={signal.strategy as any} />
                      </td>
                      <td className="p-3">
                        <SignalBadge rating={signal.rating as any} />
                      </td>
                      <td className="p-3">
                        <div 
                          onClick={(e) => handleCouncilClick(e, signal.id)}
                          className="cursor-pointer"
                        >
                          <CouncilIndicator
                            verdict={councilData.verdict}
                            agreement={councilData.agreement}
                            modelCount={councilData.modelCount}
                          />
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="font-bold">{signal.total_score}</div>
                          <ScoreBar score={signal.total_score} showLabel={false} />
                        </div>
                      </td>
                      <td className="p-3 font-mono">${signal.entry_price.toLocaleString()}</td>
                      <td className="p-3 font-mono text-bullish">${signal.target_price.toLocaleString()}</td>
                      <td className="p-3 font-mono text-bearish">${signal.stop_loss.toLocaleString()}</td>
                      <td className="p-3">
                        <div>
                          <SignalStateBadge state={state} />
                          {state === 'OPEN' && lastEvent && (
                            <LastEventLabel 
                              label={lastEvent} 
                              fullReason={lastAction?.reason}
                            />
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <SignalResultBadge 
                          result={result} 
                          fullReason={closeReason}
                        />
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={(e) => handleDetailsClick(e, signal)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                  })
                )}
              
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <SignalCouncilModal
        open={councilModalOpen}
        onOpenChange={setCouncilModalOpen}
        summary={selectedSignalId ? signalCouncilData[selectedSignalId] : null}
        assetSymbol={selectedSignalId ? mockSignalsWithActions.find(s => s.id === selectedSignalId)?.asset.symbol : undefined}
      />

      <SignalDetailsDrawer
        open={detailsDrawerOpen}
        onOpenChange={setDetailsDrawerOpen}
        signal={selectedSignalData}
      />
    </div>
  );
};

export default Signals;
