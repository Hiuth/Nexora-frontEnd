"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
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
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-primary/10 p-16 text-center">
        <p className="text-slate-500 text-lg">Không có đơn hàng nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const orderItems = mockOrderDetails.filter(
          (d) => d.orderId === order.id
        );
        return (
          <div
            key={order.id}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-semibold text-xl text-slate-800">
                    Đơn hàng #{order.id.toString().padStart(6, "0")}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
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

              <div className="space-y-4 mb-6">
                {orderItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex gap-4">
                      <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-slate-200/50 flex-shrink-0">
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
                          className="block hover:text-primary transition-colors"
                        >
                          <p className="font-medium line-clamp-2 text-slate-800">
                            {product.productName}
                          </p>
                        </Link>
                        <p className="text-sm text-slate-600 mt-1">
                          Số lượng: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Địa chỉ giao hàng</p>
                    <p className="text-sm font-medium text-slate-800 line-clamp-1">
                      {order.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-1">Tổng cộng</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                  >
                    Xem chi tiết
                  </Button>
                  {order.status === "delivered" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                    >
                      Mua lại
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function OrdersPage() {
  const allOrders = mockOrders;
  const processingOrders = mockOrders.filter(
    (o) => o.status === "processing" || o.status === "pending"
  );
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
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-primary/5 via-slate-50 to-blue-50/30 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-8 text-primary hover:text-primary/80 hover:bg-primary/10 font-medium rounded-lg"
          >
            <Link href="/account">
              <ChevronLeft className="h-5 w-5 mr-2" />
              Quay lại tài khoản
            </Link>
          </Button>

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-slate-900">
              Đơn hàng của tôi
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Theo dõi và quản lý tất cả đơn hàng của bạn tại đây
            </p>
          </div>

          <Tabs defaultValue="all" className="space-y-8">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-primary/10 p-2">
              <TabsList className="bg-transparent border-0 w-full">
                {orderTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex-1 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary/20 text-slate-700 hover:text-slate-900 font-medium px-4 py-3 rounded-xl transition-all duration-200"
                  >
                    {tab.label}
                    <Badge className="ml-2 bg-slate-200 text-slate-600 text-xs">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}