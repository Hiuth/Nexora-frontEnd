"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import type { Product, SubCategory as ISubCategory } from "@/lib/types";
import Image from "next/image";

interface ProductSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: number | null;
  categoryName: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSubCategory: string;
  onSubCategoryChange: (subCategory: string) => void;
  availableSubCategories: ISubCategory[];
  availableProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export function ProductSelectionDialog({
  isOpen,
  onClose,
  selectedCategory,
  categoryName,
  searchQuery,
  onSearchChange,
  selectedSubCategory,
  onSubCategoryChange,
  availableSubCategories,
  availableProducts,
  onSelectProduct,
}: ProductSelectionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 bg-white border border-gray-200 shadow-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-4 sm:mx-auto">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
          <DialogTitle className="text-lg sm:text-xl">
            Chọn {categoryName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-6 flex-shrink-0 border-b border-gray-100 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
          {availableSubCategories.length > 0 && (
            <Select
              value={selectedSubCategory}
              onValueChange={onSubCategoryChange}
            >
              <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white w-full">
                <SelectValue placeholder="Chọn danh mục con" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-xl z-[60]">
                <SelectItem value="all">Tất cả danh mục con</SelectItem>
                {availableSubCategories.map((subCat) => (
                  <SelectItem key={subCat.id} value={subCat.id.toString()}>
                    {subCat.subCategoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <ScrollArea className="flex-1 px-4 sm:px-6 py-4 sm:py-6">
          <div className="space-y-3 pr-2 sm:pr-4">
            {availableProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-200 overflow-hidden bg-white border border-gray-200"
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.thumbnail || "/placeholder.svg"}
                        alt={product.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2 text-gray-800">
                        {product.productName}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-bold text-blue-600 whitespace-nowrap">
                          {formatPrice(product.price)}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => onSelectProduct(product)}
                          disabled={product.stockQuantity === 0}
                          className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {product.stockQuantity === 0 ? "Hết hàng" : "Chọn"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {availableProducts.length === 0 && (
              <div className="text-center py-8 sm:py-12 text-gray-500">
                <div className="text-base sm:text-lg font-medium mb-2">
                  {searchQuery || selectedSubCategory !== "all"
                    ? "Không tìm thấy sản phẩm phù hợp"
                    : "Không có sản phẩm nào trong danh mục này"}
                </div>
                <p className="text-sm text-gray-400">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
