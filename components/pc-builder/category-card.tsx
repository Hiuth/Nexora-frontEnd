"use client";

import React from "react";
import { Category, SubCategory } from "@/lib/types";
import { 
  Cpu, 
  Zap, 
  MemoryStick, 
  Monitor, 
  HardDrive, 
  Battery, 
  Box,
  Fan,
  Keyboard,
  Tv
} from "lucide-react";
import { SubCategoryItem } from "./subcategory-item";

interface CategoryCardProps {
  category: Category;
  subCategories: SubCategory[];
  onSubCategorySelect: (subCategory: SubCategory) => void;
  getSelectedProduct: (subCategoryId: string) => any;
  isSubCategoryDisabled: (subCategory: SubCategory) => boolean;
  removeProduct: (subCategoryId: string) => void;
}

function getIconForCategory(categoryId: number | string): React.ReactNode {
  const iconMap: { [key: string]: React.ReactNode } = {
    "1": <Cpu className="h-5 w-5" />,
    "2": <Zap className="h-5 w-5" />,
    "3": <MemoryStick className="h-5 w-5" />,
    "4": <Monitor className="h-5 w-5" />,
    "5": <HardDrive className="h-5 w-5" />,
    "6": <Battery className="h-5 w-5" />,
    "7": <Box className="h-5 w-5" />,
    "8": <Fan className="h-5 w-5" />,
    "9": <Keyboard className="h-5 w-5" />,
    "10": <Tv className="h-5 w-5" />,
  };
  
  return iconMap[categoryId.toString()] || <Box className="h-5 w-5" />;
}

export function CategoryCard({
  category,
  subCategories,
  onSubCategorySelect,
  getSelectedProduct,
  isSubCategoryDisabled,
  removeProduct,
}: CategoryCardProps) {
  if (subCategories.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
          {category.iconImg ? (
            <img 
              src={category.iconImg} 
              alt={category.categoryName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const iconDiv = target.parentElement?.querySelector('.fallback-icon');
                if (iconDiv) {
                  iconDiv.classList.remove('hidden');
                }
              }}
            />
          ) : null}
          <div className={`fallback-icon text-blue-600 ${category.iconImg ? 'hidden' : ''}`}>
            {getIconForCategory(category.id)}
          </div>
        </div>
        {category.categoryName}
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        {subCategories.map(subCategory => (
          <SubCategoryItem
            key={subCategory.id}
            subCategory={subCategory}
            selectedProduct={getSelectedProduct(subCategory.id)}
            isDisabled={isSubCategoryDisabled(subCategory)}
            onSelect={() => onSubCategorySelect(subCategory)}
            onRemove={() => removeProduct(subCategory.id)}
          />
        ))}
      </div>
    </div>
  );
}