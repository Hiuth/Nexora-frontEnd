"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, Sparkles, Heart } from "lucide-react";

export function EmptyCart() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Animated Icon */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shadow-sm">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
          </div>
          <div className="absolute -top-1 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center animate-bounce shadow-sm">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng trống</h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Bạn chưa có sản phẩm nào trong giỏ hàng.
            <br />
            Hãy khám phá những sản phẩm tuyệt vời của chúng tôi!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-60 h-12 px-6 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link href="/">
              <Package className="mr-2 h-5 w-5" />
              Khám phá sản phẩm
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-60 h-12 px-6 text-base border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
          >
            <Link href="/pc-builder">
              <Heart className="mr-2 h-5 w-5" />
              Xây dựng PC
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
