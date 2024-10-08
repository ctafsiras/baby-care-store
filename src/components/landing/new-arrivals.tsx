"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useGetLatestProductsQuery } from "@/redux/api/product";
import { Product } from "@prisma/client";
import { Loader2, View } from "lucide-react";

const NewArrivals: React.FC = () => {
  const { data: latestProducts, isLoading } = useGetLatestProductsQuery<
    Product[] | any
  >(8);
  return (
    <section className="py-8 sm:px-4">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-3xl font-bold text-center mb-8">
          Our New Arrivals
        </h2>
        {isLoading ? (
          <Loader2 className="mx-auto size-10 h-full my-auto animate-spin" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProducts?.map((product: Product) => (
              <div
                key={product.id}
                className="rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-auto h-auto object-contain"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm truncate-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mb-4">${product.price.toFixed(2)}</p>
                  <Link href={`/products/${product.id}`} passHref>
                    <Button className="w-full  py-2 px-4 rounded transition duration-300">
                      <View className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
