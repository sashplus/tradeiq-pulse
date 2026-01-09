import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// New action format from API
interface SignalActionNew {
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
}

interface SignalDataNew {
  symbol: string;
  actions: SignalActionNew[];
}

interface SignalDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signal: SignalDataNew | null;
}

const actionTypeBadgeStyles: Record<string, string> = {
  OPEN: "border-blue-500/50 bg-blue-500/10 text-blue-400",
  CLOSE: "border-zinc-500/50 bg-zinc-500/10 text-zinc-400",
  ADD_LEG: "border-green-500/50 bg-green-500/10 text-green-400",
  MODIFY_SL: "border-orange-500/50 bg-orange-500/10 text-orange-400",
  MODIFY_TP: "border-purple-500/50 bg-purple-500/10 text-purple-400",
  DO_NOTHING: "border-muted-foreground/30 bg-muted/50 text-muted-foreground",
};

// Helper to format price with thousands separator and 2 decimals
function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || value === 0) return "—";
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Helper to format qty with up to 4 decimals
function formatQty(value: number | null | undefined): string {
  if (value === null || value === undefined || value === 0) return "—";
  return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

// Extract latest non-zero/non-null value from actions (scan from end to start)
function getLatestValue<T>(
  actions: SignalActionNew[],
  key: keyof SignalActionNew,
  isValid: (val: T) => boolean
): T | null {
  for (let i = actions.length - 1; i >= 0; i--) {
    const val = actions[i][key] as T;
    if (isValid(val)) return val;
  }
  return null;
}

export function SignalDetailsDrawer({ open, onOpenChange, signal }: SignalDetailsDrawerProps) {
  if (!signal) return null;

  const { symbol, actions } = signal;

  // Extract summary values from actions[] (latest valid value)
  const entry = getLatestValue<number>(actions, 'price', (v) => v !== null && v !== undefined && v > 0);
  const stopLoss = getLatestValue<number>(actions, 'sl', (v) => v !== null && v !== undefined && v > 0);
  const tp1 = getLatestValue<number>(actions, 'tp1', (v) => v !== null && v !== undefined && v > 0);
  const tp2 = getLatestValue<number>(actions, 'tp2', (v) => v !== null && v !== undefined && v > 0);
  const tp3 = getLatestValue<number>(actions, 'tp3', (v) => v !== null && v !== undefined && v > 0);
  const tradeType = getLatestValue<string | null>(actions, 'trade_type', (v) => v !== null && v !== undefined);
  const side = getLatestValue<string | null>(actions, 'side', (v) => v !== null && v !== undefined);
  const totalScore = getLatestValue<number>(actions, 'total_score', (v) => v !== null && v !== undefined && v !== 0);
  const rating = getLatestValue<string | null>(actions, 'rating', (v) => v !== null && v !== undefined);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-3">
            <span className="text-xl font-bold">{symbol}</span>
          </SheetTitle>
        </SheetHeader>

        {/* Summary Section */}
        <div className="py-4 border-b">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Summary</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entry</span>
                <span className="font-mono">{formatPrice(entry)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stop Loss</span>
                <span className="font-mono text-red-400">{formatPrice(stopLoss)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TP1</span>
                <span className="font-mono text-emerald-400">{formatPrice(tp1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TP2</span>
                <span className="font-mono text-emerald-400">{formatPrice(tp2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TP3</span>
                <span className="font-mono text-emerald-400">{formatPrice(tp3)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trade Type</span>
                <span>{tradeType ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Side</span>
                <span>{side ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Score</span>
                <span className="font-bold">{totalScore ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating</span>
                <span>{rating ?? "—"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event History Section */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Event History</h3>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left font-medium text-xs">#</th>
                  <th className="p-2 text-left font-medium text-xs">Action</th>
                  <th className="p-2 text-left font-medium text-xs">Reason</th>
                  <th className="p-2 text-right font-medium text-xs">Price</th>
                  <th className="p-2 text-right font-medium text-xs">Qty</th>
                  <th className="p-2 text-right font-medium text-xs">SL</th>
                  <th className="p-2 text-right font-medium text-xs">TP1</th>
                  <th className="p-2 text-right font-medium text-xs">TP2</th>
                  <th className="p-2 text-right font-medium text-xs">TP3</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-0"
                  >
                    <td className="p-2 text-xs text-muted-foreground">
                      {index + 1}
                    </td>
                    <td className="p-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] px-1.5 py-0",
                          actionTypeBadgeStyles[action.action_type] || actionTypeBadgeStyles.DO_NOTHING
                        )}
                      >
                        {action.action_type}
                      </Badge>
                    </td>
                    <td className="p-2 text-xs max-w-[180px] truncate" title={action.reason}>
                      {action.reason}
                    </td>
                    <td className="p-2 text-xs text-right font-mono">
                      {formatPrice(action.price)}
                    </td>
                    <td className="p-2 text-xs text-right font-mono">
                      {formatQty(action.qty)}
                    </td>
                    <td className="p-2 text-xs text-right font-mono">
                      {formatPrice(action.sl)}
                    </td>
                    <td className="p-2 text-xs text-right font-mono">
                      {formatPrice(action.tp1)}
                    </td>
                    <td className="p-2 text-xs text-right font-mono">
                      {formatPrice(action.tp2)}
                    </td>
                    <td className="p-2 text-xs text-right font-mono">
                      {formatPrice(action.tp3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
