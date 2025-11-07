"use client";

import { useRef, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

interface FeaturedProductsCarouselProps {
  title: string;
  products: Product[];
  categoryIcon?: string;
}

export function FeaturedProductsCarousel({
  title,
  products,
  categoryIcon,
}: FeaturedProductsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;

    if (scrollWidth <= clientWidth) return; // No need to scroll if content fits

    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame
    const pauseTime = 2000; // pause at end in ms
    let isPaused = false;
    let pauseStartTime = 0;

    const scroll = () => {
      if (!scrollContainer) return;

      if (isPaused) {
        const currentTime = Date.now();
        if (currentTime - pauseStartTime >= pauseTime) {
          isPaused = false;
          scrollPosition = 0; // Reset to start
        }
      } else {
        scrollPosition += scrollSpeed;

        // If reached the end, pause and reset
        if (scrollPosition >= scrollWidth - clientWidth) {
          isPaused = true;
          pauseStartTime = Date.now();
        }
      }

      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 16); // ~60fps

    return () => clearInterval(intervalId);
  }, [products]);

  return (
    <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-lg shadow-md mb-3 sm:mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3">
              {categoryIcon &&
                // If categoryIcon looks like a URL, render image; otherwise render as text/icon
                (categoryIcon.startsWith("http") ||
                categoryIcon.startsWith("/") ? (
                  <img
                    src={categoryIcon}
                    alt={title}
                    className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 object-contain rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    {categoryIcon}
                  </span>
                ))}
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                {title}
              </h3>
            </div>
            <div className="flex justify-end">
              <a
                href="/products"
                className="text-xs sm:text-sm md:text-base text-white hover:text-blue-200 font-medium hover:underline transition-colors"
              >
                Xem tất cả →
              </a>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-hidden pb-3 sm:pb-4 md:pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
