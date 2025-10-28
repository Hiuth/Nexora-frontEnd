"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchX, RotateCcw } from "lucide-react";

interface EmptyProductsProps {
  onClearFilters: () => void;
}

export function EmptyProducts({ onClearFilters }: EmptyProductsProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-16 text-center">
        <div className="mb-6">
          <SearchX className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-800">
          Không tìm thấy sản phẩm nào
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Có vẻ như không có sản phẩm nào phù hợp với bộ lọc hiện tại. Hãy thử
          điều chỉnh các tiêu chí tìm kiếm của bạn.
        </p>
        <Button
          onClick={onClearFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Xóa bộ lọc
        </Button>
      </CardContent>
    </Card>
  );
}
