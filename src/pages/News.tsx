import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentBadge } from "@/components/signals/SentimentBadge";
import { ScoreBar } from "@/components/signals/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { mockNews } from "@/lib/mockData";
import { newsCouncilData, generateCouncilData } from "@/lib/mockCouncilData";
import { Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { NewsDetailDrawer } from "@/components/news/NewsDetailDrawer";
import { FeedModeToggle } from "@/components/news/FeedModeToggle";
import { NewsTimeDisplay } from "@/components/news/NewsTimeDisplay";
import { useFeedMode } from "@/hooks/useFeedMode";
import { CouncilIndicator } from "@/components/council/CouncilIndicator";
import { NewsItem } from "@/types";

const ALL_SOURCES = [
  "Bloomberg",
  "Reuters",
  "CNBC",
  "Barrons",
  "The Block",
  "Coindesk",
  "Cointelegraph",
  "Investing",
];

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>(ALL_SOURCES);
  const [usedInSignalOnly, setUsedInSignalOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, setMode } = useFeedMode();

  const handleSourceToggle = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const handleSelectAllSources = () => {
    setSelectedSources(ALL_SOURCES);
  };

  const handleClearAllSources = () => {
    setSelectedSources([]);
  };

  const resetFilters = () => {
    setSelectedSources(ALL_SOURCES);
    setUsedInSignalOnly(false);
  };

  const filteredNews = useMemo(() => {
    const filtered = mockNews.filter((news) => {
      // Text search filter
      const matchesSearch =
        searchQuery === "" ||
        news.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchQuery.toLowerCase());

      // Source filter
      const matchesSource = selectedSources.includes(news.source);

      // Used in signal filter (status === 'used_in_signal')
      const matchesUsedInSignal = !usedInSignalOnly || news.status === "used_in_signal";

      return matchesSearch && matchesSource && matchesUsedInSignal;
    });

    // Sort based on feed mode
    return filtered.sort((a, b) => {
      const dateA = mode === "realtime" ? new Date(a.scraped_at) : new Date(a.published_at);
      const dateB = mode === "realtime" ? new Date(b.scraped_at) : new Date(b.published_at);
      return dateB.getTime() - dateA.getTime();
    });
  }, [searchQuery, selectedSources, usedInSignalOnly, mode]);

  // Handle URL-based article opening
  useEffect(() => {
    const selectedId = searchParams.get("selectedId");
    if (selectedId) {
      const newsItem = mockNews.find((n) => n.id === selectedId);
      if (newsItem) {
        setSelectedNews(newsItem);
        setDrawerOpen(true);
      }
    }
  }, [searchParams]);

  const activeFilterCount =
    (selectedSources.length < ALL_SOURCES.length ? 1 : 0) +
    (usedInSignalOnly ? 1 : 0);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setDrawerOpen(true);
    setSearchParams({ selectedId: news.id });
  };

  const handleDrawerClose = (open: boolean) => {
    setDrawerOpen(open);
    if (!open) {
      setSearchParams({});
    }
  };

  // Navigation within drawer
  const currentIndex = selectedNews
    ? filteredNews.findIndex((n) => n.id === selectedNews.id)
    : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevNews = filteredNews[currentIndex - 1];
      setSelectedNews(prevNews);
      setSearchParams({ selectedId: prevNews.id });
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredNews.length - 1) {
      const nextNews = filteredNews[currentIndex + 1];
      setSelectedNews(nextNews);
      setSearchParams({ selectedId: nextNews.id });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Feed</h1>
          <p className="text-muted-foreground">Real-time market news with fundamental analysis</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <FeedModeToggle mode={mode} onModeChange={setMode} />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search news..."
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-popover border border-border" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Reset all
                  </Button>
                </div>

                <Separator />

                {/* Sources Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Sources</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSelectAllSources}
                        className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                      >
                        All
                      </Button>
                      <span className="text-muted-foreground">/</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearAllSources}
                        className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                      >
                        None
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {ALL_SOURCES.map((source) => (
                      <div key={source} className="flex items-center space-x-2">
                        <Checkbox
                          id={`source-${source}`}
                          checked={selectedSources.includes(source)}
                          onCheckedChange={() => handleSourceToggle(source)}
                        />
                        <Label
                          htmlFor={`source-${source}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {source}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Used in Signal Toggle */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="used-in-signal" className="text-sm font-medium cursor-pointer">
                    Show only news used in signals
                  </Label>
                  <Switch
                    id="used-in-signal"
                    checked={usedInSignalOnly}
                    onCheckedChange={setUsedInSignalOnly}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedSources.length < ALL_SOURCES.length || usedInSignalOnly) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedSources.length < ALL_SOURCES.length && (
            <Badge variant="secondary" className="gap-1">
              {selectedSources.length} source{selectedSources.length !== 1 ? "s" : ""} selected
              <button
                onClick={handleSelectAllSources}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {usedInSignalOnly && (
            <Badge variant="secondary" className="gap-1">
              Used in signals only
              <button
                onClick={() => setUsedInSignalOnly(false)}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      <div className="grid gap-4">
        {filteredNews.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No news items match your filters.</p>
              <Button variant="link" onClick={resetFilters} className="mt-2">
                Reset filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredNews.map((news) => {
            const councilData = newsCouncilData[news.id] || generateCouncilData(parseInt(news.id));
            return (
              <Card
                key={news.id}
                className="hover:bg-accent/50 transition-all cursor-pointer hover:shadow-md"
                onClick={() => handleNewsClick(news)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-2">{news.headline}</CardTitle>
                      <CardDescription className="line-clamp-3">{news.content}</CardDescription>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge variant="secondary" className="mb-2">{news.source}</Badge>
                      <NewsTimeDisplay
                        publishedAt={news.published_at}
                        scrapedAt={news.scraped_at}
                        mode={mode}
                        className="text-right"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* News Council Verdict Block */}
                  <div className="mb-4 flex items-center justify-between gap-3 py-2 px-3 bg-muted/50 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <CouncilIndicator
                        verdict={councilData.verdict}
                        agreement={councilData.agreement}
                        modelCount={councilData.modelCount}
                      />
                      <span className="text-xs text-muted-foreground">
                        {councilData.modelCount} models • Fundamental impact: {news.fundamental_score}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNewsClick(news);
                      }}
                      className="h-7 text-xs"
                    >
                      View Council Analysis
                    </Button>
                  </div>

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
            );
          })
        )}
      </div>

      {/* News Detail Drawer */}
      <NewsDetailDrawer
        news={selectedNews}
        open={drawerOpen}
        onOpenChange={handleDrawerClose}
        showNavigation={true}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < filteredNews.length - 1}
        variant="newsfeed"
        feedMode={mode}
      />
    </div>
  );
};

export default News;
