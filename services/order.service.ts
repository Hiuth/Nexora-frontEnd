import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse } from "@/types/api";
import type { OrderResponse } from "@/types/api";
import type { CreateOrderRequest, UpdateOrderRequest } from "@/types/requests";

export class OrderService {
  /**
   * Create a new order
   */
  static async createOrder(
    request: CreateOrderRequest
  ): Promise<OrderResponse> {
    try {
      const formData = new FormData();
      formData.append("status", request.status);
      formData.append("totalAmount", request.totalAmount.toString());
      formData.append("customerName", request.customerName);
      formData.append("phoneNumber", request.phoneNumber);
      formData.append("address", request.address);

      const response = await apiClient.postFormData<OrderResponse>(
        API_CONFIG.ENDPOINTS.ORDER.CREATE,
        formData
      );
      return response.result;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  /**
   * Update an existing order
   */
  static async updateOrder(
    orderId: string,
    request: UpdateOrderRequest
  ): Promise<OrderResponse> {
    try {
      const formData = new FormData();

      if (request.status) {
        formData.append("status", request.status);
      }
      if (request.totalAmount !== undefined) {
        formData.append("totalAmount", request.totalAmount.toString());
      }
      if (request.customerName) {
        formData.append("customerName", request.customerName);
      }
      if (request.phoneNumber) {
        formData.append("phoneNumber", request.phoneNumber);
      }
      if (request.address) {
        formData.append("address", request.address);
      }

      const response = await apiClient.putFormData<OrderResponse>(
        `${API_CONFIG.ENDPOINTS.ORDER.UPDATE}/${orderId}`,
        formData
      );
      return response.result;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }

  /**
   * Get orders by current account (authenticated user)
   */
  static async getOrdersByAccount(): Promise<OrderResponse[]> {
    try {
      const response = await apiClient.get<OrderResponse[]>(
        API_CONFIG.ENDPOINTS.ORDER.GET_BY_ACCOUNT_ID
      );
      return response.result || [];
    } catch (error) {
      console.error("Error fetching orders by account:", error);
      throw error;
    }
  }

  /**
   * Get all orders (Admin only)
   */
  static async getAllOrders(): Promise<OrderResponse[]> {
    try {
      const response = await apiClient.get<OrderResponse[]>(
        API_CONFIG.ENDPOINTS.ORDER.GET_ALL
      );
      return response.result || [];
    } catch (error) {
      console.error("Error fetching all orders:", error);
      throw error;
    }
  }

  /**
   * Delete an order
   */
  static async deleteOrder(orderId: string): Promise<string> {
    try {
      const response = await apiClient.delete<string>(
        `${API_CONFIG.ENDPOINTS.ORDER.DELETE}/${orderId}`
      );
      return response.result || "Order deleted successfully";
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }

  /**
   * Get order status options for frontend
   */
  static getOrderStatuses(): Array<{ value: string; label: string }> {
    return [
      { value: "PENDING", label: "Chờ xử lý" },
      { value: "CONFIRMED", label: "Đã xác nhận" },
      { value: "PROCESSING", label: "Đang xử lý" },
      { value: "SHIPPED", label: "Đã gửi hàng" },
      { value: "DELIVERED", label: "Đã giao hàng" },
      { value: "CANCELLED", label: "Đã hủy" },
      { value: "RETURNED", label: "Đã trả hàng" },
    ];
  }

  /**
   * Get order status label in Vietnamese
   */
  static getOrderStatusLabel(status: string): string {
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
  static getOrderStatusColor(status: string): string {
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
}
