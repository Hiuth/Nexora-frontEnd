"use client";

import React from "react";
import { CartService } from "@/services/cart.service";
import { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface ProductQuantityValidatorProps {
  products: { product: Product; quantity: number }[];
  onValidationComplete: (isValid: boolean, errors?: string[]) => void;
  children: React.ReactNode;
}

export function ProductQuantityValidator({
  products,
  onValidationComplete,
  children
}: ProductQuantityValidatorProps) {
  const { toast } = useToast();

  const validateQuantities = async (): Promise<boolean> => {
    try {
      // Get current cart items
      const cartItems = await CartService.getCartByAccount();
      const validationErrors: string[] = [];

      // Validate each product's quantity against stock and existing cart
      for (const { product, quantity } of products) {
        const existingCartItem = cartItems.find(item => item.productId === product.id);
        const currentCartQuantity = existingCartItem?.quantity || 0;
        const totalQuantity = currentCartQuantity + quantity;

        if (totalQuantity > product.stockQuantity) {
          validationErrors.push(
            `${product.productName}: Đã có ${currentCartQuantity} trong giỏ hàng, không thể thêm ${quantity} nữa (Tồn kho: ${product.stockQuantity})`
          );
        }
      }

      const isValid = validationErrors.length === 0;
      onValidationComplete(isValid, validationErrors);

      if (!isValid) {
        toast({
          title: "Không thể thêm vào giỏ hàng",
          description: validationErrors.join("; "),
          variant: "destructive",
        });
      }

      return isValid;
    } catch (error) {
      console.error("Error validating quantities:", error);
      const errorMessage = "Không thể kiểm tra số lượng trong giỏ hàng";
      onValidationComplete(false, [errorMessage]);
      
      toast({
        title: "Lỗi",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };

  // Expose validation function through context or ref
  // This is optional for component wrapper usage
  // const validatorRef = React.useRef<{ validateQuantities: () => Promise<boolean> }>(null);

  return <>{children}</>;
}

// Hook for easier usage
export function useQuantityValidator() {
  const validateProductQuantities = async (
    products: { product: Product; quantity: number }[]
  ): Promise<{ isValid: boolean; errors?: string[] }> => {
    try {
      const cartItems = await CartService.getCartByAccount();
      const validationErrors: string[] = [];

      for (const { product, quantity } of products) {
        const existingCartItem = cartItems.find(item => item.productId === product.id);
        const currentCartQuantity = existingCartItem?.quantity || 0;
        const totalQuantity = currentCartQuantity + quantity;

        if (totalQuantity > product.stockQuantity) {
          validationErrors.push(
            `${product.productName}: Đã có ${currentCartQuantity} trong giỏ hàng, không thể thêm ${quantity} nữa (Tồn kho: ${product.stockQuantity})`
          );
        }
      }

      return {
        isValid: validationErrors.length === 0,
        errors: validationErrors.length > 0 ? validationErrors : undefined
      };
    } catch (error) {
      console.error("Error validating quantities:", error);
      return {
        isValid: false,
        errors: ["Không thể kiểm tra số lượng trong giỏ hàng"]
      };
    }
  };

  return { validateProductQuantities };
}