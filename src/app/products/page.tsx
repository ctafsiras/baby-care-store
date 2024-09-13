import ProductsPage from "@/components/product/products-page";

const Page = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <ProductsPage />
    </div>
  );
};

export default Page;
