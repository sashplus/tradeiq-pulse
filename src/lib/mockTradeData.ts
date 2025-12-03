import { Asset, HoldingPeriod, StrategyType, SignalRating } from '@/types';
import { mockAssets } from './mockData';

export type TradeResult = 'Win' | 'Loss' | 'Break-even';
export type TradeStatus = 'Closed' | 'Active';

export interface Trade {
  id: string;
  timestamp: string;
  asset: Asset;
  tradeType: HoldingPeriod;
  strategy: StrategyType;
  rating: SignalRating;
  entryPrice: number;
  stopLoss: number;
  targetPrice: number;
  exitPrice?: number;
  result: TradeResult;
  pnl: number;
  pnlPercent: number;
  status: TradeStatus;
}

export interface PerformanceMetrics {
  totalPnL: number;
  totalPnLPercent: number;
  pnlChange: number;
  winRate: number;
  totalTrades: number;
  avgRiskReward: number;
  riskAdjustedScore: number;
  mostTradedAsset: string;
  profitByStrategy: {
    Aggressive: number;
    Moderate: number;
    Cautious: number;
  };
}

export interface EquityPoint {
  date: string;
  equity: number;
}

export interface ProfitByPeriod {
  period: string;
  profit: number;
}

// Generate mock trades
export const mockTrades: Trade[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
    asset: mockAssets[0], // BTC
    tradeType: 'Scalping',
    strategy: 'Aggressive',
    rating: 'Strong Buy',
    entryPrice: 67500,
    stopLoss: 66000,
    targetPrice: 70000,
    exitPrice: 69800,
    result: 'Win',
    pnl: 2300,
    pnlPercent: 3.41,
    status: 'Closed',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    asset: mockAssets[1], // ETH
    tradeType: 'Day trade',
    strategy: 'Moderate',
    rating: 'Buy',
    entryPrice: 3550,
    stopLoss: 3400,
    targetPrice: 3750,
    exitPrice: 3480,
    result: 'Loss',
    pnl: -700,
    pnlPercent: -1.97,
    status: 'Closed',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    asset: mockAssets[2], // SOL
    tradeType: 'Swing',
    strategy: 'Cautious',
    rating: 'Buy',
    entryPrice: 145.50,
    stopLoss: 138.00,
    targetPrice: 165.00,
    exitPrice: 164.20,
    result: 'Win',
    pnl: 1870,
    pnlPercent: 12.85,
    status: 'Closed',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
    asset: mockAssets[3], // AAPL
    tradeType: 'Day trade',
    strategy: 'Moderate',
    rating: 'Buy',
    entryPrice: 178.25,
    stopLoss: 175.80,
    targetPrice: 183.50,
    exitPrice: 183.20,
    result: 'Win',
    pnl: 495,
    pnlPercent: 2.78,
    status: 'Closed',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
    asset: mockAssets[0], // BTC
    tradeType: 'Scalping',
    strategy: 'Aggressive',
    rating: 'Strong Buy',
    entryPrice: 65200,
    stopLoss: 63800,
    targetPrice: 68000,
    exitPrice: 67950,
    result: 'Win',
    pnl: 2750,
    pnlPercent: 4.22,
    status: 'Closed',
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 86400000 * 6).toISOString(),
    asset: mockAssets[1], // ETH
    tradeType: 'Swing',
    strategy: 'Cautious',
    rating: 'Neutral',
    entryPrice: 3420,
    stopLoss: 3300,
    targetPrice: 3600,
    exitPrice: 3420,
    result: 'Break-even',
    pnl: 0,
    pnlPercent: 0,
    status: 'Closed',
  },
  {
    id: '7',
    timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
    asset: mockAssets[2], // SOL
    tradeType: 'Day trade',
    strategy: 'Aggressive',
    rating: 'Strong Buy',
    entryPrice: 152.00,
    stopLoss: 145.00,
    targetPrice: 170.00,
    exitPrice: 168.50,
    result: 'Win',
    pnl: 1650,
    pnlPercent: 10.86,
    status: 'Closed',
  },
  {
    id: '8',
    timestamp: new Date(Date.now() - 86400000 * 8).toISOString(),
    asset: mockAssets[3], // AAPL
    tradeType: 'Scalping',
    strategy: 'Moderate',
    rating: 'Buy',
    entryPrice: 182.00,
    stopLoss: 180.00,
    targetPrice: 186.00,
    exitPrice: 180.50,
    result: 'Loss',
    pnl: -150,
    pnlPercent: -0.82,
    status: 'Closed',
  },
  {
    id: '9',
    timestamp: new Date(Date.now() - 86400000 * 9).toISOString(),
    asset: mockAssets[0], // BTC
    tradeType: 'Swing',
    strategy: 'Cautious',
    rating: 'Buy',
    entryPrice: 62000,
    stopLoss: 59000,
    targetPrice: 68000,
    exitPrice: 67800,
    result: 'Win',
    pnl: 5800,
    pnlPercent: 9.35,
    status: 'Closed',
  },
  {
    id: '10',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    asset: mockAssets[0], // BTC
    tradeType: 'Scalping',
    strategy: 'Aggressive',
    rating: 'Strong Buy',
    entryPrice: 68200,
    stopLoss: 67000,
    targetPrice: 71000,
    result: 'Win',
    pnl: 0,
    pnlPercent: 0,
    status: 'Active',
  },
  {
    id: '11',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    asset: mockAssets[2], // SOL
    tradeType: 'Day trade',
    strategy: 'Moderate',
    rating: 'Buy',
    entryPrice: 158.00,
    stopLoss: 152.00,
    targetPrice: 172.00,
    result: 'Win',
    pnl: 0,
    pnlPercent: 0,
    status: 'Active',
  },
];

export const mockPerformanceMetrics: PerformanceMetrics = {
  totalPnL: 14015,
  totalPnLPercent: 28.5,
  pnlChange: 12.3,
  winRate: 66.7,
  totalTrades: 9,
  avgRiskReward: 2.4,
  riskAdjustedScore: 1.85,
  mostTradedAsset: 'BTC',
  profitByStrategy: {
    Aggressive: 6700,
    Moderate: 345,
    Cautious: 6970,
  },
};

export const mockEquityCurve: EquityPoint[] = [
  { date: '2024-01-01', equity: 10000 },
  { date: '2024-01-02', equity: 12300 },
  { date: '2024-01-03', equity: 11600 },
  { date: '2024-01-04', equity: 13470 },
  { date: '2024-01-05', equity: 13965 },
  { date: '2024-01-06', equity: 16715 },
  { date: '2024-01-07', equity: 16715 },
  { date: '2024-01-08', equity: 18365 },
  { date: '2024-01-09', equity: 18215 },
  { date: '2024-01-10', equity: 24015 },
];

export const mockWeeklyProfit: ProfitByPeriod[] = [
  { period: 'Week 1', profit: 3470 },
  { period: 'Week 2', profit: 5095 },
  { period: 'Week 3', profit: 2150 },
  { period: 'Week 4', profit: 3300 },
];

export const mockProfitByTradeType = [
  { name: 'Scalp', profit: 4900, count: 4 },
  { name: 'Day Trade', profit: 1295, count: 4 },
  { name: 'Swing', profit: 7820, count: 3 },
];

export const mockProfitByStrategy = [
  { name: 'Aggressive', profit: 6700, count: 4 },
  { name: 'Moderate', profit: 345, count: 3 },
  { name: 'Cautious', profit: 6970, count: 4 },
];

export const mockProfitByAsset = [
  { name: 'BTC', profit: 10850, count: 4 },
  { name: 'ETH', profit: -700, count: 2 },
  { name: 'SOL', profit: 3520, count: 3 },
  { name: 'AAPL', profit: 345, count: 2 },
];

export const mockAIInsights = {
  mostProfitableAsset: 'BTC',
  bestTradeType: 'Swing',
  bestStrategy: 'Cautious',
  commonMistakes: [
    'Taking profits too early on winning trades',
    'Not adjusting stop loss after significant gains',
    'Over-trading during low volatility periods',
  ],
  timeOfDayPerformance: 'Best performance during Asian market hours (00:00-08:00 UTC)',
  topTrades: [
    { asset: 'BTC', pnl: 5800, date: '9 days ago', strategy: 'Cautious' },
    { asset: 'BTC', pnl: 2750, date: '5 days ago', strategy: 'Aggressive' },
    { asset: 'BTC', pnl: 2300, date: '1 day ago', strategy: 'Aggressive' },
    { asset: 'SOL', pnl: 1870, date: '3 days ago', strategy: 'Cautious' },
    { asset: 'SOL', pnl: 1650, date: '7 days ago', strategy: 'Aggressive' },
  ],
  worstTrades: [
    { asset: 'ETH', pnl: -700, date: '2 days ago', strategy: 'Moderate' },
    { asset: 'AAPL', pnl: -150, date: '8 days ago', strategy: 'Moderate' },
  ],
};
