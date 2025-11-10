"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EmptyCart } from "@/components/cart/empty-cart";
import { CartItemsList } from "@/components/cart/cart-items-list";
import { OrderSummary } from "@/components/cart/order-summary";
import { CartHeader } from "@/components/cart/cart-header";
import { LoginRequiredDialog } from "@/components/cart/login-required-dialog";
import { CartLoading } from "@/components/cart/cart-loading";
import { useCartPage } from "@/hooks/use-cart-page";

export default function CartPage() {
  const {
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
  } = useCartPage();

  // Auth loading state - show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <CartLoading message="Đang kiểm tra đăng nhập..." />
        <Footer />
      </div>
    );
  }

  // Dialog yêu cầu đăng nhập
  if (showLoginDialog) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <LoginRequiredDialog
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
        />
        <Footer />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <CartLoading />
        <Footer />
      </div>
    );
  }

  // Empty cart state
  if (apiCartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <EmptyCart />
        <Footer />
      </div>
    );
  }

  // Main cart content
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <CartHeader itemCount={apiCartItems.length} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <CartItemsList
              cartItems={apiCartItems}
              updatingItems={updatingItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />

            <OrderSummary
              totalPrice={totalCartPrice}
              itemCount={apiCartItems.length}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
