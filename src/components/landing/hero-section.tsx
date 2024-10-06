import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroSectionImages from "./hero-section-images";

export default function HeroSection() {
  return (
    <section className="w-full py-4 sm:px-4 bg-gradient-to-r from-pink-100 dark:from-pink-900 to-blue-100 dark:to-blue-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-center md:text-left tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to Baby Care Store
              </h1>
              <p className="max-w-[600px] text-gray-700 dark:text-gray-300 text-center md:text-left md:text-xl">
                Discover our curated collection of premium baby products. Safe,
                stylish, and loved by parents worldwide.
              </p>
            </div>
            <div className="flex gap-2 justify-center md:justify-start">
              <Link href="/products">
                <Button variant="default">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/checkout">
                <Button variant="outline">View Cart</Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="grid grid-cols-2 gap-4">
              <HeroSectionImages />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
