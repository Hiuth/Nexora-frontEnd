"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "./product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedProductsSidebar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          // Reset to start when reaching the end
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll right
          scrollContainer.scrollBy({
            left: scrollContainer.clientWidth,
            behavior: "smooth",
          });
        }
      }, 3000); // Auto-scroll every 3 seconds
    };

    startAutoScroll();

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
      );
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Get featured products (products with numeric id % 3 === 0)
  const featuredProducts = products
    .filter((p) => parseInt(p.id) % 3 === 0)
    .slice(0, 6);

  return (
    <Card className="mb-6 border-2 shadow-lg overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-chart-1/10 to-chart-2/10">
        <CardTitle className="text-base font-bold bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent flex items-center gap-2">
          ⭐ Sản phẩm nổi bật
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 relative">
        {canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-white/90 hover:bg-white shadow-lg"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-white/90 hover:bg-white shadow-lg"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-36 snap-start">
              <ProductCard product={product} compact />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
