"use client";

import { useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import { EmptyProducts } from "@/components/products/empty-products";
import type { Product, PcBuild } from "@/lib/types";

interface ProductsGridProps {
  loading: boolean;
  products: (Product | PcBuild)[];
  onClearFilters: () => void;
  isPcBuildMode?: boolean; // Add flag to detect PC Build mode
}

export function ProductsGrid({
  loading,
  products,
  onClearFilters,
  isPcBuildMode = false,
}: ProductsGridProps) {
  // Deduplicate products by ID to prevent React key warnings
  const uniqueProducts = useMemo(() => {
    const seen = new Set<string>();
    return products.filter(product => {
      if (seen.has(product.id)) {
        return false;
      }
      seen.add(product.id);
      return true;
    });
  }, [products]);
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (uniqueProducts.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {uniqueProducts.map((product) => {
          try {
            return <ProductCard key={product.id} product={product} isPcBuild={isPcBuildMode} />;
          } catch (error) {
            console.error("Error rendering ProductCard:", error, product);
            return (
              <div key={product.id} className="p-4 border border-red-300 bg-red-50 text-red-700">
                Error rendering product: {product.productName}
              </div>
            );
          }
        })}
      </div>
    );
  }

  return <EmptyProducts onClearFilters={onClearFilters} />;
}
