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
import {
  addToCart,
  clearCart,
  deleteItemFromCart,
  removeFromCart,
  selectCart,
} from "@/redux/slice/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/api/order";
import { selectToken } from "@/redux/slice/user";
import { useRouter } from "next/navigation";
import { useGetShippingAddressesQuery } from "@/redux/api/profile";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const token = useAppSelector(selectToken);
  const [createOrder, data] = useCreateOrderMutation();
  const { data: shippingAddresses, isLoading } = useGetShippingAddressesQuery(
    token!
  );
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCart);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [shippingAddress, setShippingAddress] = useState("");
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
              cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-lg">{item.name}</span>
                        <span className="text-sm text-gray-600">
                          ৳{item.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center space-x-2  rounded-md p-1">
                        <Button
                          size="sm"
                          onClick={() => dispatch(removeFromCart(item))}
                          disabled={item.quantity === 1}
                          className="font-bold"
                        >
                          -
                        </Button>
                        <span className="font-bold min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => dispatch(addToCart(item))}
                          className="font-bold"
                        >
                          +
                        </Button>
                      </div>
                      <span className="font-semibold">
                        ৳{item.price * item.quantity}
                      </span>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => dispatch(deleteItemFromCart(item.id))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <hr className="my-2 border-gray-200" />
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="cash" onValueChange={setShippingAddress}>
              <div className="space-y-4">
                {!token ? (
                  <div className="text-center p-4">
                    <p className="mb-2">
                      Please log in to proceed with checkout.
                    </p>
                    <Link
                      href="/login"
                      className="text-blue-600 hover:underline"
                    >
                      Go to login page
                    </Link>
                  </div>
                ) : !shippingAddresses || shippingAddresses.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="mb-2">No shipping address found.</p>
                    <Link
                      href="/dashboard/my-profile"
                      className="text-blue-600 hover:underline"
                    >
                      Go to profile to add a shipping address
                    </Link>
                  </div>
                ) : (
                  shippingAddresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-start space-x-2 p-3 border rounded-md"
                    >
                      <RadioGroupItem
                        value={address.id}
                        id={address.id}
                        className="mt-1"
                      />
                      <div>
                        <Label htmlFor={address.id} className="font-medium">
                          {address.name}
                        </Label>
                        <div className="text-sm text-gray-600">
                          <p>{address.street}</p>
                          <p>
                            {address.postalCode}, {address.district}
                          </p>
                          <p>Mobile: {address.mobile}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </RadioGroup>
          </CardContent>
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
              disabled={cartItems.length === 0 || !shippingAddress}
              className="w-full mt-4"
              onClick={handleCheckout}
            >
              {cartItems.length === 0
                ? "Add item to cart"
                : !shippingAddress
                ? "Select a shipping address"
                : "Proceed Checkout"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
