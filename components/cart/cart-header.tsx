"use client";

import { ShoppingCart, Package } from "lucide-react";

interface CartHeaderProps {
  itemCount: number;
}

export function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Giỏ hàng của bạn
            </h1>
            <p className="text-gray-600 mt-1">
              {itemCount > 0 ? (
                <>
                  Bạn có{" "}
                  <span className="font-semibold text-blue-600">
                    {itemCount}
                  </span>{" "}
                  sản phẩm
                </>
              ) : (
                "Chưa có sản phẩm nào"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
