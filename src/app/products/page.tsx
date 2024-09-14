import ProductsPage from "@/components/product/products-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Care Products | Baby Care Store",
  description:
    "Shop our wide range of baby care products, from diapers to toys and more",
};
const Page = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <ProductsPage />
    </div>
  );
};

export default Page;
