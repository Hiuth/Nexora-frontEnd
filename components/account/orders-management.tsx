"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import {
  mockOrders,
  mockOrderDetails,
  getOrderStatusText,
  getOrderStatusColor,
} from "@/lib/mock-orders";
import { products, formatPrice } from "@/lib/mock-data";

interface OrderListProps {
  orders: typeof mockOrders;
}

function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12 lg:p-16 text-center">
        <div className="max-w-sm mx-auto">
          <div className="h-16 w-16 sm:h-20 sm:w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Không có đơn hàng nào
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Các đơn hàng của bạn sẽ hiển thị ở đây
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {orders.map((order) => {
        const orderItems = mockOrderDetails.filter(
          (d) => d.orderId === order.id
        );
        return (
          <div
            key={order.id}
            className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-blue-50 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-bold text-base sm:text-lg text-slate-800">
                    Đơn hàng #{order.id.toString().padStart(6, "0")}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {new Date(order.orderDate).toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Badge className={getOrderStatusColor(order.status)}>
                  {getOrderStatusText(order.status)}
                </Badge>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {orderItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex gap-3 sm:gap-4 p-3 rounded-lg sm:rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg sm:rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                        <Image
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${product.id}`}
                          className="block hover:text-blue-600 transition-colors"
                        >
                          <p className="font-semibold text-slate-800 line-clamp-2 text-sm sm:text-base">
                            {product.productName}
                          </p>
                        </Link>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs sm:text-sm text-slate-600">
                            Số lượng:{" "}
                            <span className="font-medium text-slate-800">
                              {item.quantity}
                            </span>
                          </p>
                          <p className="text-sm sm:text-base font-bold text-blue-600">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-600 mb-1">
                      Địa chỉ giao hàng
                    </p>
                    <p className="text-sm font-medium text-slate-800 break-words">
                      {order.address}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs font-medium text-slate-600 mb-1">
                      Tổng cộng
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {order.status === "processing" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:flex-1 border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all h-9 sm:h-10"
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      Hủy đơn hàng
                    </span>
                  </Button>
                )}
                {order.status === "preparing" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all h-9 sm:h-10"
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      Xem chi tiết
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OrdersManagement() {
  const allOrders = mockOrders;
  const processingOrders = mockOrders.filter(
    (o) => o.status === "processing" || o.status === "pending"
  );
  const preparingOrders = mockOrders.filter((o) => o.status === "preparing");
  const shippingOrders = mockOrders.filter((o) => o.status === "shipping");
  const completedOrders = mockOrders.filter((o) => o.status === "delivered");

  const orderTabs = [
    {
      value: "all",
      label: "Tất cả",
      count: allOrders.length,
      orders: allOrders,
    },
    {
      value: "processing",
      label: "Đang xử lý",
      count: processingOrders.length,
      orders: processingOrders,
    },
    {
      value: "preparing",
      label: "Đang chuẩn bị",
      count: preparingOrders.length,
      orders: preparingOrders,
    },
    {
      value: "shipping",
      label: "Đang giao",
      count: shippingOrders.length,
      orders: shippingOrders,
    },
    {
      value: "completed",
      label: "Hoàn thành",
      count: completedOrders.length,
      orders: completedOrders,
    },
  ];

  return (
    <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
      <div className="rounded-xl sm:rounded-2xl p-1 sm:p-1.5 bg-white shadow-sm border border-slate-100">
        <TabsList className="bg-transparent rounded-lg sm:rounded-xl w-full grid grid-cols-2 lg:grid-cols-5 gap-1 overflow-hidden">
          {orderTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-2 py-2 sm:py-2.5 rounded-md sm:rounded-lg text-slate-600 hover:text-slate-800 hover:bg-blue-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 transition-all duration-200"
            >
              <span className="text-xs sm:text-sm font-medium truncate">
                {tab.label}
              </span>
              <Badge className="bg-blue-100 text-blue-600 data-[state=active]:bg-white/20 data-[state=active]:text-white text-xs px-1.5 py-0.5 min-w-[20px] justify-center">
                {tab.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {orderTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <OrderList orders={tab.orders} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
