"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Minus,
  Plus,
  Heart,
  Share2,
  ChevronLeft,
} from "lucide-react";
import {
  products,
  brands,
  subCategories,
  categories,
  formatPrice,
} from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number.parseInt(params.id as string);
  const product = products.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Không tìm thấy sản phẩm
              </h2>
              <Button asChild>
                <Link href="/products">Quay lại danh sách sản phẩm</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const brand = brands.find((b) => b.brand_id === product.brand_id);
  const subCategory = subCategories.find((s) => s.id === product.subCategoryId);
  const category = categories.find((c) => c.id === subCategory?.category_id);

  // Mock images for gallery
  const productImages = [
    product.thumbnail,
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ];

  // Related products
  const relatedProducts = products
    .filter(
      (p) => p.subCategoryId === product.subCategoryId && p.id !== product.id
    )
    .slice(0, 4);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock_quantity) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `Đã thêm ${quantity} ${product.product_Name} vào giỏ hàng`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground">
              Sản phẩm
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${category?.id}`}
              className="hover:text-foreground"
            >
              {category?.categoryName}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.product_Name}</span>
          </div>

          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/products">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div>
              <Card className="overflow-hidden mb-4">
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={productImages[selectedImage] || product.thumbnail}
                    alt={product.product_Name}
                    fill
                    className="object-cover"
                  />
                  {product.stock_quantity === 0 && (
                    <Badge className="absolute top-4 right-4 bg-destructive">
                      Hết hàng
                    </Badge>
                  )}
                </div>
              </Card>
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.product_Name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  {brand?.brand_Name}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  {product.product_Name}
                </h1>
                <p className="text-muted-foreground">
                  SKU: PC-{product.id.toString().padStart(6, "0")}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.stock_quantity > 0 ? (
                    <>Còn {product.stock_quantity} sản phẩm</>
                  ) : (
                    <span className="text-destructive font-semibold">
                      Hết hàng
                    </span>
                  )}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Số lượng
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={increaseQuantity}
                        disabled={quantity >= product.stock_quantity}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Tổng: {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1"
                    disabled={product.stock_quantity === 0}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button size="lg" variant="outline">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button variant="secondary" size="lg" className="w-full">
                  Mua ngay
                </Button>
              </div>

              <Separator className="my-6" />

              {/* Product Features */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Thông tin nổi bật</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Sản phẩm chính hãng 100%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Bảo hành chính hãng theo nhà sản xuất</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Hỗ trợ đổi trả trong 7 ngày</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Giao hàng nhanh toàn quốc</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Mô tả</TabsTrigger>
                  <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
                  <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">Mô tả sản phẩm</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    {product.product_Name} là sản phẩm cao cấp từ thương hiệu{" "}
                    {brand?.brand_Name}, được thiết kế để mang lại hiệu suất tối
                    ưu cho mọi nhu cầu sử dụng. Với công nghệ tiên tiến và chất
                    lượng vượt trội, sản phẩm này là lựa chọn hoàn hảo cho những
                    ai đang tìm kiếm giải pháp {category?.categoryName} đáng tin
                    cậy.
                  </p>
                </TabsContent>
                <TabsContent value="specs" className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">
                    Thông số kỹ thuật
                  </h3>
                  <div className="space-y-3">
                    <div className="flex py-2 border-b border-border">
                      <span className="font-medium w-1/3">Thương hiệu</span>
                      <span className="text-muted-foreground">
                        {brand?.brand_Name}
                      </span>
                    </div>
                    <div className="flex py-2 border-b border-border">
                      <span className="font-medium w-1/3">Danh mục</span>
                      <span className="text-muted-foreground">
                        {category?.categoryName}
                      </span>
                    </div>
                    <div className="flex py-2 border-b border-border">
                      <span className="font-medium w-1/3">Loại</span>
                      <span className="text-muted-foreground">
                        {subCategory?.subcategoryName}
                      </span>
                    </div>
                    <div className="flex py-2 border-b border-border">
                      <span className="font-medium w-1/3">Tình trạng</span>
                      <span className="text-muted-foreground">
                        {product.stock_quantity > 0 ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </div>
                    <div className="flex py-2 border-b border-border">
                      <span className="font-medium w-1/3">Bảo hành</span>
                      <span className="text-muted-foreground">36 tháng</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <h3 className="font-semibold text-lg mb-4">
                    Đánh giá từ khách hàng
                  </h3>
                  <p className="text-muted-foreground">
                    Chưa có đánh giá nào cho sản phẩm này.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                Sản phẩm liên quan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
