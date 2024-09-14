import CheckoutPage from "@/components/checkout-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Baby Care Store",
  description:
    "Complete your purchase and checkout securely on Baby Care Store",
};
const Page = () => {
  return (
    <div>
      <CheckoutPage />
    </div>
  );
};

export default Page;
