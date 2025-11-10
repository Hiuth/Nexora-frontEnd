"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReturnErrorProps {
  orderCode?: string;
  message?: string;
}

export function ReturnError({ orderCode, message }: ReturnErrorProps) {
  const router = useRouter();
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center">
        <XCircle className="h-12 w-12 mx-auto text-red-600 mb-4" />
        <CardTitle className="text-red-600">Thanh toán thất bại</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">
          {message || "Có lỗi xảy ra trong quá trình thanh toán."}
        </p>
        {orderCode && (
          <p className="text-sm text-gray-500">Mã đơn hàng: {orderCode}</p>
        )}
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
