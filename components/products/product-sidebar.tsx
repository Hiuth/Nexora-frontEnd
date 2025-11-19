"use client";

import { useState, useEffect } from "react";
import { FilterSidebar } from "./filter-sidebar";
import { PcBuildFilterSidebar } from "../pc-build/pc-build-filter-sidebar";
import { BrandService } from "@/services/brand.service";
import { categories, subCategories, brands } from "@/lib/mock-data";
import type { Brand } from "@/lib/types";

interface ProductSidebarProps {
  isPcBuildMode: boolean;
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

export function ProductSidebar({
  isPcBuildMode,
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
}: ProductSidebarProps) {
  const [apiBrands, setApiBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandsData = await BrandService.getBrands();
        setApiBrands(brandsData);
      } catch (error) {
        console.error("Failed to load brands:", error);
        setApiBrands([]);
      }
    };

    loadBrands();
  }, []);

  if (isPcBuildMode) {
    return (
      <aside className="hidden lg:block w-80 flex-shrink-0">
        <PcBuildFilterSidebar
          priceRange={priceRange}
          maxPrice={maxPrice}
          onPriceRangeChange={onPriceRangeChange}
          onClearFilters={onClearFilters}
        />
      </aside>
    );
  }

  return (
    <aside className="hidden lg:block w-80 flex-shrink-0">
      <FilterSidebar
        categories={categories}
        subCategories={subCategories}
        brands={apiBrands.length > 0 ? apiBrands : brands}
        selectedCategories={selectedCategories}
        selectedSubCategories={selectedSubCategories}
        selectedBrands={selectedBrands}
        priceRange={priceRange}
        maxPrice={maxPrice}
        hasActiveFilters={hasActiveFilters}
        onCategoryChange={onCategoryChange}
        onSubCategoryChange={onSubCategoryChange}
        onBrandChange={onBrandChange}
        onPriceRangeChange={onPriceRangeChange}
        onClearFilters={onClearFilters}
      />
    </aside>
  );
}