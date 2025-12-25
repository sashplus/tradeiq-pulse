import { AIModel, NewsCouncilAnalysis, SignalCouncilSummary, CouncilData } from '@/types/council';

// Generate council data for assets
export function generateCouncilData(seed: number = 0): CouncilData {
  const verdicts = ['Bullish', 'Neutral', 'Bearish'] as const;
  const verdictIndex = (seed % 3);
  return {
    verdict: verdicts[verdictIndex],
    agreement: 65 + (seed % 30),
    modelCount: 5,
    confidence: 70 + (seed % 25),
  };
}

// Mock AI Models for analysis
export const mockModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4 Turbo',
    stance: 'Bullish',
    confidence: 85,
    reasons: ['Strong institutional inflows detected', 'Positive macro environment'],
  },
  {
    id: 'claude-3',
    name: 'Claude 3 Opus',
    stance: 'Bullish',
    confidence: 78,
    reasons: ['Technical breakout confirmed', 'On-chain metrics improving'],
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    stance: 'Neutral',
    confidence: 62,
    reasons: ['Mixed signals from derivatives', 'Awaiting Fed decision'],
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    stance: 'Bullish',
    confidence: 72,
    reasons: ['ETF volume surge', 'Decreasing exchange reserves'],
  },
  {
    id: 'llama-3',
    name: 'Llama 3 70B',
    stance: 'Bullish',
    confidence: 81,
    reasons: ['Whale accumulation pattern', 'Favorable funding rates'],
  },
];

// Generate news council analysis
export function generateNewsCouncilAnalysis(newsId: string): NewsCouncilAnalysis {
  const hash = newsId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const verdicts = ['Bullish', 'Neutral', 'Bearish'] as const;
  const verdict = verdicts[hash % 3];
  
  const bullishCount = mockModels.filter(m => m.stance === 'Bullish').length;
  const agreement = Math.round((bullishCount / mockModels.length) * 100);
  
  return {
    verdict,
    agreement,
    modelCount: mockModels.length,
    confidence: 75 + (hash % 20),
    chairmanSummary: [
      'Institutional capital flow indicates sustained buying pressure with net positive inflows exceeding $1.2B this week.',
      'Technical structure supports continuation of current trend with key support levels holding.',
      'On-chain metrics show decreased selling pressure from long-term holders.',
      'Macro environment remains supportive with Fed signaling potential rate cuts.',
      'Risk-reward profile favors upside with defined stop-loss levels.',
    ],
    models: mockModels.map(m => ({
      ...m,
      stance: hash % 2 === 0 ? m.stance : (m.stance === 'Bullish' ? 'Neutral' : m.stance),
      confidence: m.confidence + ((hash % 10) - 5),
    })),
    evidence: {
      sources: ['Bloomberg Terminal', 'Reuters Eikon', 'Glassnode', 'CryptoQuant'],
      keyFacts: [
        'ETF inflows: $1.2B weekly net positive',
        'Exchange reserves: -2.3% week-over-week',
        'Active addresses: +15% vs 30-day average',
        'Options skew: 0.92 (bullish bias)',
      ],
      macroReferences: [
        'Fed funds futures pricing 3 cuts by year-end',
        'DXY weakness supporting risk assets',
      ],
      onchainReferences: [
        'Whale wallets accumulated 12,400 BTC this week',
        'MVRV ratio at 1.8 (not overheated)',
      ],
    },
  };
}

// Generate signal council summary
export function generateSignalCouncilSummary(signalId: string): SignalCouncilSummary {
  const hash = signalId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const verdicts = ['Bullish', 'Neutral', 'Bearish'] as const;
  
  return {
    verdict: verdicts[hash % 3],
    agreement: 70 + (hash % 25),
    modelCount: 5,
    confidence: 72 + (hash % 23),
    topRisks: [
      'Unexpected macro event could trigger volatility',
      'Low weekend liquidity may cause slippage',
      'Key resistance level at target zone',
    ],
    reasoning: 'Signal generated based on confluence of fundamental catalyst (ETF inflows), technical breakout above key resistance, and supportive on-chain metrics showing accumulation.',
  };
}

// Pre-generate council data for mock signals and news
export const signalCouncilData: Record<string, SignalCouncilSummary> = {
  '1': generateSignalCouncilSummary('1'),
  '2': generateSignalCouncilSummary('2'),
  '3': generateSignalCouncilSummary('3'),
  '4': generateSignalCouncilSummary('4'),
  '5': generateSignalCouncilSummary('5'),
};

export const newsCouncilData: Record<string, NewsCouncilAnalysis> = {
  '1': generateNewsCouncilAnalysis('1'),
  '2': generateNewsCouncilAnalysis('2'),
  '3': generateNewsCouncilAnalysis('3'),
  '4': generateNewsCouncilAnalysis('4'),
  '5': generateNewsCouncilAnalysis('5'),
};

// Data source council usage
export const dataSourceCouncilUsage: Record<string, { usedByModels: string[]; importance: 'High' | 'Medium' | 'Low' }> = {
  '1': { usedByModels: ['GPT-4 Turbo', 'Claude 3 Opus', 'Gemini Pro'], importance: 'High' },
  '2': { usedByModels: ['GPT-4 Turbo', 'Mistral Large', 'Llama 3 70B'], importance: 'High' },
  '3': { usedByModels: ['Claude 3 Opus', 'Gemini Pro'], importance: 'Medium' },
  '4': { usedByModels: ['Mistral Large'], importance: 'Low' },
  '5': { usedByModels: ['GPT-4 Turbo', 'Claude 3 Opus', 'Gemini Pro', 'Llama 3 70B'], importance: 'High' },
};
