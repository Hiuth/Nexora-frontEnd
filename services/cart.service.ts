import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse } from "@/types/api";
import type { CartResponse } from "@/types/api";
import type { AddToCartRequest, UpdateCartRequest } from "@/types/requests";
import type { CartItem } from "@/lib/types";

export class CartService {
  /**
   * Add product to cart
   */
  static async addToCart(
    productId: string,
    quantity: number = 1
  ): Promise<CartResponse> {
    try {
      const formData = new FormData();
      formData.append("quantity", quantity.toString());

      const response = await apiClient.postFormData<CartResponse>(
        `${API_CONFIG.ENDPOINTS.CART.ADD}/${productId}`,
        formData
      );
      return response.result;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }

  /**
   * Update cart item quantity
   */
  static async updateCart(
    cartId: string,
    quantity: number
  ): Promise<CartResponse> {
    try {
      const formData = new FormData();
      formData.append("quantity", quantity.toString());

      const response = await apiClient.putFormData<CartResponse>(
        `${API_CONFIG.ENDPOINTS.CART.UPDATE}/${cartId}`,
        formData
      );
      return response.result;
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  }

  /**
   * Get cart items by account ID (current user)
   */
  static async getCartByAccount(): Promise<CartResponse[]> {
    try {
      const response = await apiClient.get<CartResponse[]>(
        API_CONFIG.ENDPOINTS.CART.GET_BY_ACCOUNT
      );
      return response.result || [];
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }

  /**
   * Clear specific cart item
   */
  static async clearCart(cartId: string): Promise<string> {
    try {
      const response = await apiClient.delete<string>(
        `${API_CONFIG.ENDPOINTS.CART.CLEAR}/${cartId}`
      );
      return response.result || "Cart item deleted successfully";
    } catch (error) {
      console.error("Error clearing cart item:", error);
      throw error;
    }
  }

  /**
   * Clear all cart items for current user
   */
  static async clearAllCart(): Promise<string> {
    try {
      const response = await apiClient.delete<string>(
        API_CONFIG.ENDPOINTS.CART.CLEAR_ALL
      );
      return response.result || "All cart items deleted successfully";
    } catch (error) {
      console.error("Error clearing all cart items:", error);
      throw error;
    }
  }

  // Legacy methods for backward compatibility with existing cart context
  static async getCartItems(accountId: string): Promise<CartItem[]> {
    const cartResponses = await this.getCartByAccount();
    return cartResponses.map(this.mapCartResponseToCartItem);
  }

  static async updateCartItem(
    cartItemId: string,
    quantity: number
  ): Promise<CartItem> {
    const cartResponse = await this.updateCart(cartItemId, quantity);
    return this.mapCartResponseToCartItem(cartResponse);
  }

  static async removeFromCart(cartItemId: string): Promise<void> {
    await this.clearCart(cartItemId);
  }

  // Helper function to map API CartResponse to local CartItem type
  private static mapCartResponseToCartItem(
    cartResponse: CartResponse
  ): CartItem {
    return {
      id: cartResponse.id,
      productId: cartResponse.productId,
      accountId: cartResponse.accountId,
      quantity: cartResponse.quantity || 0,
      productName: cartResponse.productName,
      thumbnail: cartResponse.thumbnail,
      price: cartResponse.price || 0,
      stockQuantity: cartResponse.stockQuantity || 0,
    };
  }
}
