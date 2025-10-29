"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SignUpAnimation } from "@/components/auth/sign-up-animation";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Main Content - Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Left Column - Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl">
                <SignUpForm />
              </div>
            </div>

            {/* Right Column - Animation */}
            <div className="order-1 lg:order-2">
              <SignUpAnimation />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
