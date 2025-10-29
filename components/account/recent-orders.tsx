"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatPrice } from "@/lib/mock-data";
import { getOrderStatusText, getOrderStatusColor } from "@/lib/mock-orders";

interface Order {
  id: string;
  orderDate: string;
  totalAmount: number;
  status: string;
}

interface OrderItem {
  orderId: string;
  productId: string;
  quantity: number;
}

interface RecentOrdersProps {
  orders: Order[];
  orderItems: OrderItem[];
}

export function RecentOrders({ orders, orderItems }: RecentOrdersProps) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-slate-800">
            Đơn hàng gần đây
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80 hover:bg-primary/10 font-medium rounded-lg"
            asChild
          >
            <Link href="/account/orders">Xem tất cả</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">Chưa có đơn hàng nào</p>
            </div>
          ) : (
            orders.map((order) => {
              const items = orderItems.filter(
                (item) => item.orderId === order.id
              );
              return (
                <div
                  key={order.id}
                  className="bg-slate-50/80 rounded-xl p-6 hover:bg-slate-100/80 transition-colors border border-slate-200/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-slate-800 text-lg">
                        Đơn hàng #{order.id.toString().padStart(6, "0")}
                      </p>
                      <p className="text-sm text-slate-600">
                        {new Date(order.orderDate).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge className={getOrderStatusColor(order.status)}>
                      {getOrderStatusText(order.status)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      {items.length} sản phẩm
                    </p>
                    <p className="font-semibold text-primary text-lg">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
