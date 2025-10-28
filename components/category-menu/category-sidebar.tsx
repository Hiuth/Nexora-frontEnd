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
    <div className="w-64 bg-gray-50 border-r border-gray-200">
      <div className="p-4 bg-red-600 text-white">
        <h2 className="font-bold text-base flex items-center gap-2">
          <Menu className="h-4 w-4" />
          Danh mục sản phẩm
        </h2>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
              hoveredCategory === category.id
                ? "bg-red-50 text-red-600 border-r-3 border-r-red-500"
                : ""
            }`}
            onMouseEnter={() => onCategoryHover(category.id)}
          >
            <span className="text-lg">{category.iconImg}</span>
            <span className="font-medium text-sm">{category.categoryName}</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
