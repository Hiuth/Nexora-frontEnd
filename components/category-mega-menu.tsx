"use client";

import { useCategoryMenu } from "@/hooks/use-category-menu";
import { CategoryMenuButton } from "./category-menu/category-menu-button";
import { CategorySidebar } from "./category-menu/category-sidebar";
import { MenuContent } from "./category-menu/menu-content";
import { categories, subCategories } from "@/lib/mock-data";

export function CategoryMegaMenu() {
  const {
    hoveredCategory,
    isOpen,
    setHoveredCategory,
    handleMouseEnter,
    handleMouseLeave,
  } = useCategoryMenu();

  const categorySubCategories = hoveredCategory
    ? subCategories.filter((sub) => sub.categoryId === hoveredCategory)
    : [];

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CategoryMenuButton />

      {isOpen && (
        <div className="absolute top-full left-0 pt-2 bg-transparent z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden w-[1000px]">
            <div className="flex">
              <CategorySidebar
                categories={categories}
                hoveredCategory={hoveredCategory}
                onCategoryHover={setHoveredCategory}
              />

              <MenuContent
                hoveredCategory={hoveredCategory!}
                categories={categories}
                categorySubCategories={categorySubCategories}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
