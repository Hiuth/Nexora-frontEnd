"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { ProductService } from "@/services/product.service";
import { PcBuildService } from "@/services/pc-build.service";
import { PcBuildItemService } from "@/services/pc-build-item.service";
import { Product, PcBuild, PcBuildItem } from "@/lib/types";
import { useProductImages } from "@/hooks/use-product-images";
import { ProductImageGallery } from "@/components/product/product-image-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProducts } from "@/components/product/related-products";
import { PcBuildTabs } from "@/components/product/pc-build-tabs";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = params.id as string;
  
  // Check if this is PC Build mode
  const isPcBuildMode = searchParams.get("pcBuild") === "true";
  
  const [product, setProduct] = useState<Product | null>(null);
  const [pcBuild, setPcBuild] = useState<PcBuild | null>(null);
  const [pcBuildItems, setPcBuildItems] = useState<PcBuildItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Hook to load product images for both Product and PC Build
  const {
    images: productImages,
    loading: imagesLoading,
    error: imagesError,
  } = useProductImages(product?.id || pcBuild?.id || null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (isPcBuildMode) {
          // Load PC Build data - call pcbuild/getbyid endpoint
          const pcBuildData = await PcBuildService.getPcBuildById(productId);
          if (!pcBuildData) {
            throw new Error("PC Build not found");
          }
          setPcBuild(pcBuildData);
          
          // Load PC Build components
          const pcBuildItemsData = await PcBuildItemService.getPcBuildItemsByPcBuildId(productId);
          setPcBuildItems(pcBuildItemsData);
        } else {
          // Load regular Product data
          const productData = await ProductService.getProductById(productId);
          setProduct(productData);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadData();
    }
  }, [productId, isPcBuildMode]);

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

  if (loading || (isPcBuildMode && !pcBuild) || (!isPcBuildMode && !product)) {
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

  if (error || (!product && !pcBuild)) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card>
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                {error ? "Lỗi tải dữ liệu" : "Không tìm thấy dữ liệu"}
              </h2>
              <p className="text-gray-600 mb-6">
                {error ||
                  "Dữ liệu bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."}
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href={isPcBuildMode ? "/products?pcBuild=true" : "/products"}>
                  Quay lại danh sách
                </Link>
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
              href={isPcBuildMode ? "/products?pcBuild=true" : "/products"}
              className="hover:text-blue-600 transition-colors"
            >
              {isPcBuildMode ? "PC Build" : "Sản phẩm"}
            </Link>
            {!isPcBuildMode && product && (
              <>
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
              </>
            )}
            {isPcBuildMode && pcBuild && (
              <>
                <span>/</span>
                <button
                  onClick={() => handleNavigateToSubCategory(pcBuild.subCategoryId)}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  {pcBuild.subCategoryName}
                </button>
              </>
            )}
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {isPcBuildMode ? pcBuild?.productName : product?.productName}
            </span>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 hover:bg-blue-50 hover:text-blue-600"
          >
            <Link href={isPcBuildMode ? "/products?pcBuild=true" : "/products"}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12 lg:items-start">
            <div className="h-full">
              {isPcBuildMode && pcBuild ? (
                <ProductImageGallery
                  product={{
                    ...pcBuild,
                    stockQuantity: 999,
                    createdAt: new Date().toISOString(),
                    brandId: "pcbuild",
                    brandName: "PC Build",
                    categoryId: "",
                    categoryName: "PC Build",
                    warrantyPeriod: 36
                  } as any}
                  productImages={productImages}
                  imagesLoading={imagesLoading}
                />
              ) : product ? (
                <ProductImageGallery
                  product={product}
                  productImages={productImages}
                  imagesLoading={imagesLoading}
                />
              ) : null}
            </div>
            <div className="h-full">
              {isPcBuildMode && pcBuild ? (
                <ProductInfo 
                  product={{
                    ...pcBuild,
                    stockQuantity: 999,
                    createdAt: new Date().toISOString(),
                    brandId: "pcbuild",
                    brandName: "PC Build",
                    categoryId: "",
                    categoryName: "PC Build",
                    warrantyPeriod: 36
                  } as any}
                  isPcBuild={true}
                  pcBuildItems={pcBuildItems}
                />
              ) : product ? (
                <ProductInfo product={product} />
              ) : null}
            </div>
          </div>

          {/* Details Section */}
          <div className="mb-8 lg:mb-12">
            {isPcBuildMode && pcBuild ? (
              <PcBuildTabs pcBuild={pcBuild} pcBuildItems={pcBuildItems} />
            ) : product ? (
              <ProductTabs product={product} />
            ) : null}
          </div>

          {/* Related Products - Only for regular products */}
          {!isPcBuildMode && <RelatedProducts products={relatedProducts} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
