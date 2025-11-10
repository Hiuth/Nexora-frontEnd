"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { CartService } from "@/services/cart.service";
import type { CartResponse } from "@/types/api";

export function useCartPage() {
  const { removeItem, updateQuantity, clearCart, addItem } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [apiCartItems, setApiCartItems] = useState<CartResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Đợi auth loading hoàn tất trước khi quyết định hiển thị dialog
    if (authLoading) return;

    if (!isAuthenticated) {
      setShowLoginDialog(true);
    } else {
      setShowLoginDialog(false);
      loadCartFromAPI();
    }
  }, [isAuthenticated, authLoading]);

  const loadCartFromAPI = async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const cartData = await CartService.getCartByAccount();
      setApiCartItems(cartData);

      // Sync with local cart context
      syncCartToLocal(cartData);
    } catch (error) {
      console.error("Error loading cart:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải giỏ hàng. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const syncCartToLocal = (cartData: CartResponse[]) => {
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
  };

  const handleUpdateQuantity = async (cartId: string, quantity: number) => {
    setUpdatingItems((prev) => new Set(prev).add(cartId));

    try {
      if (quantity <= 0) {
        await handleRemoveItem(cartId);
        return;
      }

      await CartService.updateCart(cartId, quantity);

      // Find the product ID from the cart item
      const cartItem = apiCartItems.find((item) => item.id === cartId);
      const productId = cartItem?.productId;

      setApiCartItems((prev) =>
        prev.map((item) => (item.id === cartId ? { ...item, quantity } : item))
      );

      // Update local cart context with product ID
      if (productId) {
        updateQuantity(productId, quantity);
      }

      toast({
        title: "Đã cập nhật",
        description: "Số lượng sản phẩm đã được cập nhật",
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật số lượng. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cartId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (cartId: string) => {
    setUpdatingItems((prev) => new Set(prev).add(cartId));

    try {
      // Find the product ID before removing
      const cartItem = apiCartItems.find((item) => item.id === cartId);
      const productId = cartItem?.productId;

      await CartService.clearCart(cartId);

      setApiCartItems((prev) => prev.filter((item) => item.id !== cartId));

      // Remove from local cart context using product ID
      if (productId) {
        removeItem(productId);
      }

      toast({
        title: "Đã xóa",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng",
      });
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cartId);
        return newSet;
      });
    }
  };

  const handleClearCart = async () => {
    try {
      await CartService.clearAllCart();

      setApiCartItems([]);
      clearCart();

      toast({
        title: "Đã xóa",
        description: "Đã xóa tất cả sản phẩm khỏi giỏ hàng",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa giỏ hàng. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const totalCartPrice = apiCartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  return {
    showLoginDialog,
    setShowLoginDialog,
    apiCartItems,
    isLoading,
    authLoading,
    updatingItems,
    totalCartPrice,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    loadCartFromAPI,
  };
}
