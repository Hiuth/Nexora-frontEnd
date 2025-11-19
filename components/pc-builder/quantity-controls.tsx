"use client";

import React, { useState, useEffect } from "react";
import { CartService } from "@/services/cart.service";
import { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface QuantityControlsProps {
  product: Product;
  currentQuantity: number;
  onQuantityChange: (quantity: number) => void;
  disabled?: boolean;
  showStock?: boolean;
}

export function QuantityControls({
  product,
  currentQuantity,
  onQuantityChange,
  disabled = false,
  showStock = true
}: QuantityControlsProps) {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Get current quantity in cart
  useEffect(() => {
    const fetchCartQuantity = async () => {
      try {
        const cartItems = await CartService.getCartByAccount();
        const existingItem = cartItems.find(item => item.productId === product.id);
        setCartQuantity(existingItem?.quantity || 0);
      } catch (error) {
        console.error("Failed to fetch cart quantity:", error);
        setCartQuantity(0);
      }
    };

    fetchCartQuantity();
  }, [product.id]);

  // Calculate total quantity (cart + current selection)
  const totalQuantity = cartQuantity + currentQuantity;

  // Check if we can increase quantity
  const canIncrease = totalQuantity < product.stockQuantity;
  const canDecrease = currentQuantity > 1;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const newTotalQuantity = cartQuantity + newQuantity;
    
    if (newTotalQuantity > product.stockQuantity) {
      toast({
        title: "Vượt quá số lượng trong kho",
        description: `Sản phẩm này đã có ${cartQuantity} trong giỏ hàng. Tổng cộng không thể vượt quá ${product.stockQuantity} sản phẩm.`,
        variant: "destructive",
      });
      return;
    }

    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    if (canDecrease && !disabled) {
      handleQuantityChange(currentQuantity - 1);
    }
  };

  const handleIncrease = () => {
    if (canIncrease && !disabled) {
      handleQuantityChange(currentQuantity + 1);
    }
  };

  return (
    <div className="space-y-2">
      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500">Số lượng:</label>
        <div className="flex items-center gap-1">
          <button
            onClick={handleDecrease}
            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canDecrease || disabled}
          >
            -
          </button>
          <span className="w-8 text-center text-sm">
            {currentQuantity}
          </span>
          <button
            onClick={handleIncrease}
            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canIncrease || disabled}
          >
            +
          </button>
        </div>
      </div>

      {/* Stock Information */}
      {showStock && (
        <div className="text-xs space-y-1">
          {/* Cart quantity info */}
          {cartQuantity > 0 && (
            <p className="text-blue-600">
              Đã có {cartQuantity} trong giỏ hàng
            </p>
          )}
          
          {/* Stock warning */}
          {product.stockQuantity <= 5 && (
            <p className="text-orange-600">
              Còn {product.stockQuantity} sản phẩm trong kho
            </p>
          )}
          
          {/* Total quantity info */}
          {totalQuantity > 0 && (
            <p className="text-gray-600">
              Tổng: {totalQuantity}/{product.stockQuantity}
            </p>
          )}
          
          {/* Warning when approaching stock limit */}
          {totalQuantity >= product.stockQuantity && (
            <p className="text-red-600 font-medium">
              Đã đạt giới hạn kho
            </p>
          )}
        </div>
      )}
    </div>
  );
}