"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Trash2, ArrowLeft } from "lucide-react";

interface CartActionsProps {
  onClearCart: () => void;
}

export function CartActions({ onClearCart }: CartActionsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button
          variant="outline"
          asChild
          className="w-full sm:w-auto h-12 px-6 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-xl"
        >
          <Link href="/products">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Tiếp tục mua sắm
          </Link>
        </Button>

        <Button
          variant="ghost"
          onClick={onClearCart}
          className="w-full sm:w-auto h-12 px-6 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-xl"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Xóa tất cả
        </Button>
      </div>
    </div>
  );
}
