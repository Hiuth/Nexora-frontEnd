"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import type { Category, SubCategory, Brand } from "@/lib/types";

interface FilterSidebarProps {
  categories: Category[];
  subCategories: SubCategory[];
  brands: Brand[];
  selectedCategories: string[];
  selectedSubCategories: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  maxPrice: number;
  hasActiveFilters: boolean;
  onCategoryChange: (categoryId: string) => void;
  onSubCategoryChange: (subCategoryId: string) => void;
  onBrandChange: (brandId: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  categories,
  subCategories,
  brands,
  selectedCategories,
  selectedSubCategories,
  selectedBrands,
  priceRange,
  maxPrice,
  hasActiveFilters,
  onCategoryChange,
  onSubCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <Card className="sticky top-20 shadow-lg border-0 bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl text-gray-800">Bộ lọc sản phẩm</h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Xóa
            </Button>
          )}
        </div>

        {/* Subcategories */}
        {selectedCategories.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100">
            <Label className="text-sm font-bold mb-3 block text-green-800 flex items-center gap-2">
              <span className="text-lg"></span>
              Loại sản phẩm
            </Label>
            <div className="space-y-2">
              {subCategories
                .filter((sub) => selectedCategories.includes(sub.categoryId))
                .map((subCategory) => (
                  <div
                    key={subCategory.id}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-green-100/50 transition-colors"
                  >
                    <Checkbox
                      id={`sub-${subCategory.id}`}
                      checked={selectedSubCategories.includes(subCategory.id)}
                      onCheckedChange={() =>
                        onSubCategoryChange(subCategory.id)
                      }
                      className="border-green-400 data-[state=checked]:bg-green-500"
                    />
                    <label
                      htmlFor={`sub-${subCategory.id}`}
                      className="text-sm cursor-pointer flex-1 font-medium text-gray-700"
                    >
                      {subCategory.subCategoryName}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Brands */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-100">
          <Label className="text-sm font-bold mb-3 block text-amber-800 flex items-center gap-2">
            <span className="text-lg">🏷️</span>
            Thương hiệu
          </Label>
          <div className="max-h-96 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-amber-100/50 transition-colors"
                >
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={() => onBrandChange(brand.id)}
                    className="border-amber-400 data-[state=checked]:bg-amber-500 flex-shrink-0"
                  />
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className="text-xs cursor-pointer flex-1 font-medium text-gray-700 leading-tight"
                  >
                    {brand.brandName}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
          <Label className="text-sm font-bold mb-3 block text-purple-800 flex items-center gap-2">
            <span className="text-lg"></span>
            Khoảng giá
          </Label>
          <div className="px-2 py-4">
            <Slider
              min={0}
              max={maxPrice}
              step={1000000}
              value={priceRange}
              onValueChange={(value) =>
                onPriceRangeChange(value as [number, number])
              }
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm font-semibold mt-2">
            <span className="text-purple-700 bg-white px-2 py-1 rounded shadow-sm">
              {formatPrice(priceRange[0])}
            </span>
            <span className="text-purple-700 bg-white px-2 py-1 rounded shadow-sm">
              {formatPrice(priceRange[1])}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
