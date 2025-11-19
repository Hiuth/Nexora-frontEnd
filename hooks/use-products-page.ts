"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useProductsInfinite } from "@/hooks/use-products-infinite";
import { usePcBuildsInfinite } from "@/hooks/use-pc-builds";
import { BrandService } from "@/services/brand.service";
import { products, categories, subCategories, brands } from "@/lib/mock-data";
import { Brand, Product, PcBuild } from "@/lib/types";

export function useProductsPageLogic() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId") || searchParams.get("SubCategoryId");
  const getAll = searchParams.get("getAll");
  const pcBuild = searchParams.get("pcBuild");
  
  // Determine if this is PC Build mode
  const isPcBuildMode = pcBuild === "true";

  // Use the appropriate infinite hook
  const productsHook = useProductsInfinite();
  
  const pcBuildsHook = usePcBuildsInfinite({
    getAll: getAll !== null ? true : undefined,
    categoryId: categoryId || undefined,
    subCategoryId: subCategoryId || undefined,
    enabled: isPcBuildMode,
  });
  
  // Select the appropriate hook based on mode
  const {
    products: infiniteProducts = [],
    loading,
    loadingMore,
    error,
    hasMore,
    totalItems = 0,
    fetchProducts,
    loadMoreProducts,
    reset,
  } = !isPcBuildMode ? productsHook : {
    products: pcBuildsHook.pcBuilds,
    loading: pcBuildsHook.loading,
    loadingMore: pcBuildsHook.loadingMore,
    error: pcBuildsHook.error,
    hasMore: pcBuildsHook.hasMore,
    totalItems: 0,
    fetchProducts: () => Promise.resolve(),
    loadMoreProducts: pcBuildsHook.loadMorePcBuilds,
    reset: () => {},
  };

  // State
  const [apiBrands, setApiBrands] = useState<Brand[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000000]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

    if (!isPcBuildMode) {
      loadProducts();
    }
  }, [categoryId, subCategoryId, getAll, fetchProducts, reset, isPcBuildMode]);

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
    if (isPcBuildMode) {
      if (getAll !== null) {
        return "Tất cả máy bộ Nexora";
      }
      if (subCategoryId && infiniteProducts.length > 0) {
        return infiniteProducts[0]?.subCategoryName || "Máy bộ Nexora";
      }
      if (categoryId && infiniteProducts.length > 0) {
        const firstItem = infiniteProducts[0] as any;
        return firstItem?.categoryName || "Máy bộ Nexora";
      }
      return "Máy bộ Nexora";
    } else {
      if (getAll !== null) {
        return "Tất cả sản phẩm";
      }
      if (subCategoryId && infiniteProducts.length > 0) {
        return infiniteProducts[0]?.subCategoryName || "Sản phẩm";
      }
      if (categoryId && infiniteProducts.length > 0) {
        const firstItem = infiniteProducts[0] as any;
        return firstItem?.categoryName || "Sản phẩm";
      }
      return undefined;
    }
  }, [isPcBuildMode, getAll, subCategoryId, categoryId, infiniteProducts]);

  const maxPrice = 2000000000;

  const filteredProducts = useMemo(() => {
    const sourceProducts = infiniteProducts.length > 0 ? infiniteProducts : products;
    let filtered = [...sourceProducts];

    // Remove duplicates by id
    const seen = new Set();
    filtered = filtered.filter(product => {
      if (seen.has(product.id)) {
        return false;
      }
      seen.add(product.id);
      return true;
    });

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.productName.toLowerCase().includes(searchLower)
      );
    }

    // Filter by categories (only for regular products, not PC builds)
    if (!isPcBuildMode && selectedCategories.length > 0) {
      const validSubCategoryIds = subCategories
        .filter((sub) => selectedCategories.includes(sub.categoryId))
        .map((sub) => sub.id);
      filtered = filtered.filter((p) =>
        validSubCategoryIds.includes(p.subCategoryId)
      );
    }

    // Filter by subcategories (only for regular products, not PC builds)
    if (!isPcBuildMode && selectedSubCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSubCategories.includes(p.subCategoryId)
      );
    }

    // Filter by brands (only for regular products, not PC builds)
    if (!isPcBuildMode && selectedBrands.length > 0) {
      filtered = filtered.filter((p) => (p as any).brandId && selectedBrands.includes((p as any).brandId));
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
      case "name-asc":
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "newest":
        filtered.sort((a, b) => {
          const aDate = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0;
          const bDate = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0;
          return bDate - aDate;
        });
        break;
      case "oldest":
        filtered.sort((a, b) => {
          const aDate = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0;
          const bDate = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0;
          return aDate - bDate;
        });
        break;
    }

    return filtered;
  }, [
    infiniteProducts,
    searchTerm,
    selectedCategories,
    selectedSubCategories,
    selectedBrands,
    priceRange,
    sortBy,
    isPcBuildMode,
  ]);

  const hasActiveFilters = 
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    searchTerm.trim() !== '';

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
    setSearchTerm("");
  };

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

  return {
    // Data
    isPcBuildMode,
    pageTitle,
    products: isPcBuildMode ? [] : filteredProducts as Product[],
    pcBuilds: isPcBuildMode ? filteredProducts as PcBuild[] : [],
    brands: apiBrands.length > 0 ? apiBrands : brands,
    isLoading: loading,
    isLoadingMore: loadingMore,
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
  };
}