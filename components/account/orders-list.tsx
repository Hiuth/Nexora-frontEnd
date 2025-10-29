"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/mock-data";
import { getOrderStatusText, getOrderStatusColor } from "@/lib/mock-orders";

interface Order {
  id: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  address: string;
}

interface OrderItem {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

interface Product {
  id: string;
  productName: string;
  thumbnail?: string;
}

interface OrdersListProps {
  orders: Order[];
  orderItems: OrderItem[];
  products: Product[];
}

export function OrdersList({ orders, orderItems, products }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-primary/10 p-12 text-center">
        <p className="text-slate-500 text-lg">Chưa có đơn hàng nào</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10">
      <div className="p-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-8">
          Đơn hàng của tôi
        </h3>

        <div className="space-y-6">
          {orders.map((order) => {
            const items = orderItems.filter(
              (item) => item.orderId === order.id
            );

            return (
              <div
                key={order.id}
                className="bg-slate-50/80 rounded-xl p-6 hover:bg-slate-100/80 transition-colors border border-slate-200/50"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-semibold text-lg text-slate-800">
                      Đơn hàng #{order.id.toString().padStart(6, "0")}
                    </p>
                    <p className="text-sm text-slate-600">
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
                  {items.map((item) => {
                    const product = products.find(
                      (p) => p.id === item.productId
                    );
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex gap-4">
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-slate-200/50 flex-shrink-0">
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
                            <p className="font-medium text-sm line-clamp-2 text-slate-800">
                              {product.productName}
                            </p>
                          </Link>
                          <p className="text-xs text-slate-600 mt-1">
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

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">
                        Địa chỉ giao hàng
                      </p>
                      <p className="text-sm font-medium text-slate-800 line-clamp-1">
                        {order.address}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600 mb-1">Tổng cộng</p>
                      <p className="text-xl font-bold text-primary">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
