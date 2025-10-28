"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Category, Brand } from "@/lib/types";

interface ActiveFiltersProps {
  selectedCategories: string[];
  selectedBrands: string[];
  categories: Category[];
  brands: Brand[];
  onRemoveCategory: (categoryId: string) => void;
  onRemoveBrand: (brandId: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  selectedCategories,
  selectedBrands,
  categories,
  brands,
  onRemoveCategory,
  onRemoveBrand,
  onClearAll,
}: ActiveFiltersProps) {
  const hasFilters = selectedCategories.length > 0 || selectedBrands.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
      <span className="text-sm font-semibold text-slate-600">
        Đang lọc theo:
      </span>

      {selectedCategories.map((catId) => {
        const cat = categories.find((c) => c.id === catId);
        return (
          <Badge
            key={catId}
            variant="secondary"
            className="gap-1 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 transition-colors"
          >
            {cat?.categoryName}
            <button
              onClick={() => onRemoveCategory(catId)}
              className="ml-1 hover:text-blue-900"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      })}

      {selectedBrands.map((brandId) => {
        const brand = brands.find((b) => b.id === brandId);
        return (
          <Badge
            key={brandId}
            variant="secondary"
            className="gap-1 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 transition-colors"
          >
            {brand?.brandName}
            <button
              onClick={() => onRemoveBrand(brandId)}
              className="ml-1 hover:text-amber-900"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      })}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        Xóa tất cả
      </Button>
    </div>
  );
}
