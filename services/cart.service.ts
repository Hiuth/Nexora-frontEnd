import { CartItem } from "@/lib/types";
import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";

export class CartService {
  // Use mock data for now, switch to API when ready
  private static USE_API = false;

  // Simulate API delay for mock data
  private static async delay(ms: number = 150): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get cart items for user
  static async getCartItems(accountId: string): Promise<CartItem[]> {
    if (this.USE_API) {
      try {
        const response = await apiClient.get<CartItem[]>(
          `${API_CONFIG.ENDPOINTS.CART}/${accountId}`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch cart items from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock cart data
  }

  // Add item to cart
  static async addToCart(
    accountId: string,
    productId: string,
    quantity: number = 1
  ): Promise<CartItem> {
    if (this.USE_API) {
      try {
        const response = await apiClient.post<CartItem>(
          API_CONFIG.ENDPOINTS.CART,
          { accountId, productId, quantity }
        );
        return response.data;
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        throw error;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    // TODO: Return mock cart item
    throw new Error("Mock implementation not complete");
  }

  // Update cart item quantity
  static async updateCartItem(
    cartItemId: string,
    quantity: number
  ): Promise<CartItem> {
    if (this.USE_API) {
      try {
        const response = await apiClient.put<CartItem>(
          `${API_CONFIG.ENDPOINTS.CART}/${cartItemId}`,
          { quantity }
        );
        return response.data;
      } catch (error) {
        console.error("Failed to update cart item:", error);
        throw error;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    // TODO: Return updated mock cart item
    throw new Error("Mock implementation not complete");
  }

  // Remove item from cart
  static async removeFromCart(cartItemId: string): Promise<void> {
    if (this.USE_API) {
      try {
        await apiClient.delete(`${API_CONFIG.ENDPOINTS.CART}/${cartItemId}`);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
        throw error;
      }
    } else {
      // Mock data with simulated delay
      await this.delay();
      // TODO: Mock remove implementation
    }
  }

  // Clear entire cart
  static async clearCart(accountId: string): Promise<void> {
    if (this.USE_API) {
      try {
        await apiClient.delete(
          `${API_CONFIG.ENDPOINTS.CART}/clear/${accountId}`
        );
      } catch (error) {
        console.error("Failed to clear cart:", error);
        throw error;
      }
    } else {
      // Mock data with simulated delay
      await this.delay();
      // TODO: Mock clear implementation
    }
  }

  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
    console.log(`CartService API mode: ${enable ? "enabled" : "disabled"}`);
  }
}
