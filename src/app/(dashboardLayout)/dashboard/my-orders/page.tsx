"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";
import { useGetAllOrdersQuery } from "@/redux/api/order";
import { toast } from "@/hooks/use-toast";
import Loading from "@/app/loading";
import OrderFeedback from "@/components/feedback/order-feedback";

export default function MyOrdersPage() {
  const token = useAppSelector(selectToken);
  const { data: orders, isLoading } = useGetAllOrdersQuery(token as string);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order No</TableHead>
            <TableHead>Order Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Feedback</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order, i) => (
            <TableRow key={order.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                {order.orderItems.map((item) => (
                  <div key={item.product.id}>
                    {item.product.name} X {item.quantity} - $
                    {item.product.price}
                  </div>
                ))}
              </TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span
                  className={`${getStatusColor(
                    order.status
                  )} px-2 py-1 rounded-md`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell>
                {order.status === "Delivered" ? (
                  <OrderFeedback orderId={order.id} />
                ) : (
                  <p>Waiting for delivery</p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
const getStatusColor = (status: string): string => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100";
    case "Processing":
      return "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100";
    case "Shipped":
      return "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100";
    case "Delivered":
      return "bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100";
    case "Cancelled":
      return "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100";
  }
};
