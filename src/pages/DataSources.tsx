import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { mockDataSources } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { Activity, AlertCircle, CheckCircle2 } from "lucide-react";

const DataSources = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
        <p className="text-muted-foreground">Manage and configure news providers and their weights</p>
      </div>

      <div className="grid gap-4">
        {mockDataSources.map((source) => (
          <Card key={source.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle>{source.name}</CardTitle>
                  <Badge variant="outline">{source.type}</Badge>
                  <Badge 
                    variant="outline"
                    className={
                      source.status === 'Online' ? 'border-bullish/30 text-bullish' :
                      source.status === 'Degraded' ? 'border-neutral/30 text-neutral' :
                      'border-bearish/30 text-bearish'
                    }
                  >
                    {source.status === 'Online' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {source.status === 'Degraded' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {source.status === 'Offline' && <Activity className="h-3 w-3 mr-1" />}
                    {source.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Enabled</span>
                  <Switch checked={source.is_enabled} />
                </div>
              </div>
              <CardDescription>
                Last updated {formatDistanceToNow(new Date(source.last_fetch_at), { addSuffix: true })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Reliability Score</label>
                    <span className="text-sm font-bold">{source.reliability_score}/100</span>
                  </div>
                  <Slider 
                    value={[source.reliability_score]} 
                    max={100}
                    className="cursor-pointer"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Weight in Fundamental</label>
                    <span className="text-sm font-bold">{(source.weight_in_fundamental * 100).toFixed(0)}%</span>
                  </div>
                  <Slider 
                    value={[source.weight_in_fundamental * 100]} 
                    max={100}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Configured Keywords</label>
                <div className="flex flex-wrap gap-2">
                  {source.configured_keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DataSources;
