"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Zap, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategorySections } from "@/components/home/category-sections";
import { BrandLogosScroll } from "@/components/brand-logos-scroll";
import { CategoryBanner } from "@/components/category-banner";
import { CategoryService } from "@/services/category.service";
import { ProductService } from "@/services/product.service";
import { Category, Product } from "@/lib/types";

export function HomeContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<
    Array<{
      category: Category;
      products: Product[];
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log("HomeContent: Starting to load categories...");
        const categoriesData = await CategoryService.getCategories();
        console.log("HomeContent: Categories loaded:", categoriesData.length);
        setCategories(categoriesData);

        // Loại bỏ các category theo yêu cầu
        const excludedCategoryNames = [
          "phần mềm",
          "thiết bị mạng",
          "phụ kiện - cáp - hub - usb",
          "dịch vụ sản phẩm",
        ];

        const simplify = (s: string) =>
          s
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .replace(/[\s-]+/g, "");

        const filteredCategories = categoriesData.filter((category) => {
          const catNorm = simplify(category.categoryName);
          return !excludedCategoryNames.some((name) =>
            catNorm.includes(simplify(name))
          );
        });

        // Lấy sản phẩm cho mỗi category
        console.log("HomeContent: Loading products for categories...");
        const productResults = await Promise.all(
          filteredCategories.map(async (category) => {
            try {
              const categoryProducts =
                await ProductService.getProductByCategoryID(category.id);
              console.log(
                `HomeContent: Loaded ${categoryProducts.length} products for ${category.categoryName}`
              );
              return {
                category,
                products: categoryProducts,
              };
            } catch (error) {
              console.error(
                `Failed to load products for category ${category.id}:`,
                error
              );
              return {
                category,
                products: [],
              };
            }
          })
        );

        setProductsByCategory(productResults);
        console.log("HomeContent: All data loaded successfully");
      } catch (error) {
        console.error("Failed to load categories:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <main className="flex-1">
        {/* Loading Banner */}
        <section className="relative h-[160px] xs:h-[180px] sm:h-[280px] md:h-[360px] lg:h-[480px] xl:h-[560px] overflow-hidden bg-gray-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-500 text-lg">Đang tải...</div>
          </div>
        </section>

        <CategoryBanner />

        {/* Loading Content */}
        <section className="py-6 sm:py-12 md:py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
            <div className="text-center">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 mx-auto w-64"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-96"></div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1">
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                Lỗi tải dữ liệu
              </h2>
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Thử lại
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Auto-sliding Banner Section */}
      <HeroBanner />

      <CategoryBanner />

      <section className="py-6 sm:py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          <CategorySections items={productsByCategory} />
        </div>
      </section>

      {/* Features */}
      <section className="py-6 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-800">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
              Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến trải nghiệm
              mua sắm tuyệt vời nhất
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <Card className="border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8 text-center">
                <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-500 transition-colors duration-300">
                    <Cpu className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base md:text-lg">
                  Chính hãng 100%
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
                  Cam kết sản phẩm chính hãng, nguồn gốc rõ ràng từ các nhà phân
                  phối chính thức
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8 text-center">
                <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-500 transition-colors duration-300">
                    <Zap className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base md:text-lg">
                  Giao hàng nhanh
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
                  Giao hàng trong 24h tại TP.HCM và Hà Nội, 48h toàn quốc
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8 text-center">
                <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-500 transition-colors duration-300">
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base md:text-lg">
                  Bảo hành tận tâm
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
                  Bảo hành chính hãng, hỗ trợ đổi trả trong 7 ngày đầu tiên
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8 text-center">
                <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-orange-100 group-hover:bg-orange-500 transition-colors duration-300">
                    <Headphones className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-orange-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base md:text-lg">
                  Tư vấn miễn phí
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
                  Đội ngũ chuyên gia tư vấn build PC 24/7, hỗ trợ tận tình
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <BrandLogosScroll />

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/95 to-blue-800/90"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 text-center relative z-10">
          <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
            <img
              src="/logo.png"
              alt="PC Store Logo"
              className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl bg-white p-1 sm:p-2"
            />
          </div>
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6">
            Sẵn sàng build PC của bạn?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed px-2">
            Sử dụng công cụ PC Builder thông minh của chúng tôi để tạo cấu hình
            hoàn hảo phù hợp với ngân sách và nhu cầu sử dụng của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center max-w-lg sm:max-w-none mx-auto px-2">
            <Button
              size="lg"
              className="bg-white text-blue-700 shadow-lg sm:shadow-xl font-semibold px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl w-[160px] hover:bg-white"
              asChild
            >
              <Link href="/pc-builder">Bắt đầu ngay</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-blue-700 shadow-lg sm:shadow-xl font-semibold px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl w-[160px] hover:bg-blue-50"
              asChild
            >
              <Link href="/products?getAll">Xem sản phẩm</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
