"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { products, brands, subCategories, categories } from "@/lib/mock-data";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProducts } from "@/components/product/related-products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card>
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                Không tìm thấy sản phẩm
              </h2>
              <p className="text-gray-600 mb-6">
                Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/products">Quay lại danh sách sản phẩm</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const brand = brands.find((b) => b.id === product.brandId);
  const subCategory = subCategories.find((s) => s.id === product.subCategoryId);
  const category = categories.find((c) => c.id === subCategory?.categoryId);

  // Related products
  const relatedProducts = products
    .filter(
      (p) => p.subCategoryId === product.subCategoryId && p.id !== product.id
    )
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-blue-600 transition-colors"
            >
              Sản phẩm
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${category?.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {category?.categoryName}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {product.productName}
            </span>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 hover:bg-blue-50 hover:text-blue-600"
          >
            <Link href="/products">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Link>
          </Button>

          {/* Product Overview */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12 lg:items-start">
            <div className="h-full">
              <ProductImageGallery product={product} />
            </div>
            <div className="h-full">
              <ProductInfo product={product} brand={brand} />
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-8 lg:mb-12">
            <ProductTabs
              product={product}
              brand={brand}
              category={category}
              subCategory={subCategory}
            />
          </div>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
