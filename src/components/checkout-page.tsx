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
import { store } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const cartItems = selectCart(store.getState());
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { toast } = useToast();
  const deliveryCharge = 15;
  const subtotal =
    cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;
  const total = subtotal + deliveryCharge;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    const order = {
      items: cartItems,
      paymentMethod,
      subtotal,
      deliveryCharge,
      total,
    };
    console.log("Order:", order);

    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been placed and will be delivered soon.",
    });

    dispatch(clearCart());
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
            <Button className="w-full mt-4" onClick={handleCheckout}>
              Proceed Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
