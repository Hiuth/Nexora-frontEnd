"use client";

import { SearchFilters } from "@/components/products/search-filters";
import { ProductList } from "@/components/products/product-list";
import { ProductSidebar } from "@/components/products/product-sidebar";
import { ProductPageHeader } from "@/components/products/product-page-header";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product, PcBuild } from "@/lib/types";

interface ProductContentAreaProps {
  isPcBuildMode: boolean;
  searchTerm: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
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
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onCategoryChange: (categoryId: string) => void;
  onSubCategoryChange: (subCategoryId: string) => void;
  onBrandChange: (brandId: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  onLoadMore: () => void;
}

export function ProductContentArea({
  isPcBuildMode,
  searchTerm,
  sortBy,
  viewMode,
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
  onSearchChange,
  onSortChange,
  onViewModeChange,
  onCategoryChange,
  onSubCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onClearFilters,
  onLoadMore,
}: ProductContentAreaProps) {
  const isMobile = useIsMobile();
  const totalCount = isPcBuildMode ? pcBuilds.length : products.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductPageHeader
          title={pageTitle}
          isPcBuildMode={isPcBuildMode}
          totalCount={totalCount}
        />
        
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
              searchTerm={searchTerm}
              sortBy={sortBy}
              viewMode={viewMode}
              hasActiveFilters={hasActiveFilters}
              isPcBuildMode={isPcBuildMode}
              onSearchChange={onSearchChange}
              onSortChange={onSortChange}
              onViewModeChange={onViewModeChange}
              onClearFilters={onClearFilters}
            />

            <ProductList
              isPcBuildMode={isPcBuildMode}
              products={products}
              pcBuilds={pcBuilds}
              viewMode={viewMode}
              isLoading={isLoading}
              onLoadMore={onLoadMore}
            />
          </main>
        </div>
      </div>
    </div>
  );
}