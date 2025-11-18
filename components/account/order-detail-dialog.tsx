"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Package2, MapPin, Phone, User, Calendar, Receipt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { OrderDetailService } from "@/services/order-detail.service";
import { OrderService } from "@/services/order.service";
import { ProductService } from "@/services/product.service";
import { OrderUtils } from "@/lib/order-utils";
import type { OrderResponse, OrderDetailResponse } from "@/types/api";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/mock-data";

interface OrderDetailDialogProps {
  order: OrderResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailDialog({
  order,
  isOpen,
  onClose,
}: OrderDetailDialogProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetailResponse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (order && isOpen) {
      loadOrderDetails();
    }
  }, [order, isOpen]);

  const loadOrderDetails = async () => {
    if (!order) return;

    setLoading(true);
    setError(null);

    try {
      // Load order details
      const details = await OrderDetailService.getOrderDetailsByOrderId(
        order.id
      );
      setOrderDetails(details);

      // Load products for each order detail
      const productPromises = details.map((detail) =>
        ProductService.getProductById(detail.productId)
      );
      const productResults = await Promise.all(productPromises);
      setProducts(
        productResults.filter((product): product is Product => product !== null)
      );
    } catch (err) {
      console.error("Error loading order details:", err);
      setError("Không thể tải chi tiết đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  const getStatusColor = (status: string) => {
    return OrderService.getOrderStatusColor(status);
  };

  const getStatusLabel = (status: string) => {
    return OrderService.getOrderStatusLabel(status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProductById = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Package2 className="h-5 w-5 text-blue-600" />
            Chi tiết đơn hàng #{order.id.toString().padStart(6, "0")}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6">
            {/* Order Info Header */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-600">
                        Ngày đặt hàng
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium">
                      {formatDate(order.orderDate)}
                    </p>

                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-600">
                        Trạng thái đơn hàng
                      </span>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>

                    <div className="flex items-center gap-2 mt-4">
                      <Receipt className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-600">
                        Trạng thái thanh toán
                      </span>
                    </div>
                    <Badge className={OrderUtils.getPaymentStatusColor(order.isPaid)}>
                      {OrderUtils.getPaymentStatusIcon(order.isPaid)} {OrderUtils.getPaymentStatusLabel(order.isPaid)}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-600">
                        Thông tin khách hàng
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-800 font-medium">
                        {order.customerName}
                      </p>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="h-4 w-4" />
                        <span>{order.phoneNumber}</span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-600">
                        <MapPin className="h-4 w-4 mt-0.5" />
                        <span className="line-clamp-2">{order.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Package2 className="h-5 w-5 text-blue-600" />
                  Sản phẩm đã đặt
                </h3>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-slate-600 mt-2">Đang tải...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-600">
                    <p>{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadOrderDetails}
                      className="mt-2"
                    >
                      Thử lại
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderDetails.map((detail) => {
                      const product = getProductById(detail.productId);
                      return (
                        <div
                          key={detail.id}
                          className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200"
                        >
                          <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                            <Image
                              src={product?.thumbnail || "/placeholder.svg"}
                              alt={detail.productName || "Product"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            {product ? (
                              <Link
                                href={`/products/${product.id}`}
                                className="block hover:text-blue-600 transition-colors"
                                onClick={onClose}
                              >
                                <p className="font-semibold text-slate-800 line-clamp-2">
                                  {detail.productName || product.productName}
                                </p>
                              </Link>
                            ) : (
                              <p className="font-semibold text-slate-800 line-clamp-2">
                                {detail.productName ||
                                  `Product ID: ${detail.productId}`}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-sm text-slate-600">
                                <span>Số lượng: </span>
                                <span className="font-medium text-slate-800">
                                  {detail.quantity}
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-slate-600">
                                  {formatPrice(detail.unitPrice)} x{" "}
                                  {detail.quantity}
                                </p>
                                <p className="font-bold text-blue-600">
                                  {formatPrice(
                                    detail.unitPrice * detail.quantity
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">
                  Tổng kết đơn hàng
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(order.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Phí vận chuyển:</span>
                    <span>Miễn phí</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold text-slate-800">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
