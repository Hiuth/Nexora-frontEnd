"use client";

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

  // Auto scroll uses CSS marquee like BrandLogosScroll (animate-scroll)

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

        {/* Categories Grid - Auto marquee like brands */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
          <div className="relative overflow-hidden">
            <div className="flex gap-4 bg-white p-6 animate-scroll">
              {categoriesWithImagesData.map((category) => (
                <div
                  key={`cat-a-${category.id}`}
                  onClick={() => {
                    if (category.categoryName === "Máy Bộ Nexora" || category.id === "pc-builder") {
                      // Navigate to PC Build products page
                      window.location.href = `/products?pcBuild=true&categoryId=${category.id}`;
                    } else {
                      // Navigate to regular products page with category filter
                      window.location.href = `/products?categoryId=${category.id}`;
                    }
                  }}
                  className="group relative bg-white hover:bg-slate-50 transition-all duration-300 hover:shadow-xl hover:z-10 rounded-xl flex-shrink-0 w-40 shadow-sm border border-slate-100 cursor-pointer"
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
                            target.nextElementSibling!.classList.remove(
                              "hidden"
                            );
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
                </div>
              ))}
              {categoriesWithImagesData.map((category) => (
                <div
                  key={`cat-b-${category.id}`}
                  onClick={() => {
                    if (category.categoryName === "Máy Bộ Nexora" || category.id === "pc-builder") {
                      // Navigate to PC Build products page
                      window.location.href = `/products?pcBuild=true&categoryId=${category.id}`;
                    } else {
                      // Navigate to regular products page with category filter
                      window.location.href = `/products?categoryId=${category.id}`;
                    }
                  }}
                  className="group relative bg-white hover:bg-slate-50 transition-all duration-300 hover:shadow-xl hover:z-10 rounded-xl flex-shrink-0 w-40 shadow-sm border border-slate-100 cursor-pointer"
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
                            target.nextElementSibling!.classList.remove(
                              "hidden"
                            );
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
