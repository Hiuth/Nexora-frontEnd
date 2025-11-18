"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PcBuild, PcBuildItem } from "@/lib/types";
import { formatPrice } from "@/lib/mock-data";
import { ProductReviews } from "./product-reviews";

interface PcBuildTabsProps {
  pcBuild: PcBuild;
  pcBuildItems: PcBuildItem[];
}

export function PcBuildTabs({ pcBuild, pcBuildItems }: PcBuildTabsProps) {
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
              Mô tả PC Build
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {pcBuild.description || "PC Build được cấu hình tối ưu cho gaming và làm việc chuyên nghiệp."}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {pcBuild.productName} là bộ máy tính được lắp ráp với các linh kiện chất lượng cao, 
              đảm bảo hiệu suất ổn định và độ bền lâu dài. Tất cả các linh kiện đều được chọn lọc 
              kỹ lưỡng để tương thích hoàn hảo với nhau.
            </p>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">
              Cấu hình chi tiết
            </h3>

            {/* Thông số cơ bản PC Build */}
            <div className="mb-6">
              <div className="grid gap-3">
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Tên cấu hình
                  </span>
                  <span className="text-gray-600">{pcBuild.productName}</span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Loại
                  </span>
                  <span className="text-gray-600">{pcBuild.subCategoryName}</span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Tình trạng
                  </span>
                  <span className="text-green-600">
                    {pcBuild.status || "Sẵn sàng"}
                  </span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Tổng giá trị
                  </span>
                  <span className="text-red-600 font-semibold">
                    {formatPrice(pcBuild.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Danh sách linh kiện */}
            <div>
              <h4 className="font-semibold text-md mb-4 text-gray-900">
                Linh kiện bao gồm ({pcBuildItems.length} sản phẩm)
              </h4>
              
              <div className="space-y-4">
                {pcBuildItems.map((item) => {
                  // Kiểm tra tình trạng tồn kho
                  const isOutOfStock = item.stockQuantity === 0;
                  
                  return (
                    <Link 
                      key={item.id} 
                      href={`/products/${item.productId}`}
                      className="block"
                    >
                      <div className={`flex items-center p-4 border rounded-lg transition-all ${
                        isOutOfStock 
                          ? 'border-red-200 bg-red-50/30' 
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm bg-gray-50 hover:bg-white'
                      }`}>
                        {/* Ảnh sản phẩm */}
                        <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.productName}
                            fill
                            className={`object-cover ${
                              isOutOfStock ? 'opacity-50 grayscale' : ''
                            }`}
                          />
                          {isOutOfStock && (
                            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                              <Badge variant="destructive" className="text-xs px-1 py-0">
                                Hết
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        {/* Thông tin sản phẩm */}
                        <div className="flex-1 ml-4">
                          <div className="flex items-start justify-between mb-1">
                            <h5 className={`font-medium text-sm ${
                              isOutOfStock 
                                ? 'text-red-600' 
                                : 'text-gray-900 hover:text-blue-600'
                            } transition-colors`}>
                              {item.productName}
                            </h5>
                            {isOutOfStock && (
                              <Badge variant="destructive" className="ml-2 text-xs">
                                Hết hàng
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500">
                                Số lượng: {item.quantity}
                              </span>
                              {isOutOfStock ? (
                                <span className="text-xs text-red-600 font-medium">
                                  Tình trạng: Hết hàng
                                </span>
                              ) : (
                                <span className="text-xs text-green-600 font-medium">
                                  Tình trạng: Còn hàng ({item.stockQuantity})
                                </span>
                              )}
                            </div>
                            <span className={`text-sm font-semibold ${
                              isOutOfStock ? 'text-gray-400' : 'text-red-600'
                            }`}>
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ProductReviews productId={pcBuild.id} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}