"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { FilterSidebar } from "@/components/products/filter-sidebar";
import { ActiveFilters } from "@/components/products/active-filters";
import { ProductsHeader } from "@/components/products/products-header";
import { EmptyProducts } from "@/components/products/empty-products";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { products, categories, subCategories, brands } from "@/lib/mock-data";

export default function ProductsPage() {
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

  const maxPrice = 100000000;

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

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

    // Sort
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
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return filtered;
  }, [
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          {/* Active Filters */}
          <ActiveFilters
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            categories={categories}
            brands={brands}
            onRemoveCategory={handleRemoveCategory}
            onRemoveBrand={handleRemoveBrand}
            onClearAll={clearFilters}
          />

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar
                categories={categories}
                subCategories={subCategories}
                brands={brands}
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

            {/* Products Section */}
            <div className="flex-1">
              {/* Products Header */}
              <ProductsHeader
                sortBy={sortBy}
                productsCount={filteredProducts.length}
                onSortChange={setSortBy}
                onToggleFilters={() => setShowFilters(!showFilters)}
              />

              {/* Mobile Filters */}
              {showFilters && (
                <Card className="lg:hidden mb-6 shadow-lg border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-lg">Bộ lọc</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilters(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold mb-2 block">
                          Danh mục
                        </Label>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`cat-mobile-${category.id}`}
                                checked={selectedCategories.includes(
                                  category.id
                                )}
                                onCheckedChange={() =>
                                  handleCategoryChange(category.id)
                                }
                              />
                              <label
                                htmlFor={`cat-mobile-${category.id}`}
                                className="text-sm cursor-pointer flex-1"
                              >
                                {category.categoryName}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      {hasActiveFilters && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearFilters}
                          className="w-full"
                        >
                          Xóa bộ lọc
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <EmptyProducts onClearFilters={clearFilters} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
