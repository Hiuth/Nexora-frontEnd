"use client";

import { SearchFilters } from "@/components/products/search-filters";
import { ProductList } from "@/components/products/product-list";
import { ProductSidebar } from "@/components/products/product-sidebar";
import { ProductPageHeader } from "@/components/products/product-page-header";
import { SearchResultsHeader } from "@/components/search-results-header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchParams } from "next/navigation";
import { Product, PcBuild } from "@/lib/types";

interface ProductContentAreaProps {
  isPcBuildMode: boolean;
  sortBy: string;
  products: Product[];
  pcBuilds: PcBuild[];
  isLoading: boolean;
  hasActiveFilters: boolean;
  pageTitle?: string;
  
  // Filter props
  selectedCategories: string[];
  selectedSubCategories: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  maxPrice: number;
  
  // Event handlers
  onSortChange: (value: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onSubCategoryChange: (subCategoryId: string) => void;
  onBrandChange: (brandId: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  onLoadMore: () => void;
}

export function ProductContentArea({
  isPcBuildMode,
  sortBy,
  products,
  pcBuilds,
  isLoading,
  hasActiveFilters,
  pageTitle,
  selectedCategories,
  selectedSubCategories,
  selectedBrands,
  priceRange,
  maxPrice,
  onSortChange,
  onCategoryChange,
  onSubCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onClearFilters,
  onLoadMore,
}: ProductContentAreaProps) {
  const isMobile = useIsMobile();
  const totalCount = isPcBuildMode ? pcBuilds.length : products.length;
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery ? (
          <SearchResultsHeader
            query={searchQuery}
            totalResults={totalCount}
            isLoading={isLoading}
          />
        ) : (
          <ProductPageHeader
            title={pageTitle}
            isPcBuildMode={isPcBuildMode}
            totalCount={totalCount}
          />
        )}
        
        <div className="flex gap-8">
          <ProductSidebar
            isPcBuildMode={isPcBuildMode}
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

          <main className="flex-1">
            <SearchFilters
              sortBy={sortBy}
              hasActiveFilters={hasActiveFilters}
              isPcBuildMode={isPcBuildMode}
              onSortChange={onSortChange}
              onClearFilters={onClearFilters}
            />

            <ProductList
              isPcBuildMode={isPcBuildMode}
              products={products}
              pcBuilds={pcBuilds}
              viewMode="grid"
              isLoading={isLoading}
              onLoadMore={onLoadMore}
            />
          </main>
        </div>
      </div>
    </div>
  );
}