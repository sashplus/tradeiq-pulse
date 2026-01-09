import { SignalWithActions, SignalAction } from '@/types/signal';
import { mockAssets, mockNews } from './mockData';

// Generate mock actions for signals
function createActions(signalId: string, scenario: string): SignalAction[] {
  const baseTime = Date.now() - 86400000; // 1 day ago
  
  switch (scenario) {
    case 'open_tp1_be':
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 4h FS=85.5',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
        {
          id: `${signalId}-2`,
          action_type: 'MODIFY_TP',
          reason: 'TP1 Hit -> BE',
          timestamp: new Date(baseTime + 3600000).toISOString(),
          remaining_size: 66,
        },
      ];
    
    case 'open_trailing':
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 1d FS=78.2',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
        {
          id: `${signalId}-2`,
          action_type: 'MODIFY_TP',
          reason: 'TP1 Hit -> BE',
          timestamp: new Date(baseTime + 7200000).toISOString(),
          remaining_size: 66,
        },
        {
          id: `${signalId}-3`,
          action_type: 'MODIFY_SL',
          reason: 'TP2 Hit -> Trailing',
          timestamp: new Date(baseTime + 14400000).toISOString(),
          remaining_size: 33,
        },
      ];
    
    case 'open_derisk':
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 4h FS=62.0',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
        {
          id: `${signalId}-2`,
          action_type: 'CLOSE',
          reason: 'EVaR Soft Limit - Derisk 50%',
          timestamp: new Date(baseTime + 10800000).toISOString(),
          size_change: -50,
          remaining_size: 50,
        },
      ];
    
    case 'closed_tp1':
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 1h FS=74.5',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
        {
          id: `${signalId}-2`,
          action_type: 'CLOSE',
          reason: 'TP1 Hit',
          timestamp: new Date(baseTime + 7200000).toISOString(),
          size_change: -100,
          remaining_size: 0,
        },
        {
          id: `${signalId}-3`,
          action_type: 'DO_NOTHING',
          reason: 'All Legs Closed',
          timestamp: new Date(baseTime + 7200001).toISOString(),
          remaining_size: 0,
        },
      ];
    
    case 'closed_tp2':
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 4h FS=88.0',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
        {
          id: `${signalId}-2`,
          action_type: 'MODIFY_TP',
          reason: 'TP1 Hit -> BE',
          timestamp: new Date(baseTime + 3600000).toISOString(),
          remaining_size: 66,
        },
        {
          id: `${signalId}-3`,
          action_type: 'CLOSE',
          reason: 'TP2 Hit',
          timestamp: new Date(baseTime + 10800000).toISOString(),
          size_change: -66,
          remaining_size: 0,
        },
        {
          id: `${signalId}-4`,
          action_type: 'DO_NOTHING',
          reason: 'All Legs Closed',
          timestamp: new Date(baseTime + 10800001).toISOString(),
          remaining_size: 0,
        },
      ];
    
    case 'closed_sl':
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 1d FS=55.0',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
        {
          id: `${signalId}-2`,
          action_type: 'CLOSE',
          reason: 'SL Hit Leg 1',
          timestamp: new Date(baseTime + 21600000).toISOString(),
          size_change: -100,
          remaining_size: 0,
        },
        {
          id: `${signalId}-3`,
          action_type: 'DO_NOTHING',
          reason: 'All Legs Closed',
          timestamp: new Date(baseTime + 21600001).toISOString(),
          remaining_size: 0,
        },
      ];
    
    case 'closed_risk':
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 4h FS=70.0',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
        {
          id: `${signalId}-2`,
          action_type: 'CLOSE',
          reason: 'EVaR Hard Limit (Heartbeat)',
          timestamp: new Date(baseTime + 18000000).toISOString(),
          size_change: -100,
          remaining_size: 0,
        },
        {
          id: `${signalId}-3`,
          action_type: 'DO_NOTHING',
          reason: 'All Legs Closed',
          timestamp: new Date(baseTime + 18000001).toISOString(),
          remaining_size: 0,
        },
      ];
    
    case 'closed_flip':
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 1h FS=65.0',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
        {
          id: `${signalId}-2`,
          action_type: 'CLOSE',
          reason: 'Flip Signal',
          timestamp: new Date(baseTime + 14400000).toISOString(),
          size_change: -100,
          remaining_size: 0,
        },
        {
          id: `${signalId}-3`,
          action_type: 'DO_NOTHING',
          reason: 'All Legs Closed',
          timestamp: new Date(baseTime + 14400001).toISOString(),
          remaining_size: 0,
        },
      ];
    
    case 'closed_invalidate':
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 4h FS=58.0',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
        {
          id: `${signalId}-2`,
          action_type: 'CLOSE',
          reason: 'Invalidate Signal',
          timestamp: new Date(baseTime + 28800000).toISOString(),
          size_change: -100,
          remaining_size: 0,
        },
        {
          id: `${signalId}-3`,
          action_type: 'DO_NOTHING',
          reason: 'All Legs Closed',
          timestamp: new Date(baseTime + 28800001).toISOString(),
          remaining_size: 0,
        },
      ];
    
    default:
      return [
        {
          id: `${signalId}-1`,
          action_type: 'OPEN',
          reason: 'Entry 4h FS=75.0',
          timestamp: new Date(baseTime).toISOString(),
          remaining_size: 100,
        },
      ];
  }
}

// Extended mock signals with actions
export const mockSignalsWithActions: SignalWithActions[] = [
  {
    id: '1',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    asset: mockAssets[0],
    timeframe: '4h',
    total_score: 86,
    fundamental_score: 88,
    technical_score: 84,
    onchain_score: 82,
    rating: 'Strong Buy',
    entry_price: 67500,
    target_price: 72000,
    target_price_2: 74500,
    target_price_3: 78000,
    stop_loss: 65000,
    risk_level: 'Medium',
    holding_period: 'Scalping',
    strategy: 'Aggressive',
    source_news: [mockNews[0]],
    notes: 'Strong bullish momentum with ETF inflows',
    actions: createActions('1', 'open_tp1_be'),
  },
  {
    id: '2',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    asset: mockAssets[2],
    timeframe: '1d',
    total_score: 81,
    fundamental_score: 83,
    technical_score: 79,
    onchain_score: 78,
    rating: 'Buy',
    entry_price: 145.50,
    target_price: 165.00,
    target_price_2: 175.00,
    stop_loss: 138.00,
    risk_level: 'Medium',
    holding_period: 'Day trade',
    strategy: 'Moderate',
    source_news: [mockNews[3]],
    actions: createActions('2', 'open_trailing'),
  },
  {
    id: '3',
    created_at: new Date(Date.now() - 10800000).toISOString(),
    asset: mockAssets[3],
    timeframe: '1h',
    total_score: 74,
    fundamental_score: 71,
    technical_score: 77,
    onchain_score: 72,
    rating: 'Buy',
    entry_price: 178.25,
    target_price: 183.50,
    stop_loss: 175.80,
    risk_level: 'Low',
    holding_period: 'Swing',
    strategy: 'Cautious',
    source_news: [mockNews[4]],
    actions: createActions('3', 'closed_tp1'),
  },
  {
    id: '4',
    created_at: new Date(Date.now() - 14400000).toISOString(),
    asset: mockAssets[1],
    timeframe: '4h',
    total_score: 45,
    fundamental_score: 42,
    technical_score: 48,
    onchain_score: 46,
    rating: 'Neutral',
    entry_price: 3550,
    target_price: 3650,
    stop_loss: 3480,
    risk_level: 'Medium',
    holding_period: 'Day trade',
    strategy: 'Cautious',
    source_news: [mockNews[2]],
    actions: createActions('4', 'open_derisk'),
  },
  {
    id: '5',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    asset: mockAssets[0],
    timeframe: '1d',
    total_score: 88,
    fundamental_score: 85,
    technical_score: 91,
    onchain_score: 87,
    rating: 'Strong Buy',
    entry_price: 65200,
    target_price: 70000,
    target_price_2: 72500,
    target_price_3: 75000,
    stop_loss: 63000,
    risk_level: 'Low',
    holding_period: 'Swing',
    strategy: 'Aggressive',
    source_news: [mockNews[0], mockNews[1]],
    actions: createActions('5', 'closed_tp2'),
  },
  {
    id: '6',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    asset: mockAssets[1],
    timeframe: '4h',
    total_score: 52,
    fundamental_score: 48,
    technical_score: 55,
    onchain_score: 50,
    rating: 'Neutral',
    entry_price: 3420,
    target_price: 3550,
    stop_loss: 3350,
    risk_level: 'High',
    holding_period: 'Day trade',
    strategy: 'Aggressive',
    source_news: [mockNews[2]],
    actions: createActions('6', 'closed_sl'),
  },
  {
    id: '7',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    asset: mockAssets[4],
    timeframe: '1d',
    total_score: 68,
    fundamental_score: 70,
    technical_score: 65,
    onchain_score: 67,
    rating: 'Buy',
    entry_price: 245.00,
    target_price: 260.00,
    stop_loss: 235.00,
    risk_level: 'Medium',
    holding_period: 'Swing',
    strategy: 'Moderate',
    source_news: [],
    actions: createActions('7', 'closed_risk'),
  },
  {
    id: '8',
    created_at: new Date(Date.now() - 345600000).toISOString(),
    asset: mockAssets[2],
    timeframe: '1h',
    total_score: 72,
    fundamental_score: 75,
    technical_score: 70,
    onchain_score: 68,
    rating: 'Buy',
    entry_price: 138.00,
    target_price: 148.00,
    stop_loss: 132.00,
    risk_level: 'Low',
    holding_period: 'Scalping',
    strategy: 'Cautious',
    source_news: [mockNews[3]],
    actions: createActions('8', 'closed_flip'),
  },
  {
    id: '9',
    created_at: new Date(Date.now() - 432000000).toISOString(),
    asset: mockAssets[5],
    timeframe: '4h',
    total_score: 55,
    fundamental_score: 52,
    technical_score: 58,
    onchain_score: 54,
    rating: 'Neutral',
    entry_price: 875.00,
    target_price: 920.00,
    stop_loss: 850.00,
    risk_level: 'Medium',
    holding_period: 'Day trade',
    strategy: 'Moderate',
    source_news: [],
    actions: createActions('9', 'closed_invalidate'),
  },
  {
    id: '10',
    created_at: new Date(Date.now() - 1800000).toISOString(),
    asset: mockAssets[0],
    timeframe: '1h',
    total_score: 79,
    fundamental_score: 82,
    technical_score: 76,
    onchain_score: 80,
    rating: 'Buy',
    entry_price: 68200,
    target_price: 71000,
    stop_loss: 66500,
    risk_level: 'Low',
    holding_period: 'Scalping',
    strategy: 'Moderate',
    source_news: [mockNews[0]],
    actions: createActions('10', 'default'),
  },
];
