import { OrderService } from "./order.service";
import { OrderDetailService } from "./order-detail.service";
import { PaymentService } from "./payment.service";
import { CartService } from "./cart.service";
import type { CartResponse } from "@/types/api";
import type { CreateOrderRequest } from "@/types/requests";

export interface CheckoutRequest {
  customerName: string;
  phoneNumber: string;
  address: string;
}

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  paymentUrl?: string;
  error?: string;
}

export class CheckoutService {
  /**
   * Complete checkout process: Create order → Create order details → Create payment URL
   */
  static async processCheckout(
    cartItems: CartResponse[],
    customerInfo: CheckoutRequest
  ): Promise<CheckoutResult> {
    let createdOrderId: string | null = null;

    try {
      // 1. Calculate total amount
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
        0
      );
      const price = 0;
      // 2. Create order
      const orderRequest: CreateOrderRequest = {
        status: "PENDING",
        totalAmount: price,
        customerName: customerInfo.customerName,
        phoneNumber: customerInfo.phoneNumber,
        address: customerInfo.address,
      };

      const order = await OrderService.createOrder(orderRequest);
      createdOrderId = order.id;

      // 3. Create order details
      const cartItemsForOrderDetails = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity || 0,
        price: item.price || 0,
      }));

      await OrderDetailService.createOrderDetailsFromCart(
        order.id,
        cartItemsForOrderDetails
      );

      // 4. Create payment URL
      const paymentUrl = await PaymentService.createPaymentUrl(
        order.id,
        totalAmount
      );

      return {
        success: true,
        orderId: order.id,
        paymentUrl,
      };
    } catch (error) {
      console.error("Checkout process failed:", error);

      // Cleanup: Delete created order if exists
      if (createdOrderId) {
        try {
          await OrderService.deleteOrder(createdOrderId);
          console.log("Cleaned up order:", createdOrderId);
        } catch (cleanupError) {
          console.error("Failed to cleanup order:", cleanupError);
        }
      }

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra trong quá trình thanh toán",
      };
    }
  }

  /**
   * Handle successful payment completion
   */
  static async handlePaymentSuccess(orderId: string): Promise<void> {
    try {
      // Clear cart
      await CartService.clearAllCart();

      console.log("Payment success handled for order:", orderId);
    } catch (error) {
      console.error("Error handling payment success:", error);
      throw error;
    }
  }

  /**
   * Handle failed payment
   */
  static async handlePaymentFailure(orderId: string): Promise<void> {
    try {
      // Delete order and order details
      await OrderService.deleteOrder(orderId);

      console.log("Payment failure handled, order deleted:", orderId);
    } catch (error) {
      console.error("Error handling payment failure:", error);
      throw error;
    }
  }

  /**
   * Validate checkout data
   */
  static validateCheckoutData(
    cartItems: CartResponse[],
    customerInfo: CheckoutRequest
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate cart items
    if (!cartItems || cartItems.length === 0) {
      errors.push("Giỏ hàng trống");
    }

    // Validate customer info
    if (!customerInfo.customerName.trim()) {
      errors.push("Tên khách hàng không được để trống");
    }

    if (!customerInfo.phoneNumber.trim()) {
      errors.push("Số điện thoại không được để trống");
    } else if (
      !/^[0-9]{10,11}$/.test(customerInfo.phoneNumber.replace(/\s/g, ""))
    ) {
      errors.push("Số điện thoại không hợp lệ");
    }

    if (!customerInfo.address.trim()) {
      errors.push("Địa chỉ không được để trống");
    }

    // Validate cart item quantities and prices
    for (const item of cartItems) {
      if (!item.quantity || item.quantity <= 0) {
        errors.push(`Số lượng sản phẩm ${item.productName} không hợp lệ`);
      }
      if (!item.price || item.price <= 0) {
        errors.push(`Giá sản phẩm ${item.productName} không hợp lệ`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Calculate checkout summary
   */
  static calculateCheckoutSummary(cartItems: CartResponse[]): {
    subtotal: number;
    tax: number;
    total: number;
    itemCount: number;
  } {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );

    const tax = 0; // No tax for now
    const total = subtotal + tax;
    const itemCount = cartItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    return {
      subtotal,
      tax,
      total,
      itemCount,
    };
  }
}
