"use client";

import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CheckoutHeaderProps {
  itemCount: number;
}

export function CheckoutHeader({ itemCount }: CheckoutHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hover:bg-gray-100">
              <Link href="/cart">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Quay lại giỏ hàng
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
              <p className="text-gray-600 mt-1">
                Hoàn tất đơn hàng với{" "}
                <span className="font-semibold text-blue-600">{itemCount}</span>{" "}
                sản phẩm
              </p>
            </div>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>
      </div>
    </div>
  );
}
