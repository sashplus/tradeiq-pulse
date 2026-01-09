// Signal action types for position events
export type SignalActionType = 'OPEN' | 'CLOSE' | 'ADD_LEG' | 'MODIFY_SL' | 'MODIFY_TP' | 'DO_NOTHING';

export interface SignalAction {
  id: string;
  action_type: SignalActionType;
  reason: string;
  timestamp: string;
  leg_id?: string;
  size_change?: number;
  remaining_size?: number;
}

export type SignalState = 'OPEN' | 'CLOSED';

export type SignalResult = 
  | 'TP1' 
  | 'TP2' 
  | 'TP3' 
  | 'SL' 
  | 'Risk' 
  | 'Flip' 
  | 'Invalidated' 
  | 'Closed';

export interface SignalWithActions {
  id: string;
  created_at: string;
  asset: {
    id: string;
    symbol: string;
    name: string;
    type: string;
    watchlisted: boolean;
  };
  timeframe: string;
  total_score: number;
  fundamental_score: number;
  technical_score: number;
  onchain_score: number;
  rating: string;
  entry_price: number;
  target_price: number;
  target_price_2?: number;
  target_price_3?: number;
  stop_loss: number;
  risk_level: string;
  holding_period: string;
  strategy: string;
  source_news: any[];
  notes?: string;
  actions: SignalAction[];
}

// Helper to determine signal state from actions
export function getSignalState(actions: SignalAction[]): SignalState {
  const hasAllLegsClosed = actions.some(
    (a) => a.reason === 'All Legs Closed' || a.remaining_size === 0
  );
  return hasAllLegsClosed ? 'CLOSED' : 'OPEN';
}

// Helper to determine result from actions (only for CLOSED signals)
export function getSignalResult(actions: SignalAction[]): SignalResult | null {
  const state = getSignalState(actions);
  if (state === 'OPEN') return null;

  // Find the final close event index
  const allLegsClosedIndex = actions.findIndex((a) => a.reason === 'All Legs Closed');
  
  // Look for the cause event before "All Legs Closed"
  const relevantActions = allLegsClosedIndex > 0 
    ? actions.slice(0, allLegsClosedIndex) 
    : actions;
  
  // Find the last meaningful close action
  for (let i = relevantActions.length - 1; i >= 0; i--) {
    const reason = relevantActions[i].reason;
    
    if (reason.includes('TP1 Hit') || reason === 'TP1 Hit') return 'TP1';
    if (reason.includes('TP2 Hit') || reason === 'TP2 Hit') return 'TP2';
    if (reason.includes('TP3 Hit') || reason === 'TP3 Hit') return 'TP3';
    if (reason.includes('SL Hit')) return 'SL';
    if (reason.includes('EVaR Hard Limit') || reason.includes('EVaR Hard Limit (Heartbeat)')) return 'Risk';
    if (reason === 'Flip Signal') return 'Flip';
    if (reason === 'Invalidate Signal') return 'Invalidated';
  }
  
  return 'Closed';
}

// Helper to get last event label for OPEN signals
export function getLastEventLabel(actions: SignalAction[]): string | null {
  const state = getSignalState(actions);
  if (state === 'CLOSED' || actions.length === 0) return null;

  const lastAction = actions[actions.length - 1];
  const reason = lastAction.reason;

  // Map reasons to short labels
  if (reason === 'TP1 Hit -> BE') return 'TP1 • BE';
  if (reason === 'TP2 Hit -> Trailing') return 'TP2 • Trailing';
  if (reason.includes('EVaR Soft Limit - Derisk')) {
    const match = reason.match(/Derisk (\d+%)/);
    return match ? `Derisk ${match[1]}` : 'Derisk';
  }
  if (reason === 'Trailing') return 'Trailing moved';
  if (reason.startsWith('Entry')) return reason;
  if (reason.includes('TP') && reason.includes('Hit') && !reason.includes('->')) {
    return reason.replace(' Hit', ' Hit (partial)');
  }
  if (reason.includes('SL Hit') && lastAction.remaining_size && lastAction.remaining_size > 0) {
    return 'SL Hit (partial)';
  }

  // Fallback: truncate if too long
  return reason.length > 20 ? reason.slice(0, 18) + '…' : reason;
}
