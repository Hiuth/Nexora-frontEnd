"use client";

import React from "react";
import { Category, SubCategory } from "@/lib/types";
import { CategoryCard } from "./category-card";

interface CategoriesListProps {
  categories: Category[];
  getCategorySubCategories: (categoryId: string) => SubCategory[];
  onSubCategorySelect: (subCategory: SubCategory) => void;
  getSelectedProduct: (subCategoryId: string) => any;
  isSubCategoryDisabled: (subCategory: SubCategory) => boolean;
  removeProduct: (subCategoryId: string) => void;
}

export function CategoriesList({
  categories,
  getCategorySubCategories,
  onSubCategorySelect,
  getSelectedProduct,
  isSubCategoryDisabled,
  removeProduct,
}: CategoriesListProps) {
  return (
    <div className="space-y-6">
      {categories.map(category => (
        <CategoryCard
          key={category.id}
          category={category}
          subCategories={getCategorySubCategories(category.id)}
          onSubCategorySelect={onSubCategorySelect}
          getSelectedProduct={getSelectedProduct}
          isSubCategoryDisabled={isSubCategoryDisabled}
          removeProduct={removeProduct}
        />
      ))}
    </div>
  );
}