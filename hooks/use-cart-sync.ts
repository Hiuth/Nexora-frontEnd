"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { CartService } from "@/services/cart.service";

/**
 * Hook để đồng bộ cart từ API vào local context
 * Sử dụng trong layout hoặc components cần hiển thị số lượng cart
 */
export function useCartSync() {
  const { clearCart, addItem } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      syncCartFromAPI();
    } else {
      // Clear local cart when not authenticated
      clearCart();
    }
  }, [isAuthenticated]);

  const syncCartFromAPI = async () => {
    try {
      const cartData = await CartService.getCartByAccount();

      // Clear local cart first
      clearCart();

      // Add each item to local cart
      cartData.forEach((cartItem) => {
        if (cartItem.quantity && cartItem.quantity > 0) {
          const product = {
            id: cartItem.productId,
            productName: cartItem.productName,
            price: cartItem.price || 0,
            thumbnail: cartItem.thumbnail,
            stockQuantity: cartItem.stockQuantity || 0,
          } as any;

          addItem(product, cartItem.quantity);
        }
      });
    } catch (error) {
      console.error("Error syncing cart from API:", error);
      // Don't show error toast here as this runs in background
    }
  };

  return { syncCartFromAPI };
}
