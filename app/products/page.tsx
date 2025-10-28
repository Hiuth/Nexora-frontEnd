"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { FeaturedProductsSidebar } from "@/components/featured-products-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Grid3x3, List } from "lucide-react";
import {
  products,
  categories,
  subCategories,
  brands,
  formatPrice,
} from "@/lib/mock-data";

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const maxPrice = 50000000;

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by categories
    if (selectedCategories.length > 0) {
      const validSubCategoryIds = subCategories
        .filter((sub) => selectedCategories.includes(sub.category_id))
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
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand_id));
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
        filtered.sort((a, b) => a.product_Name.localeCompare(b.product_Name));
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-accent/10">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Active filters display */}
          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">
                Bộ lọc đang áp dụng:
              </span>
              {selectedCategories.map((catId) => {
                const cat = categories.find((c) => c.id === catId);
                return (
                  <Badge
                    key={catId}
                    variant="secondary"
                    className="gap-1 bg-primary/10 text-primary border-primary/20"
                  >
                    {cat?.categoryName}
                    <button
                      onClick={() =>
                        setSelectedCategories((prev) =>
                          prev.filter((id) => id !== catId)
                        )
                      }
                      className="ml-1 hover:text-primary/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
              {selectedBrands.map((brandId) => {
                const brand = brands.find((b) => b.brand_id === brandId);
                return (
                  <Badge
                    key={brandId}
                    variant="secondary"
                    className="gap-1 bg-chart-2/10 text-chart-2 border-chart-2/20"
                  >
                    {brand?.brand_Name}
                    <button
                      onClick={() =>
                        setSelectedBrands((prev) =>
                          prev.filter((id) => id !== brandId)
                        )
                      }
                      className="ml-1 hover:text-chart-2/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 text-xs"
              >
                Xóa tất cả
              </Button>
            </div>
          )}

          <div className="flex gap-8">
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <Card className="sticky top-20 border-2 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-xl bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                      Bộ lọc
                    </h2>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Xóa
                      </Button>
                    )}
                  </div>

                  {/* Categories with colorful badges */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-chart-2/5 border border-primary/20">
                    <Label className="text-sm font-bold mb-3 block text-primary">
                      📦 Danh mục
                    </Label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50 transition-colors"
                        >
                          <Checkbox
                            id={`cat-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() =>
                              setSelectedCategories((prev) =>
                                prev.includes(category.id)
                                  ? prev.filter((id) => id !== category.id)
                                  : [...prev, category.id]
                              )
                            }
                            className="border-primary data-[state=checked]:bg-primary"
                          />
                          <label
                            htmlFor={`cat-${category.id}`}
                            className="text-sm cursor-pointer flex-1 font-medium"
                          >
                            {category.categoryName}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subcategories */}
                  {selectedCategories.length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-chart-2/5 to-chart-1/5 border border-chart-2/20">
                      <Label className="text-sm font-bold mb-3 block text-chart-2">
                        🏷️ Loại sản phẩm
                      </Label>
                      <div className="space-y-2">
                        {subCategories
                          .filter((sub) =>
                            selectedCategories.includes(sub.category_id)
                          )
                          .map((subCategory) => (
                            <div
                              key={subCategory.id}
                              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50 transition-colors"
                            >
                              <Checkbox
                                id={`sub-${subCategory.id}`}
                                checked={selectedSubCategories.includes(
                                  subCategory.id
                                )}
                                onCheckedChange={() =>
                                  setSelectedSubCategories((prev) =>
                                    prev.includes(subCategory.id)
                                      ? prev.filter(
                                          (id) => id !== subCategory.id
                                        )
                                      : [...prev, subCategory.id]
                                  )
                                }
                                className="border-chart-2 data-[state=checked]:bg-chart-2"
                              />
                              <label
                                htmlFor={`sub-${subCategory.id}`}
                                className="text-sm cursor-pointer flex-1 font-medium"
                              >
                                {subCategory.subcategoryName}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Brands */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-chart-4/5 to-chart-3/5 border border-chart-4/20">
                    <Label className="text-sm font-bold mb-3 block text-chart-4">
                      ⭐ Thương hiệu
                    </Label>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <div
                          key={brand.brand_id}
                          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50 transition-colors"
                        >
                          <Checkbox
                            id={`brand-${brand.brand_id}`}
                            checked={selectedBrands.includes(brand.brand_id)}
                            onCheckedChange={() =>
                              setSelectedBrands((prev) =>
                                prev.includes(brand.brand_id)
                                  ? prev.filter((id) => id !== brand.brand_id)
                                  : [...prev, brand.brand_id]
                              )
                            }
                            className="border-chart-4 data-[state=checked]:bg-chart-4"
                          />
                          <label
                            htmlFor={`brand-${brand.brand_id}`}
                            className="text-sm cursor-pointer flex-1 font-medium"
                          >
                            {brand.brand_Name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-chart-1/5 to-chart-3/5 border border-chart-1/20">
                    <Label className="text-sm font-bold mb-3 block text-chart-1">
                      💰 Khoảng giá
                    </Label>
                    <Slider
                      min={0}
                      max={maxPrice}
                      step={1000000}
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span className="text-chart-1">
                        {formatPrice(priceRange[0])}
                      </span>
                      <span className="text-chart-1">
                        {formatPrice(priceRange[1])}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Featured Products Sidebar */}
              <FeaturedProductsSidebar />

              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="lg:hidden bg-transparent"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Bộ lọc
                  </Button>

                  <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 w-8 p-0"
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px] border-2">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">🆕 Mới nhất</SelectItem>
                    <SelectItem value="price-asc">💵 Giá tăng dần</SelectItem>
                    <SelectItem value="price-desc">💰 Giá giảm dần</SelectItem>
                    <SelectItem value="name">🔤 Tên A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <Card className="lg:hidden mb-6 border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold">Bộ lọc</h2>
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
                                  setSelectedCategories((prev) =>
                                    prev.includes(category.id)
                                      ? prev.filter((id) => id !== category.id)
                                      : [...prev, category.id]
                                  )
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
                          className="w-full bg-transparent"
                        >
                          Xóa bộ lọc
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
                      : "space-y-4"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} compact />
                  ))}
                </div>
              ) : (
                <Card className="border-2">
                  <CardContent className="p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold mb-2">
                      Không tìm thấy sản phẩm nào
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thử điều chỉnh bộ lọc hoặc tìm kiếm khác
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="bg-gradient-to-r from-primary to-chart-2"
                    >
                      Xóa bộ lọc
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
