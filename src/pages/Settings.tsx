import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mockSettings } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Save, ChevronDown, Scale } from "lucide-react";

const Settings = () => {
  const [councilSettingsOpen, setCouncilSettingsOpen] = useState(false);
  const [minAgreement, setMinAgreement] = useState(70);
  const [showDisagreements, setShowDisagreements] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strategy Settings</h1>
          <p className="text-muted-foreground">Configure scoring thresholds and signal generation parameters</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Weights & Thresholds</CardTitle>
            <CardDescription>Adjust how fundamental and technical scores are combined</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Fundamental Threshold</label>
                <span className="text-sm font-bold">{mockSettings.fundamental_threshold}/100</span>
              </div>
              <Slider 
                value={[mockSettings.fundamental_threshold]} 
                max={100}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Minimum fundamental score required to trigger technical analysis
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Fundamental Weight</label>
                  <span className="text-sm font-bold">{(mockSettings.weight_fundamental * 100).toFixed(0)}%</span>
                </div>
                <Slider 
                  value={[mockSettings.weight_fundamental * 100]} 
                  max={100}
                  className="cursor-pointer"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Technical Weight</label>
                  <span className="text-sm font-bold">{(mockSettings.weight_technical * 100).toFixed(0)}%</span>
                </div>
                <Slider 
                  value={[mockSettings.weight_technical * 100]} 
                  max={100}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score to Rating Mapping</CardTitle>
            <CardDescription>Define score ranges for each signal rating</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex">
                <div 
                  className="bg-bearish flex items-center justify-center text-xs font-medium text-bearish-foreground"
                  style={{ width: '25%' }}
                >
                  Strong Sell (0-24)
                </div>
                <div 
                  className="bg-bearish/70 flex items-center justify-center text-xs font-medium text-bearish-foreground"
                  style={{ width: '15%' }}
                >
                  Sell (25-39)
                </div>
                <div 
                  className="bg-neutral flex items-center justify-center text-xs font-medium text-neutral-foreground"
                  style={{ width: '25%' }}
                >
                  Neutral (40-64)
                </div>
                <div 
                  className="bg-bullish/70 flex items-center justify-center text-xs font-medium text-bullish-foreground"
                  style={{ width: '15%' }}
                >
                  Buy (65-79)
                </div>
                <div 
                  className="bg-bullish flex items-center justify-center text-xs font-medium text-bullish-foreground"
                  style={{ width: '20%' }}
                >
                  Strong Buy (80-100)
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Drag the boundaries to adjust score ranges for each rating level
            </p>
          </CardContent>
        </Card>

        {/* AI Council Preferences (Collapsible) */}
        <Collapsible open={councilSettingsOpen} onOpenChange={setCouncilSettingsOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    <CardTitle>AI Council Preferences (Advanced)</CardTitle>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${councilSettingsOpen ? 'rotate-180' : ''}`} />
                </div>
                <CardDescription>Configure multi-model AI Council behavior</CardDescription>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Minimum Agreement % to Generate Signal</label>
                    <span className="text-sm font-bold">{minAgreement}%</span>
                  </div>
                  <Slider 
                    value={[minAgreement]} 
                    onValueChange={(v) => setMinAgreement(v[0])}
                    min={50}
                    max={95}
                    step={5}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Signals will only be generated when model agreement exceeds this threshold
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-disagreements" className="text-sm font-medium">
                      Show Model Disagreements
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Display when models have conflicting opinions
                    </p>
                  </div>
                  <Switch 
                    id="show-disagreements"
                    checked={showDisagreements}
                    onCheckedChange={setShowDisagreements}
                  />
                </div>

                <div className="pt-2 border-t border-border">
                  <Button variant="outline" className="w-full">
                    Re-run Analysis on New Data
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
};

export default Settings;
