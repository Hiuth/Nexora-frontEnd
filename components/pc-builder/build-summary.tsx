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
  Zap,
  TrendingUp,
  Shield,
  Download,
  Share2,
} from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
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
  const { user } = useAuth();
  const selectedComponents = buildComponents.filter((c) => c.product);
  const requiredComponents = buildComponents.filter((c) => c.required);
  const completedRequired = requiredComponents.filter((c) => c.product).length;
  const completionPercentage = Math.round(
    (completedRequired / requiredComponents.length) * 100
  );

  // Calculate stats by category
  const coreComponents = buildComponents.filter(
    (c) => c.categoryType === "core" && c.product
  ).length;
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
      <Card className="sticky top-20 overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-gray-800">Tổng quan</CardTitle>
            <Badge
              variant={isComplete ? "default" : "secondary"}
              className="px-3 bg-gray-100 text-gray-700"
            >
              {completionPercentage}% hoàn thành
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-2 mt-2" />
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {totalComponents}
              </div>
              <div className="text-xs text-blue-600 font-medium">
                Components
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {completedRequired}/{requiredComponents.length}
              </div>
              <div className="text-xs text-green-600 font-medium">Required</div>
            </div>
          </div>

          {/* Compatibility Check */}
          {isComplete ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-sm text-green-700">
                Cấu hình hoàn chỉnh và tương thích!
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
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Chi tiết giá
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {buildComponents
                  .filter((c) => c.product)
                  .map((component) => (
                    <div
                      key={component.categoryId}
                      className="flex justify-between items-center text-sm bg-gray-50 rounded-lg p-2"
                    >
                      <div className="flex items-center gap-2">
                        {component.icon}
                        <span className="font-medium">
                          {component.category}
                          {component.quantity > 1 && (
                            <Badge variant="secondary" className="ml-1 text-xs">
                              x{component.quantity}
                            </Badge>
                          )}
                        </span>
                      </div>
                      <span className="font-semibold text-blue-600">
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100 text-sm">Tổng cộng</p>
                <p className="text-2xl font-bold">{formatPrice(totalPrice)}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">Ước tính công suất</p>
                <p className="text-lg font-bold">{estimatedPower}W</p>
              </div>
            </div>
          </div>

          {/* System Specs */}
          {estimatedPower > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Thông số hệ thống
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 rounded p-2">
                  <span className="text-gray-600">PSU khuyến nghị:</span>
                  <span className="font-semibold ml-1">
                    {Math.ceil((estimatedPower * 1.5) / 50) * 50}W+
                  </span>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <span className="text-gray-600">Hiệu suất:</span>
                  <span className="font-semibold ml-1 text-green-600">
                    {isComplete ? "Cao" : "Chưa đủ"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-4">
            {user ? (
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
                disabled={!isComplete}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  className="w-full bg-gray-400 cursor-not-allowed"
                  size="lg"
                  disabled
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
                <p className="text-sm text-red-600 text-center">
                  Vui lòng đăng nhập để thêm vào giỏ hàng
                </p>
              </div>
            )}
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
              className="w-full bg-transparent text-red-600 border-red-200 hover:bg-red-50"
              onClick={onClearBuild}
              size="sm"
            >
              Xóa cấu hình
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Card */}
      {isComplete && (
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <CardTitle className="text-lg flex items-center gap-2 text-green-800">
              <Shield className="h-5 w-5" />
              Đánh giá hiệu suất
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gaming</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-sm font-semibold text-green-600">
                    Cao
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Workstation</span>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="w-20 h-2" />
                  <span className="text-sm font-semibold text-blue-600">
                    Tốt
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Streaming</span>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="w-20 h-2" />
                  <span className="text-sm font-semibold text-purple-600">
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
