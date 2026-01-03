"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaymentService } from "@/services/payment.service";
import { OrderUtils } from "@/lib/order-utils";
import { useToast } from "@/hooks/use-toast";
import type { OrderResponse } from "@/types/api";

interface OrderActionButtonsProps {
  order: OrderResponse;
  onCancelOrder: (order: OrderResponse) => void;
  onViewDetails: (order: OrderResponse) => void;
  isCancelling: boolean;
}

export function OrderActionButtons({
  order,
  onCancelOrder,
  onViewDetails,
  isCancelling,
}: OrderActionButtonsProps) {
  const [isPaying, setIsPaying] = useState(false);
  const { toast } = useToast();

  // Logic để hiển thị nút theo yêu cầu
  const shouldShowCancelButton = () => {
    return OrderUtils.canCancelOrder(order.status, order.isPaid);
  };

  const shouldShowPaymentButton = () => {
    return OrderUtils.shouldShowPaymentAction(order.status, order.isPaid);
  };

  const handlePayment = async () => {
    if (isPaying) return;

    setIsPaying(true);
    try {
      // Tạo URL thanh toán VNPay
      const paymentUrl = await PaymentService.createPaymentUrl(
        order.id,
        order.totalAmount
      );

      // Redirect ngay lập tức đến trang thanh toán VNPay
      PaymentService.redirectToPayment(paymentUrl);
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast({
        title: "Lỗi thanh toán",
        description: "Không thể tạo liên kết thanh toán. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsPaying(false);
    }
  };

  // Nếu đã thanh toán thành công, chỉ hiển thị nút xem chi tiết
  if (order.isPaid) {
    return (
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering order click
            onViewDetails(order);
          }}
          className="w-full border border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-all h-9 sm:h-10"
        >
          <span className="text-xs sm:text-sm font-medium">
            Xem chi tiết & giá tiền
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      {shouldShowCancelButton() && (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering order click
            onCancelOrder(order);
          }}
          disabled={isCancelling}
          className="w-full sm:flex-1 border border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all h-9 sm:h-10"
        >
          <span className="text-xs sm:text-sm font-medium">
            {isCancelling ? "Đang hủy..." : "Hủy đơn hàng"}
          </span>
        </Button>
      )}

      {shouldShowPaymentButton() && (
        <Button
          variant="default"
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering order click
            handlePayment();
          }}
          disabled={isPaying}
          className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 transition-all h-9 sm:h-10"
        >
          <span className="text-xs sm:text-sm font-medium">
            {isPaying ? "Đang chuyển..." : "Thanh toán ngay"}
          </span>
        </Button>
      )}

      {/* Luôn hiện nút xem chi tiết */}
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering order click
          onViewDetails(order);
        }}
        className="w-full sm:flex-1 border border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-all h-9 sm:h-10"
      >
        <span className="text-xs sm:text-sm font-medium">
          Xem chi tiết & giá tiền
        </span>
      </Button>
    </div>
  );
}