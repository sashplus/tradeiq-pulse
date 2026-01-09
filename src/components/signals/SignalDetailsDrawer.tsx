import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { SignalWithActions, SignalAction, getSignalState, getSignalResult } from "@/types/signal";
import { SignalStateBadge } from "./SignalStateBadge";
import { SignalResultBadge } from "./SignalResultBadge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SignalDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signal: SignalWithActions | null;
}

const actionTypeBadgeStyles: Record<string, string> = {
  OPEN: "border-blue-500/50 bg-blue-500/10 text-blue-400",
  CLOSE: "border-red-500/50 bg-red-500/10 text-red-400",
  ADD_LEG: "border-green-500/50 bg-green-500/10 text-green-400",
  MODIFY_SL: "border-orange-500/50 bg-orange-500/10 text-orange-400",
  MODIFY_TP: "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  DO_NOTHING: "border-muted-foreground/30 bg-muted/50 text-muted-foreground",
};

export function SignalDetailsDrawer({ open, onOpenChange, signal }: SignalDetailsDrawerProps) {
  if (!signal) return null;

  const state = getSignalState(signal.actions);
  const result = getSignalResult(signal.actions);
  
  // Find the final event for highlighting
  const finalEventIndex = signal.actions.findIndex(a => a.reason === 'All Legs Closed');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-3">
            <span className="text-xl font-bold">{signal.asset.symbol}</span>
            <SignalStateBadge state={state} />
            {state === 'CLOSED' && <SignalResultBadge result={result} />}
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            {signal.asset.name} • {signal.holding_period} • {signal.strategy}
          </p>
        </SheetHeader>

        {/* Summary Section */}
        <div className="py-4 border-b">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entry</span>
                <span className="font-mono">${signal.entry_price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TP1</span>
                <span className="font-mono text-emerald-400">${signal.target_price.toLocaleString()}</span>
              </div>
              {signal.target_price_2 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TP2</span>
                  <span className="font-mono text-emerald-400">${signal.target_price_2.toLocaleString()}</span>
                </div>
              )}
              {signal.target_price_3 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TP3</span>
                  <span className="font-mono text-emerald-400">${signal.target_price_3.toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stop Loss</span>
                <span className="font-mono text-red-400">${signal.stop_loss.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk Level</span>
                <span>{signal.risk_level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Score</span>
                <span className="font-bold">{signal.total_score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Event History</h3>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left font-medium text-xs">Time</th>
                  <th className="p-2 text-left font-medium text-xs">Action</th>
                  <th className="p-2 text-left font-medium text-xs">Reason</th>
                  <th className="p-2 text-right font-medium text-xs">Size</th>
                </tr>
              </thead>
              <tbody>
                {signal.actions.map((action, index) => {
                  const isFinalEvent = index === finalEventIndex - 1 && state === 'CLOSED';
                  const isAllLegsClosed = action.reason === 'All Legs Closed';
                  
                  return (
                    <tr
                      key={action.id}
                      className={cn(
                        "border-b last:border-0",
                        isFinalEvent && "bg-primary/5 border-l-2 border-l-primary",
                        isAllLegsClosed && "text-muted-foreground/60"
                      )}
                    >
                      <td className="p-2 text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(action.timestamp), 'MMM d, HH:mm')}
                      </td>
                      <td className="p-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] px-1.5 py-0",
                            actionTypeBadgeStyles[action.action_type]
                          )}
                        >
                          {action.action_type}
                        </Badge>
                      </td>
                      <td className="p-2 text-xs max-w-[200px] truncate" title={action.reason}>
                        {action.reason}
                      </td>
                      <td className="p-2 text-xs text-right font-mono">
                        {action.size_change !== undefined && (
                          <span className={action.size_change < 0 ? "text-red-400" : "text-green-400"}>
                            {action.size_change > 0 ? '+' : ''}{action.size_change}%
                          </span>
                        )}
                        {action.remaining_size !== undefined && (
                          <span className="text-muted-foreground ml-1">
                            ({action.remaining_size}%)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
