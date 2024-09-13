import ProductDetails from "@/components/product/product-details";

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  return (
    <div>
      <ProductDetails productId={productId} />
    </div>
  );
};

export default Page;
