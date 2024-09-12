"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: "Double Bed & Side Tables", price: 500, discountedPrice: 400 },
  { id: 2, name: "Luxurious Sofa Set", price: 800, discountedPrice: 650 },
  { id: 3, name: "Modern Dining Table", price: 600, discountedPrice: 480 },
  { id: 4, name: "Elegant Wardrobe", price: 700, discountedPrice: 560 },
  { id: 5, name: "Cozy Armchair", price: 300, discountedPrice: 240 },
  { id: 6, name: "Stylish Coffee Table", price: 250, discountedPrice: 200 },
];

export default function HeroFeature() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative bg-gray-800 text-white py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Crafting Comfort, Redefining Spaces.
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Your Home, Your Signature Style!
        </h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          fringilla nunc in molestie feugiat. Nunc auctor consectetur elit, quis
          pulvinar Lorem ipsum dolor sit amet.
        </p>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {products.map((product) => (
              <div
                key={product.id}
                className="embla__slide flex-[0_0_180px] sm:flex-[0_0_220px] md:flex-[0_0_260px] mx-2"
              >
                <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
                  <div className="relative h-32 sm:h-40 md:h-48 bg-gray-600">
                    <Image
                      src={`/placeholder.svg?height=192&width=256`}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      -20%
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold mb-2 truncate">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-400 line-through text-xs">
                          ${product.price}
                        </span>
                        <span className="text-sm font-bold ml-1">
                          ${product.discountedPrice}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-2 py-1"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <Button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
