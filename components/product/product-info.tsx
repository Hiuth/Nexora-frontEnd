"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Minus, Plus, Share2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/mock-data";
import { CartService } from "@/services/cart.service";
import type { Product, PcBuildItem } from "@/lib/types";

interface ProductInfoProps {
  product: Product;
  isPcBuild?: boolean;
  pcBuildItems?: PcBuildItem[];
}

export function ProductInfo({ product, isPcBuild = false, pcBuildItems = [] }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // Kiểm tra có sản phẩm PC Build nào hết hàng không
  const hasOutOfStockItems = isPcBuild && pcBuildItems.some(item => item.stockQuantity === 0);
  
  // Kiểm tra có thể thêm vào giỏ hàng không
  const canAddToCart = user && (isPcBuild 
    ? !hasOutOfStockItems // PC Build: cần đăng nhập và không hết hàng
    : (product.stockQuantity > 0)); // Product thường: kiểm tra stock

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    // PC Build không giới hạn số lượng, Product thường kiểm tra stock
    if (isPcBuild || quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    try {
      if (isPcBuild) {
        // Xử lý PC Build: thêm từng component vào giỏ hàng
        for (const item of pcBuildItems) {
          await CartService.addToCart(item.productId, item.quantity);
          // Thêm vào local cart context (cần tạo Product object từ PcBuildItem)
          const productForCart = {
            id: item.productId,
            productName: item.productName,
            price: item.price,
            thumbnail: item.thumbnail,
            brandId: item.brandId || "",
            brandName: item.brandName || "",
            categoryId: "",
            categoryName: "",
            stockQuantity: item.stockQuantity,
            warrantyPeriod: 36,
            createdAt: new Date().toISOString()
          } as Product;
          addItem(productForCart, item.quantity);
        }
        
        toast({
          title: "Đã thêm vào giỏ hàng",
          description: `Đã thêm tất cả linh kiện của ${product.productName} vào giỏ hàng`,
        });
      } else {
        // Xử lý Product thường
        await CartService.addToCart(product.id, quantity);
        addItem(product, quantity);
        
        toast({
          title: "Đã thêm vào giỏ hàng",
          description: `Đã thêm ${quantity} ${product.productName} vào giỏ hàng`,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    setIsAddingToCart(true);

    try {
      // Add to cart via API first
      await CartService.addToCart(product.id, quantity);

      // Add to local cart context
      addItem(product, quantity);

      // Navigate to checkout
      router.push("/checkout");
    } catch (error) {
      console.error("Error adding to cart for buy now:", error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
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
            {product.brandName}
          </Badge>
          <Badge variant="outline" className="text-xs">
            SKU: PC-{product.id.toString().padStart(6, "0")}
          </Badge>
        </div>

        <div className="flex items-start justify-between mb-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex-1">
            {product.productName}
          </h1>
          {product.stockQuantity === 0 && (
            <Badge variant="destructive" className="ml-3 text-sm font-semibold">
              Hết hàng
            </Badge>
          )}
        </div>

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
            <span className="text-red-600 font-semibold">✗ Sản phẩm hiện đã hết hàng</span>
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
                disabled={isPcBuild ? false : quantity >= product.stockQuantity}
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
            disabled={!canAddToCart || isAddingToCart}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
          </Button>
          <Button size="lg" variant="outline" className="border-gray-300">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Button
          variant="secondary"
          size="lg"
          className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold border border-gray-300 shadow-sm"
          disabled={!canAddToCart || isAddingToCart}
          onClick={handleBuyNow}
        >
          {isAddingToCart ? "Đang xử lý..." : "Mua ngay"}
        </Button>
        
        {/* Thông báo cho việc thêm vào giỏ hàng */}
        <div className="mt-3">
          {!user && (
            <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200">
              <strong>Vui lòng đăng nhập</strong> để thực hiện việc thêm vào giỏ hàng
            </p>
          )}
          {user && isPcBuild && hasOutOfStockItems && (
            <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200">
              Một số linh kiện đã hết hàng, không thể thêm vào giỏ hàng
            </p>
          )}
          {user && !isPcBuild && product.stockQuantity === 0 && (
            <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200">
              Sản phẩm hiện tại đã hết hàng
            </p>
          )}
        </div>
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
