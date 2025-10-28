"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Gift } from "lucide-react";
import { formatPrice } from "@/lib/mock-data";

interface OrderSummaryProps {
  totalPrice: number;
  itemCount: number;
}

export function OrderSummary({ totalPrice, itemCount }: OrderSummaryProps) {
  const shippingFee = totalPrice >= 500000 ? 0 : 30000;
  const discount = 0;
  const finalTotal = totalPrice + shippingFee - discount;

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tổng đơn hàng
          </h2>
          <p className="text-sm text-gray-600">
            {itemCount} sản phẩm trong giỏ hàng
          </p>
        </div>

        <div className="p-6">
          {/* Price Breakdown */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Tạm tính</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span
                className={`font-semibold ${
                  shippingFee === 0 ? "text-green-600" : "text-gray-900"
                }`}
              >
                {shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-gray-600">Giảm giá</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(discount)}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Total */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-900">Tổng cộng</span>
              <span className="text-3xl font-bold text-blue-600">
                {formatPrice(finalTotal)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            size="lg"
            className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
            asChild
          >
            <Link href="/checkout">
              Thanh toán ngay
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>

          {/* Benefits */}
          <div className="space-y-3">
            {shippingFee === 0 && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <Truck className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Miễn phí vận chuyển
                  </p>
                  <p className="text-xs text-green-600">
                    Đơn hàng trên 500.000đ
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Bảo hành chính hãng
                </p>
                <p className="text-xs text-blue-600">Lên đến 36 tháng</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
              <Gift className="h-5 w-5 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-purple-800">
                  Quà tặng kèm
                </p>
                <p className="text-xs text-purple-600">Chuột & bàn phím</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
