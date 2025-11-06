"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
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
      <section className="py-3 sm:py-4 md:py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="text-center py-2 sm:py-3 px-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-0 p-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-3 sm:py-4 md:py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title Banner */}
        <div className="bg-white rounded-t-lg border border-gray-200 shadow-sm mb-0">
          <div className="text-center py-2 sm:py-3 px-4">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
              DANH MỤC NỔI BẬT
            </h2>
          </div>
        </div>

        {/* Categories Grid - Responsive */}
        <div className="bg-white border-x border-b border-gray-200 rounded-b-lg shadow-sm overflow-hidden">
          {/* Mobile: 2 rows x 4 columns */}
          <div className="grid grid-cols-4 sm:hidden gap-0">
            {categoriesWithImagesData.slice(0, 8).map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative aspect-square border-r border-b border-gray-200 last:border-r-0 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-white hover:bg-gray-50"
              >
                {/* Enhanced Product Image Area */}
                <div className="absolute inset-1 bg-white rounded overflow-hidden shadow-sm">
                  {/* Image container */}
                  <div className="w-full h-2/3 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                    {category.iconImg && (
                      <img
                        src={category.iconImg}
                        alt={category.categoryName}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling!.classList.remove("hidden");
                        }}
                      />
                    )}
                    {/* Fallback emoji icon */}
                    <div className="text-base sm:text-lg opacity-60 hidden">
                      {category.iconImg || "📦"}
                    </div>
                  </div>

                  {/* Category Name */}
                  <div className="absolute bottom-0.5 left-0.5 right-0.5 bg-white/90 backdrop-blur-sm rounded-sm">
                    <span className="text-[8px] sm:text-[10px] font-semibold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-1 text-center block py-0.5">
                      {category.categoryName}
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Tablet and Desktop: Single row */}
          <div className="hidden sm:grid sm:grid-cols-6 md:grid-cols-8 gap-0">
            {categoriesWithImagesData.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative aspect-[4/3] sm:aspect-square md:aspect-[4/3] border-r border-gray-200 last:border-r-0 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-white hover:bg-gray-50"
              >
                {/* Enhanced Product Image Area */}
                <div className="absolute inset-1 bg-white rounded overflow-hidden shadow-sm">
                  {/* Image container */}
                  <div className="w-full h-2/3 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                    {category.iconImg && (
                      <img
                        src={category.iconImg}
                        alt={category.categoryName}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling!.classList.remove("hidden");
                        }}
                      />
                    )}
                    {/* Fallback emoji icon */}
                    <div className="text-sm sm:text-base md:text-lg opacity-60 hidden">
                      {category.iconImg || "📦"}
                    </div>
                  </div>

                  {/* Category Name */}
                  <div className="absolute bottom-0.5 left-0.5 right-0.5 bg-white/90 backdrop-blur-sm rounded-sm">
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-1 text-center block py-0.5">
                      {category.categoryName}
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
