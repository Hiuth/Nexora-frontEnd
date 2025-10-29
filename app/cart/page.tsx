"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/lib/cart-context";
import { EmptyCart } from "@/components/cart/empty-cart";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { OrderSummary } from "@/components/cart/order-summary";
import { CartActions } from "@/components/cart/cart-actions";
import { CartHeader } from "@/components/cart/cart-header";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <EmptyCart />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col gradient-background">
      <Header />
      <CartHeader itemCount={items.length} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              ))}

              <CartActions onClearCart={clearCart} />
            </div>

            {/* Order Summary */}
            <OrderSummary totalPrice={totalPrice} itemCount={items.length} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
