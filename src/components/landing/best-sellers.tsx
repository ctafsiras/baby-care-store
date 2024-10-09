"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import {
  ProductWithReviews,
  useGetAllProductsQuery,
  useGetBestProductsQuery,
} from "@/redux/api/product";
import { Product } from "@prisma/client";
import { addToCart } from "@/redux/slice/cart";
import { useAppDispatch } from "@/redux/hooks";
import Loading from "@/app/loading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { calculateAverageRating } from "@/lib/averageRating";

export default function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: bestSellers = [], isLoading } = useGetBestProductsQuery<
    Product[] | any
  >(4);
  const dispatch = useAppDispatch();

  const nextSlide = () => {
    if (bestSellers.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bestSellers.length);
    }
  };

  const prevSlide = () => {
    if (bestSellers.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + bestSellers.length) % bestSellers.length
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const getVisibleProducts = () => {
    if (!bestSellers || bestSellers.length === 0) return [];
    const products = [];
    for (let i = 0; i < Math.min(3, bestSellers.length); i++) {
      const index = (currentIndex + i) % bestSellers.length;
      products.push(bestSellers[index]);
    }
    return products;
  };

  return (
    <section className="w-full py-4 sm:px-4">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-xl font-bold tracking-tighter sm:text-3xl text-center mb-4">
          Best Sellers
        </h2>
        <div className="relative p-4 sm:p-8">
          <div className="flex overflow-hidden gap-4">
            {getVisibleProducts()?.map(
              (product: ProductWithReviews, index: number) => (
                <div
                  key={product?.id || index}
                  className={cn(
                    "w-full md:w-1/3 flex-shrink-0 transition-all duration-300 ease-in-out px-2",
                    {
                      "hidden md:block": index !== 1,
                      "md:scale-95 z-0": index !== 1,
                    }
                  )}
                >
                  <Card className="w-full max-w-sm mx-auto">
                    <CardContent className="p-4">
                      <div className="aspect-square relative mb-4">
                        <Image
                          src={product?.image || "/placeholder-image.jpg"}
                          alt={product?.name || "Product"}
                          className="object-cover w-auto h-auto rounded-lg"
                          height={200}
                          width={200}
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {product?.name || "Unnamed Product"}
                      </h3>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold">
                          ${(product?.price || 0).toFixed(2)}
                        </span>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-5 h-5 ${
                                index <
                                Math.floor(
                                  calculateAverageRating(product?.reviews)
                                )
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {calculateAverageRating(product?.reviews)}/5
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => product && dispatch(addToCart(product))}
                        className="w-full"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
