"use client";

import { FeaturedProductsCarousel } from "@/components/featured-products-carousel";
import type { Category, Product } from "@/lib/types";

export function CategorySections({
  items,
}: {
  items: Array<{ category: Category; products: Product[] }>;
}) {
  const visible = items.filter((i) => i.products.length > 0).slice(0, 3);

  if (visible.length === 0) {
    return (
      <div className="w-full">
        <div className="text-center p-6 sm:p-8 md:p-10 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-800 mb-2">
            Dữ liệu chưa có
          </h3>
          <p className="text-yellow-700 text-sm sm:text-base">
            Hiện tại chưa có sản phẩm nào để hiển thị. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {visible.map(({ category, products }) => (
        <div key={category.id} className="mb-8 sm:mb-12 md:mb-16 last:mb-0">
          <FeaturedProductsCarousel
            title={category.categoryName}
            products={products.slice(0, 5)}
            categoryIcon={category.iconImg}
            categoryId={category.id}
          />
        </div>
      ))}
    </>
  );
}
