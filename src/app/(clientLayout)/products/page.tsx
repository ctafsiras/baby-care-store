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
      <h1 className="text-xl sm:text-3xl text-center font-bold mb-4">
        All Products
      </h1>
      <ProductsPage />
    </div>
  );
};

export default Page;
