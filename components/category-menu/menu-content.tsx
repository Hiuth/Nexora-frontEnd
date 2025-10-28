"use client";

import { MenuColumn } from "./menu-column";
import { ViewAllButton } from "./view-all-button";
import {
  MENU_COLUMNS,
  MENU_COLUMNS_2,
  MENU_COLUMNS_3,
  MENU_COLUMNS_4,
} from "@/data/menu-data";
import { Category, SubCategory } from "@/lib/types";

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
    return null;
  }

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Column 1 */}
        <MenuColumn menuItems={MENU_COLUMNS} />

        {/* Column 2 */}
        <MenuColumn menuItems={MENU_COLUMNS_2} />

        {/* Column 3 */}
        <MenuColumn menuItems={MENU_COLUMNS_3} />

        {/* Column 4 */}
        <MenuColumn menuItems={MENU_COLUMNS_4} />
      </div>

      {/* View All Button */}
      <ViewAllButton categoryId={hoveredCategory} categories={categories} />
    </div>
  );
}
