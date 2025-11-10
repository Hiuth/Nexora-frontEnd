import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse } from "@/types/api";
import type { OrderDetailResponse } from "@/types/api";
import type { CreateOrderDetailRequest } from "@/types/requests";

export class OrderDetailService {
  /**
   * Create a new order detail
   */
  static async createOrderDetail(
    orderId: string,
    productId: string,
    request: CreateOrderDetailRequest
  ): Promise<OrderDetailResponse> {
    try {
      const formData = new FormData();
      formData.append("quantity", request.quantity.toString());
      formData.append("unitPrice", request.unitPrice.toString());

      const response = await apiClient.postFormData<OrderDetailResponse>(
        `${API_CONFIG.ENDPOINTS.ORDER_DETAIL.CREATE}/${orderId}/${productId}`,
        formData
      );
      return response.result;
    } catch (error) {
      console.error("Error creating order detail:", error);
      throw error;
    }
  }

  /**
   * Get order details by order ID
   */
  static async getOrderDetailsByOrderId(
    orderId: string
  ): Promise<OrderDetailResponse[]> {
    try {
      const response = await apiClient.get<OrderDetailResponse[]>(
        `${API_CONFIG.ENDPOINTS.ORDER_DETAIL.GET_BY_ORDER_ID}/${orderId}`
      );
      return response.result || [];
    } catch (error) {
      console.error("Error fetching order details:", error);
      throw error;
    }
  }

  /**
   * Delete all order details by order ID
   */
  static async deleteOrderDetailsByOrderId(orderId: string): Promise<string> {
    try {
      const response = await apiClient.delete<string>(
        `${API_CONFIG.ENDPOINTS.ORDER_DETAIL.DELETE_BY_ORDER_ID}/${orderId}`
      );
      return response.result || "Order details deleted successfully";
    } catch (error) {
      console.error("Error deleting order details by order ID:", error);
      throw error;
    }
  }

  /**
   * Delete specific order detail by ID
   */
  static async deleteOrderDetailById(orderDetailId: string): Promise<string> {
    try {
      const response = await apiClient.delete<string>(
        `${API_CONFIG.ENDPOINTS.ORDER_DETAIL.DELETE_BY_ID}/${orderDetailId}`
      );
      return response.result || "Order detail deleted successfully";
    } catch (error) {
      console.error("Error deleting order detail by ID:", error);
      throw error;
    }
  }

  /**
   * Calculate total amount from order details
   */
  static calculateOrderTotal(orderDetails: OrderDetailResponse[]): number {
    return orderDetails.reduce((total, detail) => {
      return total + detail.unitPrice * detail.quantity;
    }, 0);
  }

  /**
   * Calculate total quantity from order details
   */
  static calculateTotalQuantity(orderDetails: OrderDetailResponse[]): number {
    return orderDetails.reduce((total, detail) => {
      return total + detail.quantity;
    }, 0);
  }

  /**
   * Group order details by product for display
   */
  static groupOrderDetailsByProduct(
    orderDetails: OrderDetailResponse[]
  ): Map<string, OrderDetailResponse[]> {
    const grouped = new Map<string, OrderDetailResponse[]>();

    orderDetails.forEach((detail) => {
      if (!grouped.has(detail.productId)) {
        grouped.set(detail.productId, []);
      }
      grouped.get(detail.productId)!.push(detail);
    });

    return grouped;
  }

  /**
   * Validate order detail data before submission
   */
  static validateOrderDetail(request: CreateOrderDetailRequest): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!request.quantity || request.quantity <= 0) {
      errors.push("Số lượng phải lớn hơn 0");
    }

    if (!request.unitPrice || request.unitPrice <= 0) {
      errors.push("Đơn giá phải lớn hơn 0");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Format order detail for display
   */
  static formatOrderDetailForDisplay(detail: OrderDetailResponse): {
    productInfo: string;
    quantityInfo: string;
    priceInfo: string;
    totalInfo: string;
  } {
    return {
      productInfo: detail.productName || `Product ${detail.productId}`,
      quantityInfo: `${detail.quantity} sản phẩm`,
      priceInfo: this.formatCurrency(detail.unitPrice),
      totalInfo: this.formatCurrency(detail.unitPrice * detail.quantity),
    };
  }

  /**
   * Helper method to format currency
   */
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  /**
   * Create order details from cart items
   */
  static async createOrderDetailsFromCart(
    orderId: string,
    cartItems: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>
  ): Promise<OrderDetailResponse[]> {
    const createdDetails: OrderDetailResponse[] = [];

    try {
      for (const item of cartItems) {
        const request: CreateOrderDetailRequest = {
          quantity: item.quantity,
          unitPrice: item.price,
        };

        const detail = await this.createOrderDetail(
          orderId,
          item.productId,
          request
        );
        createdDetails.push(detail);
      }

      return createdDetails;
    } catch (error) {
      // If any creation fails, try to clean up created details
      for (const detail of createdDetails) {
        try {
          await this.deleteOrderDetailById(detail.id);
        } catch (cleanupError) {
          console.error("Error cleaning up order detail:", cleanupError);
        }
      }
      throw error;
    }
  }
}
