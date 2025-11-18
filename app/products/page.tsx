"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FilterSidebar } from "@/components/products/filter-sidebar";
import { ActiveFilters } from "@/components/products/active-filters";
import { ProductsHeader } from "@/components/products/products-header";
import { MobileFilters } from "@/components/products/mobile-filters";
import { ProductsGrid } from "@/components/products/products-grid";
import { ProductsAutoLoader } from "@/components/products/products-auto-loader";
import { useProductsInfinite } from "@/hooks/use-products-infinite";
import { products, categories, subCategories, brands } from "@/lib/mock-data";
import { BrandService } from "@/services/brand.service";
import { Brand } from "@/lib/types";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");
  const getAll = searchParams.get("getAll");

  // Use the infinite products hook
  const {
    products: infiniteProducts,
    loading,
    loadingMore,
    error,
    hasMore,
    totalItems,
    fetchProducts,
    loadMoreProducts,
    reset,
  } = useProductsInfinite();

  const [apiBrands, setApiBrands] = useState<Brand[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 100000000,
  ]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Load products from API when URL params change
  useEffect(() => {
    const loadProducts = async () => {
      if (categoryId || subCategoryId || getAll !== null) {
        const filters = {
          categoryId: categoryId || undefined,
          subCategoryId: subCategoryId || undefined,
        };
        await fetchProducts(filters);
      } else {
        reset();
      }
    };

    loadProducts();
  }, [categoryId, subCategoryId, getAll, fetchProducts, reset]);

  // Load brands from API
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

  // Generate page title based on query params
  const pageTitle = useMemo(() => {
    if (getAll !== null) {
      return "Tất cả sản phẩm";
    }
    if (subCategoryId && infiniteProducts.length > 0) {
      return infiniteProducts[0]?.subCategoryName || "Sản phẩm";
    }
    if (categoryId && infiniteProducts.length > 0) {
      return infiniteProducts[0]?.categoryName || "Sản phẩm";
    }
    return undefined;
  }, [getAll, subCategoryId, categoryId, infiniteProducts]);

  const maxPrice = 100000000;

  const filteredProducts = useMemo(() => {
    const sourceProducts = infiniteProducts.length > 0 ? infiniteProducts : products;
    let filtered = [...sourceProducts];

    // Remove duplicates by id
    const seen = new Set();
    filtered = filtered.filter(product => {
      if (seen.has(product.id)) {
        return false; // Skip duplicate
      }
      seen.add(product.id);
      return true;
    });



    // Filter by categories
    if (selectedCategories.length > 0) {
      const validSubCategoryIds = subCategories
        .filter((sub) => selectedCategories.includes(sub.categoryId))
        .map((sub) => sub.id);
      filtered = filtered.filter((p) =>
        validSubCategoryIds.includes(p.subCategoryId)
      );
    }

    // Filter by subcategories
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSubCategories.includes(p.subCategoryId)
      );
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brandId));
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return filtered;
  }, [
    infiniteProducts,
    selectedCategories,
    selectedSubCategories,
    selectedBrands,
    priceRange,
    sortBy,
  ]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
  };

  // Auto-loader should only be enabled for getAll parameter
  const isAutoLoaderEnabled = getAll !== null;

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice;

  // Handler functions
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubCategoryChange = (subCategoryId: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategoryId)
        ? prev.filter((id) => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
  };

  const handleRemoveBrand = (brandId: string) => {
    setSelectedBrands((prev) => prev.filter((id) => id !== brandId));
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <ActiveFilters
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            categories={categories}
            brands={apiBrands.length > 0 ? apiBrands : brands}
            onRemoveCategory={handleRemoveCategory}
            onRemoveBrand={handleRemoveBrand}
            onClearAll={clearFilters}
          />

          <div className="flex gap-8">
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
                onCategoryChange={handleCategoryChange}
                onSubCategoryChange={handleSubCategoryChange}
                onBrandChange={handleBrandChange}
                onPriceRangeChange={setPriceRange}
                onClearFilters={clearFilters}
              />
            </aside>

            <div className="flex-1">
              <ProductsHeader
                sortBy={sortBy}
                productsCount={filteredProducts.length}
                onSortChange={setSortBy}
                onToggleFilters={() => setShowFilters(!showFilters)}
                title={pageTitle}
              />

              <MobileFilters
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                brands={apiBrands.length > 0 ? apiBrands : brands}
                selectedBrands={selectedBrands}
                hasActiveFilters={hasActiveFilters}
                onBrandChange={handleBrandChange}
                onClearFilters={clearFilters}
              />

              <ProductsGrid
                loading={loading}
                products={filteredProducts}
                onClearFilters={clearFilters}
              />

              {isAutoLoaderEnabled && (
                <ProductsAutoLoader
                  loading={loadingMore}
                  hasMore={hasMore}
                  error={error}
                  onLoadMore={loadMoreProducts}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
