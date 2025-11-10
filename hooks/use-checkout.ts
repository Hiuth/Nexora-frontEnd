"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  CheckoutService,
  type CheckoutRequest,
} from "@/services/checkout.service";
import { PaymentService } from "@/services/payment.service";
import type { CartResponse } from "@/types/api";

export function useCheckout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const processCheckout = async (
    cartItems: CartResponse[],
    customerInfo: CheckoutRequest
  ) => {
    setIsProcessing(true);

    try {
      // Validate checkout data
      const validation = CheckoutService.validateCheckoutData(
        cartItems,
        customerInfo
      );
      if (!validation.isValid) {
        toast({
          title: "Thông tin không hợp lệ",
          description: validation.errors.join(", "),
          variant: "destructive",
        });
        return false;
      }

      // Process checkout
      const result = await CheckoutService.processCheckout(
        cartItems,
        customerInfo
      );

      if (result.success && result.paymentUrl) {
        toast({
          title: "Đang chuyển đến thanh toán",
          description: "Bạn sẽ được chuyển đến trang thanh toán VNPay",
        });

        // Redirect to payment
        PaymentService.redirectToPayment(result.paymentUrl);
        return true;
      } else {
        toast({
          title: "Lỗi thanh toán",
          description: result.error || "Không thể tạo đơn hàng",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Lỗi hệ thống",
        description:
          "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentReturn = async () => {
    const params = PaymentService.parseVNPayReturnParams();
    if (!params) return;

    try {
      const result = await PaymentService.handleVNPayReturn(params);

      if (result.success) {
        // Handle successful payment
        await CheckoutService.handlePaymentSuccess(result.orderId);

        toast({
          title: "Thanh toán thành công",
          description: "Đơn hàng của bạn đã được xác nhận",
        });

        // Redirect to home
        router.push("/");
      } else {
        // Handle failed payment
        if (result.orderId) {
          await CheckoutService.handlePaymentFailure(result.orderId);
        }

        toast({
          title: "Thanh toán thất bại",
          description: result.message,
          variant: "destructive",
        });

        // Redirect to cart
        router.push("/cart");
      }
    } catch (error) {
      console.error("Payment return handling error:", error);
      toast({
        title: "Lỗi xử lý thanh toán",
        description: "Có lỗi xảy ra khi xử lý kết quả thanh toán",
        variant: "destructive",
      });
      router.push("/cart");
    }
  };

  return {
    isProcessing,
    processCheckout,
    handlePaymentReturn,
  };
}
