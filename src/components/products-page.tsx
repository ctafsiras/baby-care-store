"use client";
import { useState } from "react";
import ProductCard from "./product-card";
import { useGetAllProductsQuery } from "@/redux/api/product";
import { Product } from "@prisma/client";
import Loading from "@/app/loading";

const ProductsPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product: Product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductsPage;
