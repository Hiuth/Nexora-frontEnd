"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductContentArea } from "@/components/products/product-content-area";
import { useProductsPageLogic } from "@/hooks/use-products-page";

export default function ProductsPage() {
  const {
    // Data
    isPcBuildMode,
    pageTitle,
    products,
    pcBuilds,
    brands,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    
    // State
    searchTerm,
    sortBy,
    viewMode,
    selectedCategories,
    selectedSubCategories,
    selectedBrands,
    priceRange,
    maxPrice,
    hasActiveFilters,
    
    // Handlers
    setSearchTerm,
    setSortBy,
    setViewMode,
    handleCategoryChange,
    handleSubCategoryChange,
    handleBrandChange,
    setPriceRange,
    clearFilters,
    loadMoreProducts,
  } = useProductsPageLogic();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <ProductContentArea
        isPcBuildMode={isPcBuildMode}
        sortBy={sortBy}
        products={products}
        pcBuilds={pcBuilds}
        isLoading={isLoading}
        hasActiveFilters={hasActiveFilters}
        pageTitle={pageTitle}
        
        selectedCategories={selectedCategories}
        selectedSubCategories={selectedSubCategories}
        selectedBrands={selectedBrands}
        priceRange={priceRange}
        maxPrice={maxPrice}
        
        onSortChange={setSortBy}
        onCategoryChange={handleCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
        onBrandChange={handleBrandChange}
        onPriceRangeChange={setPriceRange}
        onClearFilters={clearFilters}
        onLoadMore={loadMoreProducts}
      />

      <Footer />
    </div>
  );
}
