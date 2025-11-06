"use client";

import { ChevronRight, Menu } from "lucide-react";
import { Category } from "@/lib/types";

interface CategorySidebarProps {
  categories: Category[];
  hoveredCategory: string | null;
  onCategoryHover: (categoryId: string) => void;
}

export function CategorySidebar({
  categories,
  hoveredCategory,
  onCategoryHover,
}: CategorySidebarProps) {
  return (
    <div className="lg:w-64 w-full bg-gray-50 lg:border-r border-gray-200">
      <div className="max-h-[520px] overflow-y-auto pt-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
              hoveredCategory === category.id
                ? "bg-red-50 text-red-600 border-r-3 border-r-red-500"
                : ""
            }`}
            onMouseEnter={() => onCategoryHover(category.id)}
            onClick={() => {
              if (category.id === "pc-builder") {
                // Navigate to PC Builder page
                window.location.href = "/pc-builder";
              } else {
                onCategoryHover(category.id);
              }
            }}
          >
            {/* Enhanced category icon/image area */}
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
              {category.iconImg && (
                <img
                  src={category.iconImg}
                  alt={category.categoryName}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling!.classList.remove("hidden");
                  }}
                />
              )}
              {/* Fallback emoji icon */}
              <span className="text-sm hidden">{category.iconImg || "📦"}</span>
            </div>

            <span className="font-medium text-sm flex-1">
              {category.categoryName}
            </span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
