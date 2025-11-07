"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

interface FeaturedProductsCarouselProps {
  title: string;
  products: Product[];
  categoryIcon?: string;
  categoryId?: string;
}

export function FeaturedProductsCarousel({
  title,
  products,
  categoryIcon,
  categoryId,
}: FeaturedProductsCarouselProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleViewAll = async () => {
    if (isNavigating) return; // Prevent multiple clicks

    setIsNavigating(true);

    // Add delay to ensure smooth transition and data loading
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (categoryId) {
      router.push(`/products?categoryId=${categoryId}`);
    } else {
      router.push("/products");
    }
  };
  // If there is no product, render nothing for this section
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-lg shadow-md mb-3 sm:mb-4 md:mb-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            {/* Left spacer */}
            <div className="hidden sm:block" />

            {/* Centered title with icon */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-center">
              {categoryIcon &&
                (categoryIcon.startsWith("http") ||
                categoryIcon.startsWith("/") ? (
                  <img
                    src={categoryIcon}
                    alt={title}
                    className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 object-contain rounded"
                    style={{ filter: "brightness(0) invert(1)" }}
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

            {/* Right aligned link */}
            <div className="flex justify-end">
              <button
                onClick={handleViewAll}
                disabled={isNavigating}
                className={`text-xs sm:text-sm md:text-base font-medium hover:underline transition-colors cursor-pointer ${
                  isNavigating
                    ? "text-white/60 cursor-wait"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {isNavigating ? "Đang chuyển..." : "Xem tất cả →"}
              </button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden pb-3 sm:pb-4 md:pb-6">
          <div className="flex gap-2 sm:gap-3 md:gap-4 animate-scroll">
            {products.map((product) => (
              <div
                key={`prod-a-${product.id}`}
                className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64"
              >
                <ProductCard product={product} />
              </div>
            ))}
            {products.map((product) => (
              <div
                key={`prod-b-${product.id}`}
                className="flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
