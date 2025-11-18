/**
 * Test component to demonstrate payment status display
 * This can be used to verify isPaid functionality works correctly
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderUtils } from "@/lib/order-utils";
import type { OrderResponse } from "@/types/api";

export function PaymentStatusDemo() {
  // Mock order data for testing
  const mockOrders: OrderResponse[] = [
    {
      id: "ord001",
      accountId: "acc001",
      orderDate: "2025-11-18T10:00:00Z",
      totalAmount: 25000000,
      status: "CONFIRMED",
      phoneNumber: "0909123456",
      address: "123 Nguyễn Văn A, Q1, TP.HCM",
      customerName: "Nguyễn Văn A",
      isPaid: true, // Đã thanh toán
    },
    {
      id: "ord002", 
      accountId: "acc001",
      orderDate: "2025-11-18T09:00:00Z",
      totalAmount: 15000000,
      status: "PENDING",
      phoneNumber: "0909123456",
      address: "456 Lê Văn B, Q2, TP.HCM",
      customerName: "Nguyễn Văn A",
      isPaid: false, // Chưa thanh toán
    },
    {
      id: "ord003",
      accountId: "acc001", 
      orderDate: "2025-11-17T15:30:00Z",
      totalAmount: 18500000,
      status: "DELIVERED",
      phoneNumber: "0909123456",
      address: "789 Trần Văn C, Q3, TP.HCM", 
      customerName: "Nguyễn Văn A",
      isPaid: true, // Đã thanh toán
    },
    {
      id: "ord004",
      accountId: "acc001",
      orderDate: "2025-11-17T12:00:00Z", 
      totalAmount: 12000000,
      status: "CANCELLED",
      phoneNumber: "0909123456",
      address: "321 Phạm Văn D, Q4, TP.HCM",
      customerName: "Nguyễn Văn A", 
      isPaid: false, // Chưa thanh toán (đã hủy)
    },
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Demo: Payment Status Display</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Demo hiển thị trạng thái thanh toán cho các đơn hàng mẫu:
          </p>
          
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const summary = OrderUtils.formatOrderSummary(
                order.status,
                order.isPaid,
                order.totalAmount
              );
              
              return (
                <Card key={order.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Đơn hàng #{order.id}
                        </h3>
                        <p className="text-gray-600">
                          {order.customerName} • {summary.amount}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        {/* Order Status */}
                        <Badge className={summary.statusColor}>
                          {summary.status}
                        </Badge>
                        
                        {/* Payment Status */}
                        <Badge className={summary.paymentColor}>
                          {OrderUtils.getPaymentStatusIcon(order.isPaid)} {summary.payment}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Payment Action Demo */}
                    {summary.canPay && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-orange-600">
                          💳 Đơn hàng này có thể được thanh toán
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Chú thích:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Badge className="text-green-600 bg-green-50 border-green-200">
                  ✓ Đã thanh toán
                </Badge>
                <span className="text-gray-600">- Đơn hàng đã được thanh toán</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="text-orange-600 bg-orange-50 border-orange-200">
                  ○ Chưa thanh toán
                </Badge>
                <span className="text-gray-600">- Đơn hàng chưa được thanh toán</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}