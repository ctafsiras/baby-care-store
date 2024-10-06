"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/slice/user";
import { useGetAllOrdersQuery } from "@/redux/api/order";
import { toast } from "@/hooks/use-toast";
import Loading from "@/app/loading";

export default function MyOrdersPage() {
  const token = useAppSelector(selectToken);
  const { data: orders, isLoading } = useGetAllOrdersQuery(token as string);
  const handleRating = (orderId: string, rating: number) => {
    toast({
      title: "This feature is not implemented yet",
      description: "Please try again later",
    });
  };

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
            <TableHead>Rating</TableHead>
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
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {order.status === "Delivered" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Rate Your Order</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rate Your Order</DialogTitle>
                      </DialogHeader>
                      <RadioGroup
                        onValueChange={(value) =>
                          handleRating(order.id, Number(value))
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="r1" />
                          <Label htmlFor="r1">1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="r2" />
                          <Label htmlFor="r2">2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3" id="r3" />
                          <Label htmlFor="r3">3</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4" id="r4" />
                          <Label htmlFor="r4">4</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5" id="r5" />
                          <Label htmlFor="r5">5</Label>
                        </div>
                      </RadioGroup>
                    </DialogContent>
                  </Dialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
