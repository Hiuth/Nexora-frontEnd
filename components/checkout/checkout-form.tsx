"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/mock-data";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutService } from "@/services/checkout.service";
import type { CartResponse } from "@/types/api";
import type { CheckoutRequest } from "@/services/checkout.service";

interface CheckoutFormProps {
  cartItems: CartResponse[];
}

export function CheckoutForm({ cartItems }: CheckoutFormProps) {
  const { isProcessing, processCheckout } = useCheckout();
  const [customerInfo, setCustomerInfo] = useState<CheckoutRequest>({
    customerName: "",
    phoneNumber: "",
    address: "",
  });

  const summary = CheckoutService.calculateCheckoutSummary(cartItems);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await processCheckout(cartItems, customerInfo);
  };

  const handleInputChange = (field: keyof CheckoutRequest, value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Customer Information Form */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Thông tin giao hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customerName">Họ và tên *</Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={customerInfo.customerName}
                  onChange={(e) =>
                    handleInputChange("customerName", e.target.value)
                  }
                  required
                  disabled={isProcessing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Số điện thoại *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={customerInfo.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  required
                  disabled={isProcessing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                <Textarea
                  id="address"
                  placeholder="Nhập địa chỉ chi tiết"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                  disabled={isProcessing}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? "Đang xử lý..." : "Thanh toán ngay"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Tóm tắt đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.productName}</h4>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price || 0)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatPrice((item.price || 0) * (item.quantity || 0))}
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            {/* Summary Calculations */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tạm tính ({summary.itemCount} sản phẩm)</span>
                <span>{formatPrice(summary.subtotal)}</span>
              </div>

              {summary.tax > 0 && (
                <div className="flex justify-between">
                  <span>Thuế</span>
                  <span>{formatPrice(summary.tax)}</span>
                </div>
              )}
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng</span>
              <span className="text-blue-600">
                {formatPrice(summary.total)}
              </span>
            </div>

            {/* Payment Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">
                Phương thức thanh toán
              </h5>
              <p className="text-sm text-blue-700">
                VNPay - Thanh toán an toàn qua ngân hàng
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
