"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/lib/types";
import { ProductAttributes } from "./product-attributes";
import { ProductReviews } from "./product-reviews";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Card className="border-gray-200">
      <CardContent className="p-4 md:p-6">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="description" className="text-sm">
              Mô tả
            </TabsTrigger>
            <TabsTrigger value="specs" className="text-sm">
              Thông số
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-sm">
              Đánh giá
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">
              Mô tả sản phẩm
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {product.productName} là sản phẩm cao cấp từ thương hiệu{" "}
              <span className="font-semibold text-blue-600">
                {product.brandName}
              </span>
              , được thiết kế để mang lại hiệu suất tối ưu cho mọi nhu cầu sử
              dụng. Với công nghệ tiên tiến và chất lượng vượt trội, sản phẩm
              này là lựa chọn hoàn hảo cho những ai đang tìm kiếm giải pháp{" "}
              {product.categoryName} đáng tin cậy.
            </p>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">
              Thông số kỹ thuật
            </h3>

            {/* Thông số cơ bản */}
            <div className="mb-6">
              <div className="grid gap-3">
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Thương hiệu
                  </span>
                  <span className="text-gray-600">{product.brandName}</span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Danh mục
                  </span>
                  <span className="text-gray-600">{product.categoryName}</span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">Loại</span>
                  <span className="text-gray-600">
                    {product.subCategoryName}
                  </span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Tình trạng
                  </span>
                  <span
                    className={`text-gray-600 ${
                      product.stockQuantity > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.stockQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                  </span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Bảo hành
                  </span>
                  <span className="text-gray-600">
                    {product.warrantyPeriod || 36} tháng
                  </span>
                </div>
              </div>
            </div>

            {/* Thông số kỹ thuật chi tiết từ API */}
            <div>
              <ProductAttributes productId={product.id} />
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ProductReviews productId={product.id} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
