"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ShoppingBag, Shield } from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import { Product } from "@/lib/types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
  isProcessing: boolean;
  onSubmit: () => void;
}

export function OrderSummary({
  items,
  totalPrice,
  isProcessing,
  onSubmit,
}: OrderSummaryProps) {
  const finalTotal = totalPrice;

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-6 border-2 border-gray-100 shadow-lg">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <CardTitle className="flex items-center gap-3 text-gray-900">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-gray-700" />
            </div>
            Đơn hàng của bạn
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Products List */}
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3 bg-gray-50 rounded-xl"
              >
                <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-gray-200">
                  <Image
                    src={item.product.thumbnail || "/placeholder.svg"}
                    alt={item.product.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold line-clamp-2 text-gray-900 leading-tight">
                    {item.product.productName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Số lượng:{" "}
                    <span className="font-semibold">{item.quantity}</span>
                  </p>
                  <p className="text-sm font-bold text-blue-600 mt-1">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Price Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Tạm tính</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Total */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-900">Tổng cộng</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(finalTotal)}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={onSubmit}
            size="lg"
            className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-6 w-6 mr-2" />
                Đặt hàng ngay
              </>
            )}
          </Button>

          {/* Benefits */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Đảm bảo an toàn
                </p>
                <p className="text-xs text-blue-600">Thông tin được bảo mật</p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-gray-500 pt-2 border-t border-gray-200">
            Bằng việc đặt hàng, bạn đồng ý với{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              điều khoản sử dụng
            </span>{" "}
            của chúng tôi
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
