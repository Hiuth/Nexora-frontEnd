import { Order, OrderDetail } from "@/lib/types";
import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";
import { mockOrders } from "@/lib/mock-orders";

export class OrderService {
  // Use mock data for now, switch to API when ready
  private static USE_API = false;

  // Simulate API delay for mock data
  private static async delay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get orders for user
  static async getOrdersByAccountId(accountId: string): Promise<Order[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Order[]>(
          `${API_CONFIG.ENDPOINTS.ORDERS}/account/${accountId}`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch orders from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return mockOrders;
  }

  // Get order by ID
  static async getOrderById(orderId: string): Promise<Order | null> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<Order>(
          `${API_CONFIG.ENDPOINTS.ORDERS}/${orderId}`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch order from API:", error);
        return null;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return mockOrders.find((order) => order.id === orderId) || null;
  }

  // Get order details
  static async getOrderDetails(orderId: string): Promise<OrderDetail[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<OrderDetail[]>(
          `${API_CONFIG.ENDPOINTS.ORDERS}/${orderId}/details`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch order details from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock order details
  }

  // Create new order
  static async createOrder(orderData: {
    accountId: string;
    items: { productId: string; quantity: number; price: number }[];
    customerInfo: {
      customerName: string;
      phoneNumber: string;
      address: string;
    };
  }): Promise<Order> {
    if (this.USE_API) {
      try {
        const response = await apiClient.post<Order>(
          API_CONFIG.ENDPOINTS.ORDERS,
          orderData
        );
        return response.data;
      } catch (error) {
        console.error("Failed to create order:", error);
        throw error;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    // TODO: Return mock created order
    throw new Error("Mock implementation not complete");
  }

  // Update order status
  static async updateOrderStatus(
    orderId: string,
    status: string
  ): Promise<Order> {
    if (this.USE_API) {
      try {
        const response = await apiClient.put<Order>(
          `${API_CONFIG.ENDPOINTS.ORDERS}/${orderId}/status`,
          { status }
        );
        return response.data;
      } catch (error) {
        console.error("Failed to update order status:", error);
        throw error;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    // TODO: Return updated mock order
    throw new Error("Mock implementation not complete");
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(`OrderService API mode: ${enable ? "enabled" : "disabled"}`);
  }
}
