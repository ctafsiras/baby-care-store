import ProductDetails from "@/components/product/product-details";
import { config } from "@/lib/config";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { productId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { productId } = params;

  const product = await fetch(`${config.host}/api/products/${productId}`).then(
    (res) => res.json()
  );
  return {
    title: `${product.name} | Baby Care Store`,
    description: product.description,
  };
}

const Page = ({ params }: Props) => {
  const { productId } = params;
  return (
    <div>
      <ProductDetails productId={productId} />
    </div>
  );
};

export default Page;
