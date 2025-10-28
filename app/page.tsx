import Link from "next/link";
import { ArrowRight, Cpu, Zap, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FeaturedProductsCarousel } from "@/components/featured-products-carousel";
import { BrandLogosScroll } from "@/components/brand-logos-scroll";
import { CategoryBanner } from "@/components/category-banner";
import { categories, products } from "@/lib/mock-data";

export default function HomePage() {
  const productsByCategory = categories.map((category) => ({
    category,
    products: products.filter((p) => {
      const subCat = p.subCategoryId;
      return subCat >= category.id && subCat <= category.id + 1;
    }),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Auto-sliding Banner Section */}
        <section className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            {/* Banner 1 */}
            <div className="absolute inset-0 animate-[slideShow_20s_infinite_0s]">
              <img
                src="/banner1.png"
                alt="Gaming Banner 1"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Banner 2 */}
            <div className="absolute inset-0 animate-[slideShow_20s_infinite_5s]">
              <img
                src="/banner2.png"
                alt="Gaming Banner 2"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Banner 3 */}
            <div className="absolute inset-0 animate-[slideShow_20s_infinite_10s]">
              <img
                src="/banner3.png"
                alt="Gaming Banner 3"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Banner 4 */}
            <div className="absolute inset-0 animate-[slideShow_20s_infinite_15s]">
              <img
                src="/banner4.png"
                alt="Gaming Banner 4"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Responsive Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent sm:from-black/20 sm:to-transparent"></div>

            {/* Responsive Dots indicator */}
            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/60 animate-[dotActive_20s_infinite_0s] transition-all duration-300"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/60 animate-[dotActive_20s_infinite_5s] transition-all duration-300"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/60 animate-[dotActive_20s_infinite_10s] transition-all duration-300"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/60 animate-[dotActive_20s_infinite_15s] transition-all duration-300"></div>
            </div>
          </div>
        </section>

        <CategoryBanner />

        <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {productsByCategory.slice(0, 3).map(
              ({ category, products: categoryProducts }) =>
                categoryProducts.length > 0 && (
                  <div key={category.id} className="mb-12 sm:mb-16 last:mb-0">
                    <FeaturedProductsCarousel
                      title=""
                      products={categoryProducts}
                      categoryIcon=""
                    />
                  </div>
                )
            )}
          </div>
        </section>

        {/* Features */}
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">
                Tại sao chọn chúng tôi?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến trải
                nghiệm mua sắm tuyệt vời nhất
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <Card className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-500 transition-colors duration-300">
                      <Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-base sm:text-lg">
                    Chính hãng 100%
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Cam kết sản phẩm chính hãng, nguồn gốc rõ ràng từ các nhà
                    phân phối chính thức
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-500 transition-colors duration-300">
                      <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-base sm:text-lg">
                    Giao hàng nhanh
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Giao hàng trong 24h tại TP.HCM và Hà Nội, 48h toàn quốc
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-500 transition-colors duration-300">
                      <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-base sm:text-lg">
                    Bảo hành tận tâm
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Bảo hành chính hãng, hỗ trợ đổi trả trong 7 ngày đầu tiên
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-orange-100 group-hover:bg-orange-500 transition-colors duration-300">
                      <Headphones className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 sm:mb-3 text-gray-800 text-base sm:text-lg">
                    Tư vấn miễn phí
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Đội ngũ chuyên gia tư vấn build PC 24/7, hỗ trợ tận tình
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <BrandLogosScroll />

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/95 to-blue-800/90"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src="https://res.cloudinary.com/dggt29zsn/image/upload/v1761538283/logo_psoszk.png"
                alt="PC Store Logo"
                className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl shadow-xl bg-white/10 p-2"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Sẵn sàng build PC của bạn?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Sử dụng công cụ PC Builder thông minh của chúng tôi để tạo cấu
              hình hoàn hảo phù hợp với ngân sách và nhu cầu sử dụng của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg sm:max-w-none mx-auto">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl font-semibold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
                asChild
              >
                <Link href="/pc-builder">
                  Bắt đầu ngay
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 bg-transparent shadow-lg font-semibold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
                asChild
              >
                <Link href="/products">Xem sản phẩm</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
