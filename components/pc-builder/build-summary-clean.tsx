"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  AlertTriangle,
  CheckCircle2,
  Download,
  Share2,
} from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

interface BuildComponent {
  category: string;
  categoryId: number;
  icon: React.ReactNode;
  product: Product | null;
  quantity: number;
  required: boolean;
  categoryType: string;
}

interface BuildSummaryProps {
  buildComponents: BuildComponent[];
  totalPrice: number;
  isComplete: boolean;
  onClearBuild: () => void;
}

export function BuildSummary({
  buildComponents,
  totalPrice,
  isComplete,
  onClearBuild,
}: BuildSummaryProps) {
  const selectedComponents = buildComponents.filter((c) => c.product);
  const requiredComponents = buildComponents.filter((c) => c.required);
  const completedRequired = requiredComponents.filter((c) => c.product).length;
  const completionPercentage = Math.round(
    (completedRequired / requiredComponents.length) * 100
  );

  // Calculate stats by category
  const totalComponents = buildComponents.filter((c) => c.product).length;

  // Estimate power consumption (simplified)
  const estimatedPower = selectedComponents.reduce((power, comp) => {
    if (comp.categoryType === "core") {
      switch (comp.category) {
        case "CPU":
          return power + 65;
        case "GPU":
          return power + 250;
        case "RAM":
          return power + 5 * comp.quantity;
        default:
          return power + 15;
      }
    }
    return power + 5;
  }, 50);

  return (
    <div className="space-y-6">
      {/* Main Summary Card */}
      <Card className="sticky top-20 shadow-lg border-0">
        <CardHeader className="bg-gray-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Tổng quan
            </CardTitle>
            <Badge
              variant="secondary"
              className="px-3 bg-white text-gray-700 shadow-sm"
            >
              {completionPercentage}% hoàn thành
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-2 mt-2" />
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center shadow-sm border border-blue-100">
              <div className="text-2xl font-bold text-blue-700">
                {totalComponents}
              </div>
              <div className="text-xs text-blue-600 font-medium">Linh kiện</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center shadow-sm border border-green-100">
              <div className="text-2xl font-bold text-green-700">
                {completedRequired}/{requiredComponents.length}
              </div>
              <div className="text-xs text-green-600 font-medium">Bắt buộc</div>
            </div>
          </div>

          {/* Compatibility Check */}
          {isComplete ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-sm text-green-700">
                🎉 Cấu hình hoàn chỉnh và tương thích!
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-sm text-amber-700">
                Còn {requiredComponents.length - completedRequired} linh kiện
                bắt buộc cần chọn
              </AlertDescription>
            </Alert>
          )}

          {/* Price Breakdown */}
          {selectedComponents.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-gray-800">
                Chi tiết giá
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {buildComponents
                  .filter((c) => c.product)
                  .map((component) => (
                    <div
                      key={component.categoryId}
                      className="flex justify-between items-center text-sm bg-slate-50 rounded-lg p-2 shadow-sm border border-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        {component.icon}
                        <span className="font-medium text-gray-700">
                          {component.category}
                          {component.quantity > 1 && (
                            <Badge
                              variant="secondary"
                              className="ml-1 text-xs bg-gray-200 text-gray-600"
                            >
                              x{component.quantity}
                            </Badge>
                          )}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-800">
                        {formatPrice(
                          component.product!.price * component.quantity
                        )}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="bg-amber-50 rounded-xl p-4 shadow-md border border-amber-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-amber-600 text-sm font-medium">Tổng cộng</p>
                <p className="text-2xl font-bold text-amber-800">
                  {formatPrice(totalPrice)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-amber-600 text-sm font-medium">
                  Ước tính công suất
                </p>
                <p className="text-lg font-bold text-amber-800">
                  {estimatedPower}W
                </p>
              </div>
            </div>
          </div>

          {/* System Specs */}
          {estimatedPower > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-800">
                Thông số hệ thống
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-purple-50 rounded p-2 shadow-sm border border-purple-100">
                  <span className="text-purple-600">PSU khuyến nghị:</span>
                  <span className="font-semibold ml-1 text-purple-800">
                    {Math.ceil((estimatedPower * 1.5) / 50) * 50}W+
                  </span>
                </div>
                <div className="bg-indigo-50 rounded p-2 shadow-sm border border-indigo-100">
                  <span className="text-indigo-600">Hiệu suất:</span>
                  <span
                    className={`font-semibold ml-1 ${
                      isComplete ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    {isComplete ? "Cao" : "Chưa đủ"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-4">
            <Button className="w-full" size="lg" disabled={!isComplete}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Thêm vào giỏ hàng
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="h-4 w-4 mr-1" />
                Xuất file
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Share2 className="h-4 w-4 mr-1" />
                Chia sẻ
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
              onClick={onClearBuild}
              size="sm"
            >
              Xóa cấu hình
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Simple Performance Card */}
      {isComplete && (
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg font-bold text-gray-800">
              Đánh giá hiệu suất
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gaming</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-sm font-semibold text-gray-700">
                    Cao
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Workstation</span>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="w-20 h-2" />
                  <span className="text-sm font-semibold text-gray-700">
                    Tốt
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Streaming</span>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="w-20 h-2" />
                  <span className="text-sm font-semibold text-gray-700">
                    Xuất sắc
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
