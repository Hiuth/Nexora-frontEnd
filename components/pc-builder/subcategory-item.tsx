"use client";

import React from "react";
import { SubCategory } from "@/lib/types";
import { QuantityControls } from "./quantity-controls";
import { Box } from "lucide-react";

interface SubCategoryItemProps {
  subCategory: SubCategory;
  selectedProduct: any;
  isDisabled: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price);
}

export function SubCategoryItem({
  subCategory,
  selectedProduct,
  isDisabled,
  onSelect,
  onRemove,
}: SubCategoryItemProps) {
  return (
    <div 
      className={`
        rounded-lg p-4 transition-all shadow-sm hover:shadow-md
        ${isDisabled 
          ? "bg-red-50 cursor-not-allowed opacity-70" 
          : "bg-white hover:bg-blue-50 cursor-pointer"
        }
      `}
      onClick={() => {
        if (!isDisabled) {
          onSelect();
        }
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{subCategory.subCategoryName}</h3>
          {isDisabled && (
            <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
              Không tương thích
            </span>
          )}
        </div>
        {selectedProduct ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Xóa
          </button>
        ) : (
          <span className="text-sm text-gray-500">Chưa chọn</span>
        )}
      </div>
      
      {selectedProduct ? (
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            {/* Product Image */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              {selectedProduct.thumbnail ? (
                <img 
                  src={selectedProduct.thumbnail} 
                  alt={selectedProduct.productName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-product.png';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Box className="h-6 w-6" />
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                {selectedProduct.productName}
              </p>
              <p className="text-sm font-semibold text-blue-600 mb-2">
                {formatPrice(selectedProduct.price)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          {isDisabled ? (
            <div className="text-red-600 text-sm">
              <p>Không tương thích với CPU đã chọn</p>
              <p className="text-xs mt-1">Vui lòng chọn bo mạch chủ cùng brand với CPU</p>
            </div>
          ) : (
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              + Chọn {subCategory.subCategoryName}
            </button>
          )}
        </div>
      )}
    </div>
  );
}