"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import { categories, subCategories } from "@/lib/mock-data";

export function CategoryMegaMenu() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categorySubCategories = hoveredCategory
    ? subCategories.filter((sub) => sub.category_id === hoveredCategory)
    : [];

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredCategory(null);
    }, 200);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="text-sm font-medium transition-colors hover:text-primary hover:scale-105 flex items-center gap-2">
        <Menu className="h-4 w-4" />
        Danh mục sản phẩm
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 pt-1 bg-transparent z-50">
          <div className="bg-background border-2 border-border rounded-xl shadow-2xl overflow-hidden">
            <div className="flex">
              {/* Categories */}
              <div className="w-56 border-r-2 border-border bg-muted/30">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.id}`}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors ${
                      hoveredCategory === category.id ? "bg-primary/10" : ""
                    }`}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                  >
                    <span className="text-2xl">{category.iconImg}</span>
                    <span className="font-medium">{category.categoryName}</span>
                    <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </Link>
                ))}
              </div>

              {/* Subcategories */}
              {hoveredCategory && categorySubCategories.length > 0 && (
                <div className="w-64 p-4 bg-background">
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground">
                    {
                      categories.find((c) => c.id === hoveredCategory)
                        ?.categoryName
                    }
                  </h3>
                  <div className="space-y-1">
                    {categorySubCategories.map((subCategory) => (
                      <Link
                        key={subCategory.id}
                        href={`/products?subcategory=${subCategory.id}`}
                        className="block px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <div className="font-medium text-sm">
                          {subCategory.subcategoryName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {subCategory.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
