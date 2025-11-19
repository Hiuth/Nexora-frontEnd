"use client";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Product, PcBuild } from "@/lib/types";

interface ProductListProps {
  isPcBuildMode: boolean;
  products: Product[];
  pcBuilds: PcBuild[];
  viewMode: 'grid' | 'list';
  isLoading: boolean;
  onLoadMore: () => void;
}

export function ProductList({
  isPcBuildMode,
  products,
  pcBuilds,
  viewMode,
  isLoading,
  onLoadMore,
}: ProductListProps) {
  const hasItems = isPcBuildMode ? pcBuilds.length > 0 : products.length > 0;

  if (!hasItems && !isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="space-y-4">
          <div className="text-6xl">📦</div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isPcBuildMode ? "Không tìm thấy cấu hình PC" : "Không tìm thấy sản phẩm"}
          </h3>
          <p className="text-gray-600">
            {isPcBuildMode 
              ? "Không có cấu hình PC nào phù hợp với bộ lọc của bạn."
              : "Không có sản phẩm nào phù hợp với bộ lọc của bạn."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Grid/List */}
      <div className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {isPcBuildMode
          ? pcBuilds.map((pcBuild) => (
              <ProductCard
                key={pcBuild.id}
                product={pcBuild}
                compact={viewMode === "list"}
                isPcBuild={true}
              />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                compact={viewMode === "list"}
                isPcBuild={false}
              />
            ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* Load More Button */}
      {hasItems && !isLoading && (
        <div className="flex justify-center py-6">
          <Button
            onClick={onLoadMore}
            variant="outline"
            size="lg"
            className="px-8 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tải...
              </>
            ) : (
              "Xem thêm sản phẩm"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}