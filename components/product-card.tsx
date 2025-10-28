"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.productName} đã được thêm vào giỏ hàng`,
    });
  };

  if (compact) {
    return (
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg bg-white border border-gray-200 rounded-lg">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 rounded-t-lg">
            <Image
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.productName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.stockQuantity === 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-1">
                Hết hàng
              </Badge>
            )}
          </div>
        </Link>

        <CardContent className="p-3">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium text-xs mb-2 line-clamp-2 text-gray-700 leading-tight">
              {product.productName}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-red-600">
              {formatPrice(product.price)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all"
              disabled={product.stockQuantity === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg bg-white border border-gray-200 rounded-lg w-full">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 rounded-t-lg">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.stockQuantity === 0 && (
            <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1">
              Hết hàng
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-2 sm:p-3 md:p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 text-gray-700 leading-tight min-h-[32px] sm:min-h-[40px]">
            {product.productName}
          </h3>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1 mb-2 sm:mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400"
            />
          ))}
          <span className="text-[10px] sm:text-xs text-gray-400 ml-0.5 sm:ml-1">
            (128)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-base md:text-lg font-bold text-red-600">
            {formatPrice(product.price)}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all"
            disabled={product.stockQuantity === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
