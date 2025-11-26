import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentBadge } from "@/components/signals/SentimentBadge";
import { ScoreBar } from "@/components/signals/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { mockNews } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const News = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Feed</h1>
          <p className="text-muted-foreground">Real-time market news with fundamental analysis</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search news..." className="pl-9 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {mockNews.map((news) => (
          <Card key={news.id} className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight mb-2">{news.headline}</CardTitle>
                  <CardDescription className="line-clamp-2">{news.content}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2">{news.source}</Badge>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(news.timestamp), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SentimentBadge sentiment={news.sentiment_label} />
                  <div className="flex gap-2">
                    {news.assets.map((asset) => (
                      <Badge key={asset.id} variant="outline">
                        {asset.symbol}
                      </Badge>
                    ))}
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      news.status === 'used_in_signal' ? 'border-primary/30 text-primary' :
                      news.status === 'processed' ? 'border-bullish/30 text-bullish' :
                      'border-muted-foreground/30 text-muted-foreground'
                    }
                  >
                    {news.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Sentiment:</span>
                    <span className="font-medium ml-2">{Math.round(news.sentiment_score * 100)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Relevance:</span>
                    <span className="font-medium ml-2">{news.relevance_score}</span>
                  </div>
                  <div className="w-32">
                    <div className="text-xs text-muted-foreground mb-1">Fundamental Score</div>
                    <ScoreBar score={news.fundamental_score} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
