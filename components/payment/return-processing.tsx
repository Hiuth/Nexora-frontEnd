"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function ReturnProcessing() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-blue-600 mb-4" />
        <CardTitle>Đang xử lý thanh toán</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
      </CardContent>
    </Card>
  );
}
