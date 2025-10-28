"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface ProductsHeaderProps {
  sortBy: string;
  productsCount: number;
  onSortChange: (sort: string) => void;
  onToggleFilters: () => void;
}

export function ProductsHeader({
  sortBy,
  productsCount,
  onSortChange,
  onToggleFilters,
}: ProductsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 gap-4 flex-wrap bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="lg:hidden"
          onClick={onToggleFilters}
        >
          <Filter className="h-4 w-4 mr-2" />
          Bộ lọc
        </Button>

        <span className="text-sm text-gray-600 font-medium">
          Tìm thấy{" "}
          <span className="text-blue-600 font-bold">{productsCount}</span> sản
          phẩm
        </span>
      </div>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[200px] border border-gray-200">
          <SelectValue placeholder="Sắp xếp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest"> Mới nhất</SelectItem>
          <SelectItem value="price-asc"> Giá tăng dần</SelectItem>
          <SelectItem value="price-desc"> Giá giảm dần</SelectItem>
          <SelectItem value="name"> Tên A-Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
