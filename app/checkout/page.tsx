"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/lib/cart-context";
import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { CustomerInfo } from "@/components/checkout/customer-info";
import { PaymentMethod } from "@/components/checkout/payment-method";
import { OrderSummary } from "@/components/checkout/order-summary";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    router.push("/order-success");
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.district &&
      formData.ward
    );
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      handleSubmit();
    }
  };

  return (
    <div className="flex min-h-screen flex-col gradient-background">
      <Header />
      <CheckoutHeader itemCount={items.length} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <form onSubmit={handleFormSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                <CustomerInfo
                  formData={formData}
                  onChange={handleInputChange}
                />

                <PaymentMethod
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                />
              </div>

              {/* Order Summary */}
              <OrderSummary
                items={items}
                totalPrice={totalPrice}
                isProcessing={isProcessing}
                onSubmit={handleSubmit}
              />
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
