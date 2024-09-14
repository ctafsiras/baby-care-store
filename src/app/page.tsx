import BestSellers from "@/components/landing/best-sellers";
import FeaturedCategories from "@/components/landing/featured-categories";
import HeroSection from "@/components/landing/hero-section";
import Newsletter from "@/components/landing/newsletter";
import Testimonials from "@/components/landing/testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage | Baby Care Store | Online Baby Care Products Store",
  description:
    "Premier online destination for top-quality baby care products. Shop now and enjoy secure checkout.",
};
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <BestSellers />
      <Testimonials />
      <Newsletter />
    </>
  );
}
