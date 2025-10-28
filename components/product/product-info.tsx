"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Minus, Plus, Share2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/mock-data";
import type { Product, Brand } from "@/lib/types";

interface ProductInfoProps {
  product: Product;
  brand?: Brand;
}

export function ProductInfo({ product, brand }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `Đã thêm ${quantity} ${product.productName} vào giỏ hàng`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Product Basic Info */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            {brand?.brandName}
          </Badge>
          <Badge variant="outline" className="text-xs">
            SKU: PC-{product.id.toString().padStart(6, "0")}
          </Badge>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
          {product.productName}
        </h1>

        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-3xl md:text-4xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          {product.stockQuantity > 0 ? (
            <span className="text-green-600 font-medium">
              ✓ Còn {product.stockQuantity} sản phẩm
            </span>
          ) : (
            <span className="text-red-600 font-semibold">✗ Hết hàng</span>
          )}
        </p>
      </div>

      <Separator />

      {/* Quantity & Actions */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-2 block text-gray-700">
            Số lượng
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={increaseQuantity}
                disabled={quantity >= product.stockQuantity}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              Tổng:{" "}
              <span className="font-semibold text-blue-600">
                {formatPrice(product.price * quantity)}
              </span>
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={product.stockQuantity === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Thêm vào giỏ hàng
          </Button>
          <Button size="lg" variant="outline" className="border-gray-300">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Button
          variant="secondary"
          size="lg"
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
        >
          Mua ngay
        </Button>
      </div>

      <Separator />

      {/* Product Features */}
      <Card className="border-blue-100 bg-blue-50/30">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 text-gray-900">
            Cam kết chất lượng
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 text-base">✓</span>
              <span className="text-gray-700">Sản phẩm chính hãng 100%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 text-base">✓</span>
              <span className="text-gray-700">
                Bảo hành chính hãng {product.warrantyPeriod || 36} tháng
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 text-base">✓</span>
              <span className="text-gray-700">Hỗ trợ đổi trả trong 7 ngày</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 text-base">✓</span>
              <span className="text-gray-700">Giao hàng nhanh toàn quốc</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
