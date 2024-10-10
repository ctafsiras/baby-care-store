"use client";

import ProductCard from "./product-card";
import { useGetAllProductsQuery } from "@/redux/api/product";
import { Product } from "@prisma/client";
import Loading from "@/app/loading";
import LoadingSkeleton from "../loading-skeleton";

const ProductsPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();

  if (isLoading) return <LoadingSkeleton />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
