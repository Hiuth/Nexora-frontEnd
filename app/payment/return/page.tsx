"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
// import { PaymentService } from "@/services/payment.service"; // Not needed in approach B
import { CheckoutService } from "@/services/checkout.service";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { ReturnProcessing } from "@/components/payment/return-processing";
import { ReturnSuccess } from "@/components/payment/return-success";
import { ReturnCancelled } from "@/components/payment/return-cancelled";
import { ReturnError } from "@/components/payment/return-error";

type PaymentStatus = "processing" | "success" | "error" | "cancelled";

export default function PaymentReturnPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [status, setStatus] = useState<PaymentStatus>("processing");
  const [orderCode, setOrderCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [redirectIn, setRedirectIn] = useState<number>(5);

  useEffect(() => {
    handlePaymentReturn();
  }, [searchParams]);

  // Auto redirect to home after success
  useEffect(() => {
    if (status !== "success") return;
    setRedirectIn(5);
    const interval = setInterval(() => {
      setRedirectIn((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // Navigate when countdown finishes
  useEffect(() => {
    if (status === "success" && redirectIn === 0) {
      router.replace("/");
    }
  }, [status, redirectIn, router]);

  const handlePaymentReturn = async () => {
    try {
      // Get all search params
      const params = new URLSearchParams(searchParams.toString());

      // Check if we have VNPay return parameters
      const hasVNPayParams =
        params.has("vnp_TxnRef") && params.has("vnp_ResponseCode");

      if (!hasVNPayParams) {
        setStatus("error");
        setErrorMessage("Thông tin thanh toán không hợp lệ");
        toast({
          title: "Lỗi thanh toán",
          description: "Thông tin thanh toán không hợp lệ",
          variant: "destructive",
        });
        return;
      }
      // Approach B: derive result directly from VNPay params (backend already validated & redirected)
      const responseCode = params.get("vnp_ResponseCode");
      const txnRef = params.get("vnp_TxnRef") || "";

      // Store order code for UI
      setOrderCode(txnRef);

      if (responseCode === "00") {
        // Success
        try {
          // Optional: notify backend about success (can be skipped if IPN handles it)
          await CheckoutService.handlePaymentSuccess(txnRef);
        } catch (e) {
          // Don't block UI on this
          console.warn("handlePaymentSuccess failed (non-blocking)", e);
        }

        setStatus("success");
        toast({
          title: "Thanh toán thành công!",
          description: `Đơn hàng ${txnRef} đã được thanh toán thành công`,
        });
      } else if (responseCode === "24") {
        // Cancelled by user
        setStatus("cancelled");
        setErrorMessage("Bạn đã hủy thanh toán");
      } else {
        // Failed
        const errorMsg = getVNPayErrorMessage(responseCode || "");
        try {
          await CheckoutService.handlePaymentFailure(txnRef);
        } catch (e) {
          console.warn("handlePaymentFailure failed (non-blocking)", e);
        }
        setStatus("error");
        setErrorMessage(errorMsg);
        toast({
          title: "Thanh toán thất bại",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Payment return error:", error);
      setStatus("error");
      setErrorMessage("Có lỗi xảy ra khi xử lý thanh toán");
      toast({
        title: "Lỗi hệ thống",
        description: "Có lỗi xảy ra khi xử lý thanh toán",
        variant: "destructive",
      });
    }
  };

  const getVNPayErrorMessage = (responseCode: string): string => {
    const errorMessages: Record<string, string> = {
      "01": "Giao dịch chưa hoàn tất",
      "02": "Giao dịch bị lỗi",
      "04": "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng giao dịch chưa thành công tại VNPAY)",
      "05": "VNPAY đang xử lý giao dịch này (GD hoàn tiền)",
      "06": "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)",
      "07": "Giao dịch bị nghi ngờ gian lận",
      "09": "GD Hoàn tiền bị từ chối",
      "10": "Đã giao hàng",
      "11": "Giao dịch bị hủy",
      "12": "Giao dịch bị từ chối bởi issuer",
      "13": "Người dùng nhập sai mật khẩu xác thực giao dịch (OTP)",
      "24": "Khách hàng hủy giao dịch",
      "51": "Tài khoản của quý khách không đủ số dư để thực hiện giao dịch",
      "65": "Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày",
      "75": "Ngân hàng thanh toán đang bảo trì",
      "79": "KH nhập sai mật khẩu thanh toán quá số lần quy định",
      "99": "Lỗi không xác định",
    };

    return errorMessages[responseCode] || "Giao dịch thất bại";
  };

  const renderContent = () => {
    switch (status) {
      case "processing":
        return <ReturnProcessing />;

      case "success":
        return <ReturnSuccess orderCode={orderCode} redirectIn={redirectIn} />;

      case "cancelled":
        return <ReturnCancelled orderCode={orderCode} message={errorMessage} />;

      case "error":
        return <ReturnError orderCode={orderCode} message={errorMessage} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4">{renderContent()}</div>
      </main>

      <Footer />
    </div>
  );
}
