"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { PaymentService } from "@/services/payment.service"; // Not needed in approach B
import { CheckoutService } from "@/services/checkout.service";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

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
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Đang xử lý thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
            </CardContent>
          </Card>
        );

      case "success":
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <CardTitle className="text-green-600">
                Thanh toán thành công!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Đơn hàng <span className="font-semibold">{orderCode}</span> đã
                được thanh toán thành công.
              </p>
              <p className="text-sm text-gray-500">
                Chúng tôi sẽ xử lý đơn hàng và giao hàng trong thời gian sớm
                nhất.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-green-800 text-sm">
                  Sẽ tự động chuyển về trang chủ sau {redirectIn}s
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => router.replace("/")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Về trang chủ ngay
                </Button>
                <Button
                  onClick={() => router.push(`/account/orders`)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Xem đơn hàng
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/products")}
                >
                  Tiếp tục mua sắm
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "cancelled":
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
              <CardTitle className="text-yellow-600">
                Thanh toán đã bị hủy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Bạn đã hủy thanh toán cho đơn hàng {orderCode}.
              </p>
              <p className="text-sm text-gray-500">
                Đơn hàng vẫn được lưu và bạn có thể tiếp tục thanh toán sau.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => router.push("/checkout")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Thử lại thanh toán
                </Button>
                <Button variant="outline" onClick={() => router.push("/cart")}>
                  Quay về giỏ hàng
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "error":
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <XCircle className="h-12 w-12 mx-auto text-red-600 mb-4" />
              <CardTitle className="text-red-600">
                Thanh toán thất bại
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                {errorMessage || "Có lỗi xảy ra trong quá trình thanh toán."}
              </p>
              {orderCode && (
                <p className="text-sm text-gray-500">
                  Mã đơn hàng: {orderCode}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => router.push("/checkout")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Thử lại thanh toán
                </Button>
                <Button variant="outline" onClick={() => router.push("/cart")}>
                  Quay về giỏ hàng
                </Button>
              </div>
            </CardContent>
          </Card>
        );

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
