import { OrdersTable } from "@/components/performance/OrdersTable";
import { mockOrders } from "@/lib/mockTradeData";

const MyOrders = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">
          View and manage all your trading orders
        </p>
      </div>

      <OrdersTable orders={mockOrders} />
    </div>
  );
};

export default MyOrders;
