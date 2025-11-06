"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { CategoryService } from "@/services/category.service";
import { Category } from "@/lib/types";

// Extended categories with sample images
const categoriesWithImages = [
  {
    id: "1",
    categoryName: "CPU",
    iconImg: "🔲",
    image: "/cpu-sample.jpg",
    bgColor: "bg-white",
  },
  {
    id: "2",
    categoryName: "GPU",
    iconImg: "🎮",
    image: "/gpu-sample.jpg",
    bgColor: "bg-white",
  },
  {
    id: "3",
    categoryName: "RAM",
    iconImg: "💾",
    image: "/ram-sample.jpg",
    bgColor: "bg-white",
  },
  {
    id: "4",
    categoryName: "Mainboard",
    iconImg: "⚡",
    image: "/mainboard-sample.jpg",
    bgColor: "bg-white",
  },
  {
    id: "5",
    categoryName: "Storage",
    iconImg: "💿",
    image: "/storage-sample.jpg",
    bgColor: "bg-white",
  },
  {
    id: "6",
    categoryName: "PSU",
    iconImg: "🔋",
    image: "/psu-sample.jpg",
    bgColor: "bg-white",
  },
  {
    id: "7",
    categoryName: "Case",
    iconImg: "📦",
    image: "/case-sample.jpg",
    bgColor: "bg-white",
  },
  {
    id: "8",
    categoryName: "Cooling",
    iconImg: "❄️",
    image: "/cooling-sample.jpg",
    bgColor: "bg-white",
  },
];

export function CategoryBanner() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await CategoryService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Auto-scroll functionality - Ultra smooth continuous scrolling
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || loading) return;

    let animationId: number;
    let lastTime = 0;
    const scrollSpeed = 30; // pixels per second for ultra smooth movement

    const smoothScroll = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;

      const deltaTime = currentTime - lastTime;
      const scrollDistance = (scrollSpeed * deltaTime) / 1000; // Convert to pixels per frame

      // Check if we've reached the end
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        // Smooth reset to start
        scrollContainer.scrollLeft = 0;
      } else {
        // Smooth continuous scroll to the right
        scrollContainer.scrollLeft += scrollDistance;
      }

      lastTime = currentTime;
      animationId = requestAnimationFrame(smoothScroll);
    };

    // Start scrolling after 2 seconds
    const timer = setTimeout(() => {
      animationId = requestAnimationFrame(smoothScroll);
    }, 2000);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    const handleMouseLeave = () => {
      lastTime = 0; // Reset timing
      animationId = requestAnimationFrame(smoothScroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      if (animationId) cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [loading]);

  // Check scroll position
  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
      );
    }
  };

  // Manual scroll controls
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Merge API data with local images
  const categoriesWithImagesData = categories.map((category) => {
    const localData = categoriesWithImages.find(
      (local) => local.id === category.id
    );
    return {
      ...category,
      image: localData?.image || "",
      bgColor: localData?.bgColor || "bg-white",
    };
  });

  if (loading) {
    return (
      <section className="py-6 md:py-8 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Loading Title Section */}
          <div className="mb-8 text-center">
            <div className="h-8 bg-slate-200 rounded-lg mx-auto mb-3 w-64 animate-pulse"></div>
            <div className="w-20 h-0.5 bg-slate-200 rounded-full mx-auto mb-6 animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded mx-auto w-96 animate-pulse"></div>
          </div>

          {/* Loading Grid - Single Row */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg overflow-hidden relative">
            <div className="flex gap-4 p-6">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-white rounded-xl shadow-sm border border-slate-100 p-4 w-40 min-h-[120px] flex items-center justify-center"
                >
                  <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Enhanced Title Section */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">
            Danh mục sản phẩm
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Khám phá các danh mục sản phẩm phong phú với chất lượng hàng đầu
          </p>
        </div>

        {/* Categories Grid - Horizontal Scrollable */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/95 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            >
              <ChevronLeft className="h-5 w-5 text-slate-600 group-hover:text-slate-800" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/95 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            >
              <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-slate-800" />
            </button>
          )}

          {/* Scrollable Categories */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 bg-white p-6 overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              willChange: "scroll-position",
              transform: "translateZ(0)", // Force hardware acceleration
            }}
          >
            {categoriesWithImagesData.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative bg-white hover:bg-slate-50 transition-all duration-300 hover:shadow-xl hover:z-10 rounded-xl flex-shrink-0 w-40 shadow-sm border border-slate-100"
              >
                {/* Content Container */}
                <div className="p-4 text-center min-h-[120px] flex flex-col justify-between">
                  {/* Image Container */}
                  <div className="w-full h-16 mb-3 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    {category.iconImg ? (
                      <img
                        src={category.iconImg}
                        alt={category.categoryName}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling!.classList.remove("hidden");
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <span className="text-xl text-slate-400">📦</span>
                      </div>
                    )}
                    {/* Fallback icon */}
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center hidden">
                      <span className="text-xl text-slate-400">📦</span>
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                    {category.categoryName}
                  </h3>
                </div>

                {/* Subtle bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
