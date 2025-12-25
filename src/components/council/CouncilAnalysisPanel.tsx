import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CouncilVerdictBadge } from "./CouncilVerdictBadge";
import { CouncilAgreementBar } from "./CouncilAgreementBar";
import { CheckCircle2, FileText, Users, Scale } from "lucide-react";
import type { NewsCouncilAnalysis } from "@/types/council";
import { cn } from "@/lib/utils";

interface CouncilAnalysisPanelProps {
  analysis: NewsCouncilAnalysis;
}

export function CouncilAnalysisPanel({ analysis }: CouncilAnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState("summary");

  const stanceColors = {
    Bullish: "text-bullish",
    Neutral: "text-neutral",
    Bearish: "text-bearish",
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" />
            AI Council Verdict
          </CardTitle>
          <CouncilVerdictBadge verdict={analysis.verdict} />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <CouncilAgreementBar
            agreement={analysis.agreement}
            verdict={analysis.verdict}
            className="flex-1"
          />
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            Confidence: <span className="font-medium text-foreground">{analysis.confidence}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-8">
            <TabsTrigger value="summary" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Chairman Summary
            </TabsTrigger>
            <TabsTrigger value="models" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Model Opinions
            </TabsTrigger>
            <TabsTrigger value="evidence" className="text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Evidence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-3">
            <ul className="space-y-2">
              {analysis.chairmanSummary.map((point, idx) => (
                <li key={idx} className="flex gap-2 text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="models" className="mt-3">
            <div className="grid gap-2">
              {analysis.models.map((model) => (
                <div
                  key={model.id}
                  className="flex items-start gap-3 p-2 rounded-md bg-muted/50 border border-border/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{model.name}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          stanceColors[model.stance]
                        )}
                      >
                        {model.stance}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Confidence: {model.confidence}%
                    </div>
                    <ul className="mt-1.5 space-y-0.5">
                      {model.reasons.map((reason, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex gap-1">
                          <span>–</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evidence" className="mt-3 space-y-4">
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Sources Used</h4>
              <div className="flex flex-wrap gap-1">
                {analysis.evidence.sources.map((source, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Key Facts</h4>
              <ul className="space-y-1">
                {analysis.evidence.keyFacts.map((fact, idx) => (
                  <li key={idx} className="text-sm flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {analysis.evidence.macroReferences && analysis.evidence.macroReferences.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Macro References</h4>
                <ul className="space-y-1">
                  {analysis.evidence.macroReferences.map((ref, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span>–</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.evidence.onchainReferences && analysis.evidence.onchainReferences.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">On-Chain Data</h4>
                <ul className="space-y-1">
                  {analysis.evidence.onchainReferences.map((ref, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span>–</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
