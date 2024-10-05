import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full py-8 bg-gradient-to-r from-pink-100 dark:from-pink-900 to-blue-100 dark:to-blue-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to Baby Care Store
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover our curated collection of premium baby products. Safe,
                stylish, and loved by parents worldwide.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/products"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/checkout">
                <Button variant="outline">View Cart</Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group overflow-hidden rounded-lg">
                <Image
                  src="https://hattimatim.com.bd/storage/Baby%20Acco/Baby%20Care%20set/47e8cb1e0b7992e140d6e2f83aa2dcc3.jpg"
                  alt="Baby Stroller"
                  className="object-cover w-full h-full transition-transform group-hover:scale-110"
                  width="200"
                  height="200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <Image
                  src="https://hattimatim.com.bd/storage/Baby%20Acco/Baby%20Care%20set/47e8cb1e0b7992e140d6e2f83aa2dcc3.jpg"
                  alt="Baby Clothes"
                  className="object-cover w-full h-full transition-transform group-hover:scale-110"
                  width="200"
                  height="200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <Image
                  src="https://hattimatim.com.bd/storage/Baby%20Acco/Baby%20Care%20set/47e8cb1e0b7992e140d6e2f83aa2dcc3.jpg"
                  alt="Baby Toys"
                  className="object-cover w-full h-full transition-transform group-hover:scale-110"
                  width="200"
                  height="200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <Image
                  src="https://hattimatim.com.bd/storage/Baby%20Acco/Baby%20Care%20set/47e8cb1e0b7992e140d6e2f83aa2dcc3.jpg"
                  alt="Baby Care Products"
                  className="object-cover w-full h-full transition-transform group-hover:scale-110"
                  width="200"
                  height="200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
