"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/order";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";
import Loading from "@/app/loading";
import { toast } from "@/hooks/use-toast";
import { Order, User } from "@prisma/client";
import { getStatusColor } from "@/lib/statusColor";

export default function OrdersPage() {
  const token = useAppSelector(selectToken);
  const { data: orders, isLoading } = useGetAllOrdersQuery(token as string);
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const res = await updateOrderStatus({
      id: orderId,
      status: newStatus,
      token: token as string,
    });
    if (res.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: <pre>{JSON.stringify(res.error, null, 2)}</pre>,
      });
    } else {
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order No</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.user.name}</TableCell>
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
                <Select
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                  defaultValue={order.status}
                >
                  <SelectTrigger disabled={isUpdating} className="w-[180px]">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Pending",
                      "Processing",
                      "Shipped",
                      "Delivered",
                      "Cancelled",
                    ].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
