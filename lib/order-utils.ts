/**
 * Utility functions for order management
 */
export class OrderUtils {
  /**
   * Get payment status label in Vietnamese
   */
  static getPaymentStatusLabel(isPaid: boolean): string {
    return isPaid ? "Đã thanh toán" : "Chưa thanh toán";
  }

  /**
   * Get payment status color class for UI
   */
  static getPaymentStatusColor(isPaid: boolean): string {
    return isPaid
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-orange-600 bg-orange-50 border-orange-200";
  }

  /**
   * Get payment status icon
   */
  static getPaymentStatusIcon(isPaid: boolean): string {
    return isPaid ? "✓" : "○";
  }

  /**
   * Check if order can be paid
   */
  static canMakePayment(status: string, isPaid: boolean): boolean {
    return !isPaid && (status === "PENDING" || status === "CONFIRMED");
  }

  /**
   * Check if order should show payment action
   */
  static shouldShowPaymentAction(status: string, isPaid: boolean): boolean {
    return this.canMakePayment(status, isPaid);
  }

  /**
   * Check if order can be cancelled
   */
  static canCancelOrder(status: string, isPaid: boolean): boolean {
    return !isPaid && status === "PENDING";
  }

  /**
   * Format order summary for display
   */
  static formatOrderSummary(
    status: string,
    isPaid: boolean,
    totalAmount: number
  ): {
    status: string;
    statusColor: string;
    payment: string;
    paymentColor: string;
    amount: string;
    canPay: boolean;
  } {
    return {
      status: this.getOrderStatusLabel(status),
      statusColor: this.getOrderStatusColor(status),
      payment: this.getPaymentStatusLabel(isPaid),
      paymentColor: this.getPaymentStatusColor(isPaid),
      amount: this.formatCurrency(totalAmount),
      canPay: this.canMakePayment(status, isPaid),
    };
  }

  /**
   * Get order status label in Vietnamese
   */
  private static getOrderStatusLabel(status: string): string {
    const statusMap: Record<string, string> = {
      PENDING: "Chờ xử lý",
      CONFIRMED: "Đã xác nhận",
      PROCESSING: "Đang xử lý",
      SHIPPED: "Đã gửi hàng",
      DELIVERED: "Đã giao hàng",
      CANCELLED: "Đã hủy",
      RETURNED: "Đã trả hàng",
    };
    return statusMap[status] || status;
  }

  /**
   * Get order status color class for UI
   */
  private static getOrderStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      PENDING: "text-yellow-600 bg-yellow-50 border-yellow-200",
      CONFIRMED: "text-blue-600 bg-blue-50 border-blue-200",
      PROCESSING: "text-purple-600 bg-purple-50 border-purple-200",
      SHIPPED: "text-orange-600 bg-orange-50 border-orange-200",
      DELIVERED: "text-green-600 bg-green-50 border-green-200",
      CANCELLED: "text-red-600 bg-red-50 border-red-200",
      RETURNED: "text-gray-600 bg-gray-50 border-gray-200",
    };
    return colorMap[status] || "text-gray-600 bg-gray-50 border-gray-200";
  }

  /**
   * Format currency for display
   */
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
}