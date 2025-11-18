"use client";

import { formatPrice } from "@/lib/mock-data";

interface PcBuildFilterSidebarProps {
  priceRange: [number, number];
  maxPrice: number;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}

export function PcBuildFilterSidebar({
  priceRange,
  maxPrice,
  onPriceRangeChange,
  onClearFilters,
}: PcBuildFilterSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Bộ lọc máy bộ</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Xóa bộ lọc
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Khoảng giá
          </label>
          <div className="space-y-3">
            {/* Price Range Slider */}
            <div className="relative">
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            {/* Price Display */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
            
            {/* Price Input Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Từ</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Đến</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={maxPrice.toString()}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Phân loại hiệu năng
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Gaming cơ bản</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Gaming cao cấp</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Workstation</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-700">Server</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}