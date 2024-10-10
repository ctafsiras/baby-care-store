"use client";

import { useGetBestProductsQuery } from "@/redux/api/product";
import { Product } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import LoadingSkeleton from "../loading-skeleton";

export default function HeroSectionImages() {
  const { data: bestSellers, isLoading } = useGetBestProductsQuery<
    Product[] | any
  >(4);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      {bestSellers?.map((product: Product) => (
        <div
          key={product.id}
          className="relative group overflow-hidden rounded-lg"
        >
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover transition-transform group-hover:scale-110"
            width={150}
            height={150}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
        </div>
      ))}
    </>
  );
}
