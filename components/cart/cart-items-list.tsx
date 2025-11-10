"use client";

import { CartItemCard } from "./cart-item-card";
import { CartActions } from "./cart-actions";
import type { CartResponse } from "@/types/api";

interface CartItemsListProps {
  cartItems: CartResponse[];
  updatingItems: Set<string>;
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export function CartItemsList({
  cartItems,
  updatingItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartItemsListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {cartItems.map((cartItem) => (
        <CartItemCard
          key={cartItem.id}
          item={{
            product: {
              id: cartItem.productId,
              productName: cartItem.productName,
              price: cartItem.price || 0,
              thumbnail: cartItem.thumbnail,
              stockQuantity: cartItem.stockQuantity || 0,
            } as any,
            quantity: cartItem.quantity || 0,
          }}
          onUpdateQuantity={(productId, quantity) =>
            onUpdateQuantity(cartItem.id, quantity)
          }
          onRemoveItem={() => onRemoveItem(cartItem.id)}
          isUpdating={updatingItems.has(cartItem.id)}
        />
      ))}

      <CartActions onClearCart={onClearCart} />
    </div>
  );
}
