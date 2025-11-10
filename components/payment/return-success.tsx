"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReturnSuccessProps {
  orderCode: string;
  redirectIn: number;
}

export function ReturnSuccess({ orderCode, redirectIn }: ReturnSuccessProps) {
  const router = useRouter();

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
        <CardTitle className="text-green-600">Thanh toán thành công!</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">
          Đơn hàng <span className="font-semibold">{orderCode}</span> đã được
          thanh toán thành công.
        </p>
        <p className="text-sm text-gray-500">
          Chúng tôi sẽ xử lý đơn hàng và giao hàng trong thời gian sớm nhất.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-green-800 text-sm">
            Sẽ tự động chuyển về trang chủ sau {redirectIn}s
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.replace("/")}
            className="bg-green-600 hover:bg-green-700"
          >
            Về trang chủ ngay
          </Button>
          <Button
            onClick={() => router.push(`/account/orders`)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Xem đơn hàng
          </Button>
          <Button variant="outline" onClick={() => router.push("/products")}>
            Tiếp tục mua sắm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
