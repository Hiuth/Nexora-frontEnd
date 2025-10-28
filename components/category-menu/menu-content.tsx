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
  if (!hoveredCategory || categorySubCategories.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="grid grid-cols-4 gap-6">
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
