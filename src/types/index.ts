export type AssetType = 'crypto' | 'stock' | 'forex' | 'index' | 'other';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  watchlisted: boolean;
}

export type SentimentLabel = 'Bullish' | 'Bearish' | 'Neutral';
export type NewsStatus = 'raw' | 'processed' | 'used_in_signal';

export interface NewsItem {
  id: string;
  timestamp: string;
  source: string;
  headline: string;
  content: string;
  assets: Asset[];
  sentiment_label: SentimentLabel;
  sentiment_score: number;
  relevance_score: number;
  fundamental_score: number;
  status: NewsStatus;
}

export interface TechnicalAnalysis {
  id: string;
  asset: Asset;
  timeframe: string;
  indicators_summary: string;
  technical_score: number;
  chart_snapshot_url: string;
  generated_at: string;
}

export type SignalRating = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
export type SignalStatus = 'Active' | 'Hit Target' | 'Stopped Out' | 'Expired';
export type HoldingPeriod = 'Scalping' | 'Day trade' | 'Swing' | 'Position';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type StrategyType = 'Cautious' | 'Moderate' | 'Aggressive';

export interface Signal {
  id: string;
  created_at: string;
  asset: Asset;
  timeframe: string;
  total_score: number;
  fundamental_score: number;
  technical_score: number;
  onchain_score: number;
  rating: SignalRating;
  entry_price: number;
  target_price: number;
  stop_loss: number;
  risk_level: RiskLevel;
  status: SignalStatus;
  holding_period: HoldingPeriod;
  strategy: StrategyType;
  source_news: NewsItem[];
  notes?: string;
}

export type DataSourceType = 'news' | 'on-chain' | 'funding' | 'social';
export type DataSourceStatus = 'Online' | 'Degraded' | 'Offline';

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  status: DataSourceStatus;
  reliability_score: number;
  weight_in_fundamental: number;
  last_fetch_at: string;
  configured_keywords: string[];
  is_enabled: boolean;
}

export interface Settings {
  fundamental_threshold: number;
  weight_fundamental: number;
  weight_technical: number;
  total_score_to_rating_mapping: {
    strong_buy: [number, number];
    buy: [number, number];
    neutral: [number, number];
    sell: [number, number];
    strong_sell: [number, number];
  };
  default_timeframe: string;
  default_assets: string[];
  notification_channels: {
    email: boolean;
    telegram: boolean;
    slack: boolean;
    webhook: boolean;
  };
  user_timezone: string;
}
