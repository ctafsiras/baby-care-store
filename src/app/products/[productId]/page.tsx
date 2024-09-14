import ProductDetails from "@/components/product/product-details";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { productId } = params;
  const product = await fetch(`/api/products/${productId}`).then((res) =>
    res.json()
  );

  return {
    title: `${product.name} | Baby Care Store`,
    description: product.description,
  };
}

const Page = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  return (
    <div>
      <ProductDetails productId={productId} />
    </div>
  );
};

export default Page;
