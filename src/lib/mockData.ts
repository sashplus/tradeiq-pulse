import { Asset, NewsItem, Signal, DataSource, Settings } from '@/types';

export const mockAssets: Asset[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', type: 'crypto', watchlisted: true },
  { id: '2', symbol: 'ETH', name: 'Ethereum', type: 'crypto', watchlisted: true },
  { id: '3', symbol: 'SOL', name: 'Solana', type: 'crypto', watchlisted: true },
  { id: '4', symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', watchlisted: true },
  { id: '5', symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock', watchlisted: false },
  { id: '6', symbol: 'NVDA', name: 'NVIDIA Corp.', type: 'stock', watchlisted: false },
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    source: 'Bloomberg',
    headline: 'Bitcoin ETF sees record inflows amid institutional adoption surge',
    content: 'Major cryptocurrency exchange-traded funds recorded unprecedented inflows this week as institutional investors continue to embrace digital assets...',
    full_text: `Major cryptocurrency exchange-traded funds recorded unprecedented inflows this week as institutional investors continue to embrace digital assets. The surge in ETF investments marks a significant milestone in the mainstream adoption of Bitcoin and other cryptocurrencies.

According to data from multiple fund managers, the combined net inflows exceeded $1.2 billion over the past five trading days, with BlackRock's iShares Bitcoin Trust (IBIT) leading the charge. This represents the highest weekly inflow since the ETFs launched in January.

"We're witnessing a paradigm shift in how institutional investors view digital assets," said Sarah Chen, Chief Investment Officer at Digital Asset Capital. "The regulatory clarity provided by spot ETF approvals has removed a significant barrier to entry for pension funds, endowments, and family offices."

The inflows come amid growing concerns about inflation and currency debasement, with many investors viewing Bitcoin as a hedge against monetary policy risks. Technical analysts note that the sustained buying pressure could push Bitcoin prices toward new all-time highs in the coming months.

Market observers also point to the upcoming Bitcoin halving event as a potential catalyst for further price appreciation. Historically, halving events have preceded significant bull market cycles.`,
    original_url: 'https://www.bloomberg.com/news/articles/bitcoin-etf-record-inflows',
    assets: [mockAssets[0]],
    sentiment_label: 'Bullish',
    sentiment_score: 0.85,
    relevance_score: 92,
    fundamental_score: 88,
    status: 'used_in_signal',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    source: 'Reuters',
    headline: 'Federal Reserve hints at potential rate cuts in Q2',
    content: 'The Federal Reserve Chairman suggested in today\'s testimony that monetary policy adjustments may be warranted...',
    full_text: `The Federal Reserve Chairman suggested in today's testimony that monetary policy adjustments may be warranted given recent economic data showing cooling inflation pressures.

In his semiannual testimony before the Senate Banking Committee, Chair Jerome Powell indicated that the central bank is gaining confidence that inflation is moving sustainably toward the 2% target. He noted that maintaining the current restrictive policy stance for too long could unnecessarily harm economic growth and employment.

"The risks to achieving our employment and inflation goals are coming into better balance," Powell said. "We are prepared to adjust our policy stance as appropriate if risks emerge that could impede achieving our goals."

Market participants interpreted the comments as a signal that rate cuts could begin as early as June, with fed funds futures now pricing in three 25-basis-point reductions by year-end. Treasury yields fell across the curve following the testimony.

The potential pivot in monetary policy has significant implications for risk assets, including cryptocurrencies. Lower interest rates typically reduce the opportunity cost of holding non-yielding assets like Bitcoin, potentially supporting higher valuations.

Analysts at Goldman Sachs noted that a more accommodative Fed could accelerate capital flows into digital assets as investors seek higher returns in a lower-yield environment.`,
    original_url: 'https://www.reuters.com/markets/fed-rate-cuts-testimony',
    assets: [mockAssets[0], mockAssets[1]],
    sentiment_label: 'Bullish',
    sentiment_score: 0.72,
    relevance_score: 85,
    fundamental_score: 79,
    status: 'processed',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    source: 'Coindesk',
    headline: 'Ethereum network upgrade faces unexpected delays',
    content: 'Core developers announced a postponement of the next major network upgrade due to critical testing issues...',
    full_text: `Core developers announced a postponement of the next major network upgrade due to critical testing issues discovered during the final rounds of testing on the Sepolia testnet.

The Dencun upgrade, which includes the highly anticipated proto-danksharding feature (EIP-4844), was originally scheduled for activation in late March. However, unexpected bugs in the blob transaction handling mechanism have forced the team to push back the timeline by several weeks.

"We identified edge cases in blob propagation that could lead to consensus failures under certain network conditions," explained Tim Beiko, coordinator of Ethereum's core developer calls. "While these issues are fixable, we need additional time to implement and thoroughly test the solutions."

The delay has disappointed Layer 2 scaling solutions that were counting on proto-danksharding to significantly reduce their data availability costs. Arbitrum, Optimism, and other rollups had been preparing for dramatically lower transaction fees following the upgrade.

ETH prices reacted negatively to the news, dropping approximately 4% in the hours following the announcement. However, some analysts view the cautious approach as ultimately positive for the network's long-term health.

"It's better to delay and get it right than to rush and risk a consensus failure on mainnet," said Christine Kim, researcher at Galaxy Digital. "The market reaction is likely overdone given the temporary nature of the delay."`,
    original_url: 'https://www.coindesk.com/ethereum-dencun-delay',
    assets: [mockAssets[1]],
    sentiment_label: 'Bearish',
    sentiment_score: -0.65,
    relevance_score: 78,
    fundamental_score: 42,
    status: 'processed',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    source: 'The Block',
    headline: 'Solana DeFi TVL reaches all-time high',
    content: 'Total value locked in Solana decentralized finance protocols surged past previous records...',
    full_text: `Total value locked in Solana decentralized finance protocols surged past previous records, reaching $4.8 billion according to DefiLlama data. This marks a remarkable recovery for the ecosystem that saw significant outflows following the FTX collapse.

The growth has been driven primarily by liquid staking protocols, with Marinade Finance and Jito leading the charge. Combined, these two protocols account for over 40% of Solana's total TVL. The popularity of liquid staking has been fueled by attractive yields and the utility of liquid staking tokens across the DeFi ecosystem.

Jupiter, Solana's leading decentralized exchange aggregator, has also seen explosive growth in trading volumes. The protocol recently surpassed $500 million in daily volume, rivaling established players on Ethereum and other chains.

"Solana's performance characteristics make it uniquely suited for high-frequency DeFi applications," said Meow, co-founder of Jupiter. "Users can execute complex trading strategies without worrying about gas costs eating into their profits."

The memecoin frenzy has also contributed to Solana's resurgence, with tokens like BONK and WIF driving significant speculative activity. While some observers view memecoin trading as unsustainable, it has undeniably brought new users and capital to the ecosystem.

Looking ahead, the launch of Firedancer, a new validator client developed by Jump Crypto, could further boost Solana's throughput and reliability, potentially attracting even more DeFi activity.`,
    original_url: 'https://www.theblock.co/solana-defi-tvl-record',
    assets: [mockAssets[2]],
    sentiment_label: 'Bullish',
    sentiment_score: 0.78,
    relevance_score: 88,
    fundamental_score: 83,
    status: 'used_in_signal',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    source: 'CNBC',
    headline: 'Apple reports strong iPhone sales in emerging markets',
    content: 'Tech giant Apple exceeded analyst expectations with robust revenue growth...',
    full_text: `Tech giant Apple exceeded analyst expectations with robust revenue growth driven by strong iPhone sales in emerging markets, particularly India and Southeast Asia.

The company reported quarterly revenue of $119.6 billion, up 2% year-over-year, with iPhone revenue reaching $69.7 billion. While the overall growth rate was modest, the geographic diversification of sales represents a strategic shift that investors view favorably.

"India has become a particularly bright spot for us," said CEO Tim Cook during the earnings call. "We're seeing tremendous growth in the premium smartphone segment, and our retail expansion there is progressing well."

Apple opened its first two flagship retail stores in India last year and has been expanding its manufacturing presence in the country. This local production helps avoid import duties and positions the company to compete more effectively against rivals like Samsung and domestic brands.

The services segment continued its strong performance, generating $23.1 billion in revenue, up 11% year-over-year. Apple's installed base of active devices surpassed 2.2 billion, providing a massive addressable market for services like Apple Music, iCloud, and Apple Pay.

Analysts remain constructive on Apple's long-term prospects, citing the company's loyal customer base, strong balance sheet, and opportunities in augmented reality. The stock rose 3% in after-hours trading following the earnings release.`,
    original_url: 'https://www.cnbc.com/apple-earnings-iphone-sales',
    assets: [mockAssets[3]],
    sentiment_label: 'Bullish',
    sentiment_score: 0.68,
    relevance_score: 75,
    fundamental_score: 71,
    status: 'used_in_signal',
  },
];

export const mockSignals: Signal[] = [
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
    stop_loss: 65000,
    risk_level: 'Medium',
    status: 'Active',
    holding_period: 'Scalping',
    strategy: 'Aggressive',
    source_news: [mockNews[0]],
    notes: 'Strong bullish momentum with ETF inflows',
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
    stop_loss: 138.00,
    risk_level: 'Medium',
    status: 'Active',
    holding_period: 'Day trade',
    strategy: 'Moderate',
    source_news: [mockNews[3]],
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
    status: 'Hit Target',
    holding_period: 'Swing',
    strategy: 'Cautious',
    source_news: [mockNews[4]],
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
    status: 'Active',
    holding_period: 'Day trade',
    strategy: 'Cautious',
    source_news: [mockNews[2]],
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
    stop_loss: 63000,
    risk_level: 'Low',
    status: 'Hit Target',
    holding_period: 'Swing',
    strategy: 'Aggressive',
    source_news: [mockNews[0], mockNews[1]],
  },
];

export const mockDataSources: DataSource[] = [
  {
    id: '1',
    name: 'Bloomberg',
    type: 'news',
    status: 'Online',
    reliability_score: 95,
    weight_in_fundamental: 0.25,
    last_fetch_at: new Date(Date.now() - 300000).toISOString(),
    configured_keywords: ['bitcoin', 'ethereum', 'crypto', 'fed', 'rates'],
    is_enabled: true,
  },
  {
    id: '2',
    name: 'Reuters',
    type: 'news',
    status: 'Online',
    reliability_score: 93,
    weight_in_fundamental: 0.22,
    last_fetch_at: new Date(Date.now() - 420000).toISOString(),
    configured_keywords: ['market', 'trading', 'finance', 'economy'],
    is_enabled: true,
  },
  {
    id: '3',
    name: 'Coindesk',
    type: 'news',
    status: 'Online',
    reliability_score: 88,
    weight_in_fundamental: 0.18,
    last_fetch_at: new Date(Date.now() - 180000).toISOString(),
    configured_keywords: ['crypto', 'blockchain', 'defi', 'nft'],
    is_enabled: true,
  },
  {
    id: '4',
    name: 'The Block',
    type: 'news',
    status: 'Degraded',
    reliability_score: 85,
    weight_in_fundamental: 0.15,
    last_fetch_at: new Date(Date.now() - 7200000).toISOString(),
    configured_keywords: ['crypto', 'web3', 'blockchain'],
    is_enabled: true,
  },
  {
    id: '5',
    name: 'CNBC',
    type: 'news',
    status: 'Online',
    reliability_score: 90,
    weight_in_fundamental: 0.20,
    last_fetch_at: new Date(Date.now() - 600000).toISOString(),
    configured_keywords: ['stocks', 'market', 'earnings', 'tech'],
    is_enabled: true,
  },
];

export const mockSettings: Settings = {
  fundamental_threshold: 65,
  weight_fundamental: 0.6,
  weight_technical: 0.4,
  total_score_to_rating_mapping: {
    strong_buy: [80, 100],
    buy: [65, 79],
    neutral: [40, 64],
    sell: [25, 39],
    strong_sell: [0, 24],
  },
  default_timeframe: '4h',
  default_assets: ['BTC', 'ETH', 'AAPL'],
  notification_channels: {
    email: true,
    telegram: false,
    slack: false,
    webhook: false,
  },
  user_timezone: 'UTC',
};
