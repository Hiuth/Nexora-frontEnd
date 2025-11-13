"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { OrderService } from "@/services/order.service";
import { OrderDetailDialog } from "./order-detail-dialog";
import { useToast } from "@/hooks/use-toast";
import type { OrderResponse } from "@/types/api";

interface OrderListProps {
  orders: OrderResponse[];
  onOrderUpdate: () => void;
}

function OrderList({ orders, onOrderUpdate }: OrderListProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(
    null
  );
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [cancellingOrders, setCancellingOrders] = useState<Set<string>>(
    new Set()
  );
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<OrderResponse | null>(
    null
  );
  const { toast } = useToast();

  const loadOrderDetails = async (orderId: string) => {
    // Logic này đã được chuyển vào OrderDetailDialog
    // Không cần load details ở đây nữa
  };

  const handleCancelOrderClick = (order: OrderResponse) => {
    setOrderToCancel(order);
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = async () => {
    if (!orderToCancel) return;

    const orderId = orderToCancel.id;
    if (cancellingOrders.has(orderId)) return;

    setCancellingOrders((prev) => new Set(prev).add(orderId));
    setShowCancelDialog(false);

    try {
      await OrderService.updateOrder(orderId, { status: "CANCELLED" });
      toast({
        title: "Thành công",
        description: "Đơn hàng đã được hủy thành công",
      });
      onOrderUpdate();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast({
        title: "Lỗi",
        description: "Không thể hủy đơn hàng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setCancellingOrders((prev) => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
      setOrderToCancel(null);
    }
  };

  const handleViewDetails = (order: OrderResponse) => {
    setSelectedOrder(order);
    setShowDetailDialog(true);
  };

  const getStatusColor = (status: string) => {
    return OrderService.getOrderStatusColor(status);
  };

  const getStatusLabel = (status: string) => {
    return OrderService.getOrderStatusLabel(status);
  };

  const canCancelOrder = (status: string) => {
    return status === "PENDING";
  };

  // Simplified: Show view details for all non-PENDING orders
  const shouldShowViewDetails = () => {
    return true; // Always show view details button
  };
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
    <>
      <div className="space-y-4 sm:space-y-6">
        {orders.map((order) => {
          const isCancelling = cancellingOrders.has(order.id);

          return (
            <div
              key={order.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleViewDetails(order)}
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
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>
              </div>

              {/* Order Basic Info */}
              <div className="p-4 sm:p-6">
                {/* Customer Info */}
                <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600 mb-1">
                        Khách hàng
                      </p>
                      <p className="text-sm font-medium text-slate-800">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        {order.phoneNumber}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs font-medium text-slate-600 mb-1">
                        Địa chỉ giao hàng
                      </p>
                      <p className="text-sm text-slate-600 line-clamp-2 max-w-xs">
                        {order.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {canCancelOrder(order.status) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering order click
                        handleCancelOrderClick(order);
                      }}
                      disabled={isCancelling}
                      className="w-full sm:flex-1 border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all h-9 sm:h-10"
                    >
                      <span className="text-xs sm:text-sm font-medium">
                        {isCancelling ? "Đang hủy..." : "Hủy đơn hàng"}
                      </span>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering order click
                      handleViewDetails(order);
                    }}
                    className="w-full sm:flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all h-9 sm:h-10"
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      Xem chi tiết & giá tiền
                    </span>
                  </Button>
                </div>

                {/* Click hint */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500 text-center">
                    💡 Click vào đơn hàng để xem chi tiết sản phẩm và tổng giá
                    tiền
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Detail Dialog */}
      <OrderDetailDialog
        order={selectedOrder}
        isOpen={showDetailDialog}
        onClose={() => {
          setShowDetailDialog(false);
          setSelectedOrder(null);
        }}
      />

      {/* Cancel Order Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              ⚠️ Xác nhận hủy đơn hàng
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Bạn có chắc chắn muốn hủy đơn hàng{" "}
              <span className="font-semibold text-slate-800">
                #{orderToCancel?.id.toString().padStart(6, "0")}
              </span>{" "}
              không?
              <br />
              <br />
              <span className="text-sm text-red-600">
                ⚠️ Hành động này không thể hoàn tác. Đơn hàng sẽ bị hủy vĩnh
                viễn.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Giữ đơn hàng</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Xác nhận hủy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function OrdersManagement() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const orderData = await OrderService.getOrdersByAccount();
      setOrders(orderData);
    } catch (err) {
      console.error("Error loading orders:", err);
      setError("Không thể tải danh sách đơn hàng");
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-slate-600 mt-4">Đang tải đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertDescription className="text-red-700">
          {error}
          <Button
            variant="outline"
            size="sm"
            onClick={loadOrders}
            className="ml-4"
          >
            Thử lại
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const allOrders = orders; // Keep for reference but not used in tabs
  const pendingOrders = orders.filter((o) => o.status === "PENDING");
  const confirmedOrders = orders.filter((o) => o.status === "CONFIRMED");
  const processingOrders = orders.filter((o) => o.status === "PROCESSING");
  const shippedOrders = orders.filter((o) => o.status === "SHIPPED");
  const deliveredOrders = orders.filter((o) => o.status === "DELIVERED");

  const orderTabs = [
    {
      value: "pending",
      label: "Chờ xử lý",
      count: pendingOrders.length,
      orders: pendingOrders,
    },
    {
      value: "confirmed",
      label: "Đã xác nhận",
      count: confirmedOrders.length,
      orders: confirmedOrders,
    },
    {
      value: "processing",
      label: "Đang xử lý",
      count: processingOrders.length,
      orders: processingOrders,
    },
    {
      value: "shipped",
      label: "Đã gửi hàng",
      count: shippedOrders.length,
      orders: shippedOrders,
    },
    {
      value: "delivered",
      label: "Đã giao hàng",
      count: deliveredOrders.length,
      orders: deliveredOrders,
    },
  ];

  return (
    <Tabs defaultValue="pending" className="space-y-4 sm:space-y-6">
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
          <OrderList orders={tab.orders} onOrderUpdate={loadOrders} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
