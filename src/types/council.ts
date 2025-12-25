// AI Council Types

export type CouncilVerdict = 'Bullish' | 'Neutral' | 'Bearish';
export type ModelStance = 'Bullish' | 'Neutral' | 'Bearish';

export interface AIModel {
  id: string;
  name: string;
  stance: ModelStance;
  confidence: number; // 0-100
  reasons: string[];
}

export interface CouncilData {
  verdict: CouncilVerdict;
  agreement: number; // 0-100
  modelCount: number;
  confidence: number; // 0-100
}

export interface NewsCouncilAnalysis extends CouncilData {
  chairmanSummary: string[];
  models: AIModel[];
  evidence: {
    sources: string[];
    keyFacts: string[];
    macroReferences?: string[];
    onchainReferences?: string[];
  };
}

export interface SignalCouncilSummary extends CouncilData {
  topRisks: string[];
  reasoning: string;
}
