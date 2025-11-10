"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReturnCancelledProps {
  orderCode: string;
  message?: string;
}

export function ReturnCancelled({ orderCode, message }: ReturnCancelledProps) {
  const router = useRouter();
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
        <CardTitle className="text-yellow-600">Thanh toán đã bị hủy</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">
          {message || "Bạn đã hủy thanh toán."} Mã đơn hàng: {orderCode}
        </p>
        <p className="text-sm text-gray-500">
          Đơn hàng vẫn được lưu, bạn có thể thanh toán lại sau.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.push("/checkout")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Thử lại thanh toán
          </Button>
          <Button variant="outline" onClick={() => router.push("/cart")}>
            Quay về giỏ hàng
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
