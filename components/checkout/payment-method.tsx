"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet, Building2, CreditCard } from "lucide-react";

interface PaymentMethodProps {
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
}

export function PaymentMethod({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodProps) {
  return (
    <Card className="border-2 border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-purple-600" />
          </div>
          Phương thức thanh toán
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <div className="space-y-4">
            {/* COD Payment */}
            <div className="relative">
              <div className="flex items-center space-x-4 p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer group">
                <RadioGroupItem
                  value="cod"
                  id="cod"
                  className="text-blue-600"
                />
                <Label
                  htmlFor="cod"
                  className="flex items-center gap-4 cursor-pointer flex-1"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <Wallet className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-base">
                      Thanh toán khi nhận hàng
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Miễn phí
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        An toàn
                      </span>
                    </div>
                  </div>
                </Label>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="relative">
              <div className="flex items-center space-x-4 p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer group">
                <RadioGroupItem
                  value="bank"
                  id="bank"
                  className="text-blue-600"
                />
                <Label
                  htmlFor="bank"
                  className="flex items-center gap-4 cursor-pointer flex-1"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-base">
                      Chuyển khoản ngân hàng
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Chuyển khoản qua tài khoản ngân hàng
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                        Nhanh chóng
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Bảo mật
                      </span>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </div>
        </RadioGroup>

        {/* Bank Transfer Info */}
        {paymentMethod === "bank" && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-3">
              Thông tin chuyển khoản:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Ngân hàng:</span>
                <span className="font-semibold text-blue-900">Vietcombank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Số tài khoản:</span>
                <span className="font-semibold text-blue-900">1234567890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Chủ tài khoản:</span>
                <span className="font-semibold text-blue-900">
                  NEXORA PC STORE
                </span>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded-lg">
                <p className="text-xs text-blue-800">
                  💡 Vui lòng ghi rõ họ tên và số điện thoại trong nội dung
                  chuyển khoản
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
