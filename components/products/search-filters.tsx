"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface SearchFiltersProps {
  sortBy: string;
  hasActiveFilters: boolean;
  isPcBuildMode: boolean;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

export function SearchFilters({
  sortBy,
  hasActiveFilters,
  isPcBuildMode,
  onSortChange,
  onClearFilters,
}: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col space-y-4">
        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 gap-4">
          {/* Left side - Sort */}
          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Tên A-Z</SelectItem>
                <SelectItem value="name-desc">Tên Z-A</SelectItem>
                <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
                <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Xóa lọc
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <span className="text-sm font-medium text-gray-600">Bộ lọc đang áp dụng:</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              Đã lọc
              <X 
                className="h-3 w-3 cursor-pointer hover:text-red-500" 
                onClick={onClearFilters}
              />
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}