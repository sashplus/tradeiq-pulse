import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order, OrderStatus, OrderSide } from "@/lib/mockTradeData";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { CouncilIndicator } from "@/components/council/CouncilIndicator";
import { SignalCouncilModal } from "@/components/council/SignalCouncilModal";
import { generateSignalCouncilSummary } from "@/lib/mockCouncilData";

interface OrdersTableProps {
  orders: Order[];
}

type SortKey = 'timestamp' | 'asset' | 'quantity' | 'price';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 20;

function StatusBadge({ status }: { status: OrderStatus }) {
  const variants: Record<OrderStatus, string> = {
    'Filled': 'bg-bullish/20 text-bullish border-bullish/30',
    'Partial': 'bg-warning/20 text-warning border-warning/30',
    'Pending': 'bg-muted text-muted-foreground border-border',
    'Canceled': 'bg-bearish/20 text-bearish border-bearish/30',
  };

  return (
    <Badge variant="outline" className={cn(variants[status], "font-medium")}>
      {status}
    </Badge>
  );
}

function SideBadge({ side }: { side: OrderSide }) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium",
        side === 'Buy' ? 'bg-bullish/20 text-bullish border-bullish/30' : 'bg-bearish/20 text-bearish border-bearish/30'
      )}
    >
      {side}
    </Badge>
  );
}

function OrderTypeBadge({ orderType }: { orderType: string }) {
  return (
    <Badge variant="secondary" className="font-medium">
      {orderType}
    </Badge>
  );
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assetFilter, setAssetFilter] = useState<string>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Get unique assets for filter
  const uniqueAssets = useMemo(() => {
    const assets = new Set(orders.map(o => o.asset.symbol));
    return Array.from(assets);
  }, [orders]);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;
      if (assetFilter !== 'all' && order.asset.symbol !== assetFilter) return false;
      return true;
    });
  }, [orders, statusFilter, assetFilter]);

  // Sort orders
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case 'timestamp':
          comparison = new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          break;
        case 'asset':
          comparison = a.asset.symbol.localeCompare(b.asset.symbol);
          break;
        case 'quantity':
          comparison = b.quantity - a.quantity;
          break;
        case 'price':
          comparison = b.price - a.price;
          break;
      }
      return sortDirection === 'asc' ? -comparison : comparison;
    });
  }, [filteredOrders, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const SortHeader = ({ label, sortKeyName }: { label: string; sortKeyName: SortKey }) => (
    <th 
      className="p-3 text-left font-medium cursor-pointer hover:bg-muted/70 transition-colors"
      onClick={() => handleSort(sortKeyName)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className={cn(
          "h-3 w-3",
          sortKey === sortKeyName ? "text-primary" : "text-muted-foreground"
        )} />
      </div>
    </th>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>My Orders</CardTitle>
            <CardDescription>Track all your trading orders with filtering and sorting</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Filled">Filled</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assetFilter} onValueChange={(val) => { setAssetFilter(val); setCurrentPage(1); }}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assets</SelectItem>
                {uniqueAssets.map((asset) => (
                  <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Order ID</th>
                <SortHeader label="Asset" sortKeyName="asset" />
                <th className="p-3 text-left font-medium">Order Type</th>
                <th className="p-3 text-left font-medium">Side</th>
                <SortHeader label="Quantity" sortKeyName="quantity" />
                <SortHeader label="Price" sortKeyName="price" />
                <th className="p-3 text-left font-medium">Status</th>
                <SortHeader label="Timestamp" sortKeyName="timestamp" />
                <th className="p-3 text-left font-medium">AI Council</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-muted-foreground">
                    No orders found
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-accent/50 transition-colors">
                    <td className="p-3 font-mono text-xs text-muted-foreground">
                      {order.id}
                    </td>
                    <td className="p-3 font-medium">{order.asset.symbol}</td>
                    <td className="p-3">
                      <OrderTypeBadge orderType={order.orderType} />
                    </td>
                    <td className="p-3">
                      <SideBadge side={order.side} />
                    </td>
                    <td className="p-3 font-mono">{order.quantity.toLocaleString()}</td>
                    <td className="p-3 font-mono">${order.price.toLocaleString()}</td>
                    <td className="p-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {formatDistanceToNow(new Date(order.timestamp), { addSuffix: true })}
                    </td>
                    <td className="p-3">
                      <button 
                        onClick={() => setSelectedOrderId(order.id)}
                        className="hover:opacity-80 transition-opacity"
                      >
                        <CouncilIndicator
                          verdict={generateSignalCouncilSummary(order.id).verdict}
                          agreement={generateSignalCouncilSummary(order.id).agreement}
                          modelCount={generateSignalCouncilSummary(order.id).modelCount}
                          compact
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Council Modal */}
        <SignalCouncilModal
          open={!!selectedOrderId}
          onOpenChange={(open) => !open && setSelectedOrderId(null)}
          summary={selectedOrderId ? generateSignalCouncilSummary(selectedOrderId) : null}
          assetSymbol={paginatedOrders.find(o => o.id === selectedOrderId)?.asset.symbol}
        />

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, sortedOrders.length)} of {sortedOrders.length} orders
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
