"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { ProductService } from "@/services/product.service";
import { Product } from "@/lib/types";
import { useProductImages } from "@/hooks/use-product-images";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProducts } from "@/components/product/related-products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Hook to load product images
  const {
    images: productImages,
    loading: imagesLoading,
    error: imagesError,
  } = useProductImages(product?.id || null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        console.log("Loading product with ID:", productId);
        const productData = await ProductService.getProductById(productId);
        console.log("Product loaded:", productData);
        setProduct(productData);
      } catch (error) {
        console.error("Failed to load product:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      if (product && product.categoryId) {
        try {
          const allProducts = await ProductService.getProductByCategoryID(
            product.categoryId
          );
          const filtered = allProducts
            .filter((p: Product) => p.id !== product.id)
            .slice(0, 4);
          setRelatedProducts(filtered);
        } catch (error) {
          console.error("Failed to load related products:", error);
        }
      }
    };

    loadRelatedProducts();
  }, [product]);

  const handleNavigateToCategory = async (categoryId: string) => {
    try {
      router.push(`/products?categoryId=${categoryId}`);
    } catch (error) {
      console.error("Error navigating to category:", error);
    }
  };

  const handleNavigateToSubCategory = async (subCategoryId: string) => {
    try {
      router.push(`/products?subCategoryId=${subCategoryId}`);
    } catch (error) {
      console.error("Error navigating to subcategory:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card>
            <CardContent className="p-8 md:p-12 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4 w-48 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded mb-6 w-64 mx-auto"></div>
                <div className="h-10 bg-gray-200 rounded w-40 mx-auto"></div>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card>
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                {error ? "Lỗi tải sản phẩm" : "Không tìm thấy sản phẩm"}
              </h2>
              <p className="text-gray-600 mb-6">
                {error ||
                  "Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."}
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

  return (
    <div className="flex min-h-screen flex-col bg-white">
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
            <button
              onClick={() => handleNavigateToCategory(product.categoryId)}
              className="hover:text-blue-600 transition-colors text-left"
            >
              {product.categoryName}
            </button>
            <span>/</span>
            <button
              onClick={() => handleNavigateToSubCategory(product.subCategoryId)}
              className="hover:text-blue-600 transition-colors text-left"
            >
              {product.subCategoryName}
            </button>
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
              <ProductImageGallery
                product={product}
                productImages={productImages}
                imagesLoading={imagesLoading}
              />
            </div>
            <div className="h-full">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-8 lg:mb-12">
            <ProductTabs product={product} />
          </div>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
