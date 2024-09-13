"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { clearCart, deleteItemFromCart, selectCart } from "@/redux/slice/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/api/order";
import { selectToken } from "@/redux/slice/user";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [createOrder, data] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCart);
  const token = useAppSelector(selectToken);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { toast } = useToast();
  const deliveryCharge = cartItems.length > 0 ? 15 : 0;
  const subtotal =
    cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;
  const total = subtotal + deliveryCharge;

  const handleCheckout = async () => {
    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to checkout.",
        variant: "destructive",
      });
      return router.push("/login");
    }

    const items = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    const order = await createOrder({ items, token });
    if (order.data?.id) {
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and will be delivered soon.",
      });
      dispatch(clearCart());
      return router.push("/dashboard/my-orders");
    } else {
      toast({
        variant: "destructive",
        title: "Order Cannot be Placed!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(data?.error, null, 2)}
            </code>
          </pre>
        ),
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      {item.quantity} x ৳{item.price}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => dispatch(deleteItemFromCart(item.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="cash" onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash On Delivery</Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Charge:</span>
                <span>৳{deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>৳{total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              disabled={cartItems.length === 0}
              className="w-full mt-4"
              onClick={handleCheckout}
            >
              Proceed Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
