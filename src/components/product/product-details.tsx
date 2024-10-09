"use client";
import { useState } from "react";
import { Star, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useGetSingleProductQuery } from "@/redux/api/product";
import Loading from "@/app/loading";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { addToCart, addToCartWithQuantity } from "@/redux/slice/cart";
import { useAppDispatch } from "@/redux/hooks";
import { Product } from "@prisma/client";
import { ProductReviews } from "../review/product-reviews";

export default function ProductDetails({ productId }: { productId: string }) {
  const { data: product, isLoading } = useGetSingleProductQuery(productId);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(
      isNaN(value) ? 1 : Math.max(1, Math.min(value, product?.stock!))
    );
  };
  const handleBuyNow = (product: Product) => {
    dispatch(addToCartWithQuantity({ ...product, quantity }));
    router.push("/checkout");
  };
  if (isLoading) {
    return <Loading />;
  }
  if (!product) {
    return notFound();
  }
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative">
            <Image
              src={product?.image}
              alt={product?.name}
              className="object-cover rounded-lg shadow-lg"
              width={600}
              height={600}
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product?.stock)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {product?.stock} out of 5 stars
              </span>
            </div>
          </div>
          <p className="text-gray-600">{product?.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              ${product?.price.toFixed(2)}
            </span>
            <Badge variant="secondary" className="text-sm">
              {product?.stock > 0
                ? `${product?.stock} in stock`
                : "Out of stock"}
            </Badge>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="font-medium">
                Quantity:
              </label>
              <Input
                type="number"
                id="quantity"
                min="1"
                max={product?.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20"
              />
            </div>
            <Button
              className="w-full"
              disabled={product?.stock === 0}
              onClick={() =>
                dispatch(addToCartWithQuantity({ ...product, quantity }))
              }
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              disabled={product?.stock === 0}
              onClick={() => handleBuyNow(product)}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <ProductReviews productId={productId} />
    </div>
  );
}
