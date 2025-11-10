"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import { Product } from "@/lib/types";

interface CartItemData {
  product: Product;
  quantity: number;
}

interface CartItemCardProps {
  item: CartItemData;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  isUpdating?: boolean;
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemoveItem,
  isUpdating = false,
}: CartItemCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex gap-6">
          {/* Product Image */}
          <Link
            href={`/products/${item.product.id}`}
            className="relative flex-shrink-0"
          >
            <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-50 border-2 border-gray-100 group-hover:border-blue-300 transition-all duration-300 shadow-sm">
              <Image
                src={item.product.thumbnail || "/placeholder.svg"}
                alt={item.product.productName}
                width={112}
                height={112}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/products/${item.product.id}`}>
              <h3 className="font-semibold text-gray-900 text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                {item.product.productName}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              SKU: PC-{item.product.id.toString().padStart(6, "0")}
            </p>

            {/* Quantity and Price Row */}
            <div className="flex items-center justify-between gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  onClick={() =>
                    onUpdateQuantity(item.product.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1 || isUpdating}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center text-lg font-bold text-gray-900 px-2">
                  {isUpdating ? "..." : item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  onClick={() =>
                    onUpdateQuantity(item.product.id, item.quantity + 1)
                  }
                  disabled={
                    item.quantity >= item.product.stockQuantity || isUpdating
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600 mb-1">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatPrice(item.product.price)} / cái
                </p>
              </div>
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 h-11 w-11 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-xl"
            onClick={() => onRemoveItem(item.product.id)}
            disabled={isUpdating}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
