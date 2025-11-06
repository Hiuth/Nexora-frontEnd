"use client";

import { useCategoryMenu } from "@/hooks/use-category-menu";
import { CategoryMenuButton } from "./category-menu/category-menu-button";
import { CategorySidebar } from "./category-menu/category-sidebar";
import { MenuContent } from "./category-menu/menu-content";
import { CategoryService } from "@/services/category.service";
import { SubCategoryService } from "@/services/subcategory.service";
import { useState, useEffect } from "react";
import { Category, SubCategory } from "@/lib/types";

export function CategoryMegaMenu() {
  const {
    hoveredCategory,
    isOpen,
    setHoveredCategory,
    handleMouseEnter,
    handleMouseLeave,
  } = useCategoryMenu();

  // local toggle for mobile (click) open
  const [openByClick, setOpenByClick] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(85);

  // State for API data
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySubCategories, setCategorySubCategories] = useState<
    SubCategory[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await CategoryService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Load subcategories when hoveredCategory changes
  useEffect(() => {
    const loadSubCategories = async () => {
      if (hoveredCategory && hoveredCategory !== "pc-builder") {
        try {
          const subCategoriesData =
            await SubCategoryService.getSubCategoriesByCategoryId(
              hoveredCategory
            );
          setCategorySubCategories(subCategoriesData);
        } catch (error) {
          console.error("Failed to load subcategories:", error);
          setCategorySubCategories([]);
        }
      } else {
        setCategorySubCategories([]);
      }
    };

    loadSubCategories();
  }, [hoveredCategory]);

  // close mobile open when viewport becomes large to avoid stuck state
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }

      if (window.innerWidth >= 1024) {
        setOpenByClick(false);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  const effectiveOpen = isOpen || openByClick;

  // Don't render until categories are loaded
  if (loading) {
    return (
      <div className="relative">
        <div className="block lg:hidden">
          <div className="p-2 bg-gray-200 rounded-lg animate-pulse h-9 w-9"></div>
        </div>
        <div className="hidden lg:block">
          <div className="bg-gray-200 rounded-lg animate-pulse h-14 w-[200px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* compact button for small screens, full button for large */}
      <div className="block lg:hidden">
        <CategoryMenuButton
          onClick={() => setOpenByClick((s) => !s)}
          compact
          isOpen={openByClick}
        />
      </div>
      <div className="hidden lg:block">
        <CategoryMenuButton onClick={() => setOpenByClick((s) => !s)} />
      </div>

      {/* Desktop hover panel */}
      {isOpen && (
        <div className="hidden lg:block absolute top-full left-0 pt-2 bg-transparent z-50 w-full">
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

      {/* Mobile click panel - Portal to body to avoid header overflow issues */}
      {openByClick && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setOpenByClick(false)}
          />

          {/* Panel positioned below header */}
          <div
            className="lg:hidden fixed left-0 right-0 z-50 bg-white shadow-xl border-t border-gray-200 overflow-y-auto"
            style={{
              top: `${headerHeight}px`,
              maxHeight: `calc(100vh - ${headerHeight}px)`,
            }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">Danh mục sản phẩm</div>
                <button
                  aria-label="Đóng danh mục"
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={() => setOpenByClick(false)}
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-full">
                  <CategorySidebar
                    categories={categories}
                    hoveredCategory={hoveredCategory}
                    onCategoryHover={setHoveredCategory}
                  />
                </div>
                {hoveredCategory && (
                  <div className="w-full border-t pt-4">
                    <MenuContent
                      hoveredCategory={hoveredCategory}
                      categories={categories}
                      categorySubCategories={categorySubCategories}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
