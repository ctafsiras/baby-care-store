import BestSellers from "@/components/landing/best-sellers";
import TopCompanies from "@/components/landing/companies";
import FeaturedCategories from "@/components/landing/featured-categories";
import HeroSection from "@/components/landing/hero-section";
import Newsletter from "@/components/landing/newsletter";
import Testimonials from "@/components/landing/testimonials";
import { Metadata } from "next";
import HowItWorks from "../components/landing/how-it-works";
import NewArrivals from "@/components/landing/new-arrivals";

export const metadata: Metadata = {
  title: "Homepage | Baby Care Store | Online Baby Care Products Store",
  description:
    "Premier online destination for top-quality baby care products. Shop now and enjoy secure checkout.",
};
export default function Home() {
  return (
    <main>
      <HeroSection />
      <NewArrivals />
      <FeaturedCategories />
      <BestSellers />
      <TopCompanies />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
