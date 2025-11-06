"use client";

import { ViewAllButton } from "./view-all-button";
import { Category, SubCategory } from "@/lib/types";
import Link from "next/link";

interface MenuContentProps {
  hoveredCategory: string;
  categories: Category[];
  categorySubCategories: SubCategory[];
}

export function MenuContent({
  hoveredCategory,
  categories,
  categorySubCategories,
}: MenuContentProps) {
  if (!hoveredCategory) {
    return null;
  }

  // Special content for PC Builder
  if (hoveredCategory === "pc-builder") {
    return (
      <div className="flex-1 p-6 bg-white">
        <div className="text-center">
          <div className="mb-6">
            <img
              src="/icon-buildPc.png"
              alt="PC Builder"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Xây dựng cấu hình PC
            </h3>
            <p className="text-gray-600 mb-6">
              Tạo cấu hình PC hoàn hảo với công cụ tương thích thông minh của
              chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                ✨ Tương thích hoàn hảo
              </h4>
              <p className="text-sm text-blue-600">
                Kiểm tra tương thích giữa các linh kiện
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                💰 Tối ưu giá cả
              </h4>
              <p className="text-sm text-green-600">
                Gợi ý cấu hình phù hợp với ngân sách
              </p>
            </div>
          </div>

          <a
            href="/pc-builder"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            🛠️ Bắt đầu xây dựng
          </a>
        </div>
      </div>
    );
  }

  // Regular category content
  if (categorySubCategories.length === 0) {
    return (
      <div className="flex-1 p-6 bg-white">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Không có danh mục con
          </h3>
          <p className="text-gray-600">
            Danh mục này hiện tại chưa có danh mục con nào.
          </p>
        </div>
        {/* View All Button */}
        <ViewAllButton categoryId={hoveredCategory} categories={categories} />
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh mục con</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {categorySubCategories.map((subCategory) => (
          <Link
            key={subCategory.id}
            href={`/products?subcategory=${subCategory.id}`}
            className="group p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              {/* Enhanced image display area */}
              <div className="w-20 h-20 mb-3 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center overflow-hidden">
                {subCategory.subCategoryImg ? (
                  <img
                    src={subCategory.subCategoryImg}
                    alt={subCategory.subCategoryName}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl text-gray-400">📦</span>
                  </div>
                )}
              </div>

              <h4 className="font-medium text-sm text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {subCategory.subCategoryName}
              </h4>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <ViewAllButton categoryId={hoveredCategory} categories={categories} />
    </div>
  );
}
