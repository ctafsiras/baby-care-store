"use client";
import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the Product type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
};

// Mock products data
const products: Product[] = [
  {
    id: 1,
    name: "Smartphone X",
    price: 599,
    image: "",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Laptop Pro",
    price: 1299,
    image: "",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 129,
    image: "",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249,
    image: "",
    rating: 4.6,
  },
  {
    id: 5,
    name: "4K TV",
    price: 799,
    image: "",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Gaming Console",
    price: 499,
    image: "",
    rating: 4.9,
  },
];

export default function ProductsPage() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    return (
      <div>
        <h1>Hello</h1>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">All Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col justify-between">
                <CardHeader>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">${product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => addToCart(product)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };
}
