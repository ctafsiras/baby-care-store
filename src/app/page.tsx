import HeroFeature from "@/components/HeroFeature";
import NavigationMenu from "@/components/navbar/nav-menu";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage | Baby Care Store | Online Baby Care Products Store",
  description:
    "Premier online destination for top-quality baby care products. Shop now and enjoy secure checkout.",
};
export default function Home() {
  return (
    <>
      <HeroFeature />
    </>
  );
}
