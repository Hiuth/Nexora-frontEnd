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
      <div className="flex-1 flex flex-col max-h-[80vh] bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
        <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
          <div className="text-center max-w-2xl mx-auto">
            {/* Enhanced PC Builder icon section */}
            <div className="mb-8">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center">
                  <img
                    src="/icon-buildPc.png"
                    alt="PC Builder"
                    className="w-12 h-12 filter brightness-0 invert"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-100 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-200 rounded-full animate-pulse delay-75"></div>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">
                Xây dựng cấu hình PC
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8 max-w-md mx-auto">
                Tạo cấu hình PC hoàn hảo với công cụ tương thích thông minh của
                chúng tôi
              </p>
            </div>

            {/* Enhanced feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="relative p-6 bg-white rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">✨</span>
                </div>
                <h4 className="font-bold text-slate-800 mb-2 text-left">
                  Tương thích hoàn hảo
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed text-left">
                  Kiểm tra tương thích giữa các linh kiện một cách thông minh
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>

              <div className="relative p-6 bg-white rounded-xl border border-green-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">💰</span>
                </div>
                <h4 className="font-bold text-slate-800 mb-2 text-left">
                  Tối ưu giá cả
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed text-left">
                  Gợi ý cấu hình phù hợp với ngân sách của bạn
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>

            {/* Enhanced CTA button */}
            <a
              href="/pc-builder"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-semibold group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                🛠️
              </span>
              <span>Bắt đầu xây dựng</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Regular category content
  if (categorySubCategories.length === 0) {
    return (
      <div className="flex-1 flex flex-col max-h-[80vh] bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
        <div className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
          <div className="text-center py-16">
            {/* Enhanced empty state icon */}
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/30 rounded-2xl flex items-center justify-center shadow-sm">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <span className="text-2xl">📂</span>
                </div>
              </div>
              {/* Subtle decoration */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">
              Chưa có danh mục con
            </h3>
            <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
              Danh mục này hiện tại chưa có danh mục con nào. Vui lòng quay lại
              sau hoặc khám phá các danh mục khác.
            </p>
          </div>

          {/* Enhanced View All Button container */}
          <div className="pt-6 border-t border-slate-200/60">
            <ViewAllButton
              categoryId={hoveredCategory}
              categories={categories}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-h-[80vh] bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
      {/* Enhanced header section - Fixed */}
      <div className="flex-shrink-0 p-8 pb-4">
        <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">
          Danh mục sản phẩm
        </h3>
        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 px-8 pb-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
        {/* Improved grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {categorySubCategories.map((subCategory) => (
            <Link
              key={subCategory.id}
              href={`/products?subcategory=${subCategory.id}`}
              className="group relative overflow-hidden bg-white rounded-xl border border-slate-200/60 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 ease-out"
            >
              <div className="p-4">
                {/* Enhanced image container with subtle effects */}
                <div className="relative w-full h-28 mb-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden">
                  {subCategory.subCategoryImg ? (
                    <img
                      src={subCategory.subCategoryImg}
                      alt={subCategory.subCategoryName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/30 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <span className="text-2xl text-slate-400">📦</span>
                      </div>
                    </div>
                  )}

                  {/* Subtle overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Enhanced typography */}
                <h4 className="font-medium text-xs text-slate-700 group-hover:text-blue-600 transition-colors duration-200 leading-relaxed line-clamp-2 min-h-[1.75rem] flex items-center">
                  {subCategory.subCategoryName}
                </h4>
              </div>

              {/* Subtle hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          ))}
        </div>

        {/* Enhanced View All Button container */}
        <div className="pt-4 border-t border-slate-200/60">
          <ViewAllButton categoryId={hoveredCategory} categories={categories} />
        </div>
      </div>
    </div>
  );
}
