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
        {/* Hero Section - MyGear inspired */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 py-8">
          <div className="container mx-auto px-4">
            {/* Top banner strip */}
            <div className="flex items-center justify-center gap-8 mb-6 text-white text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Sản phẩm Chính hãng - Xuất VAT đầy đủ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">🚚</span>
                </div>
                <span>Giao nhanh - Miễn phí</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">💰</span>
                </div>
                <span>Thu cũ giá ngon - Lên đời tiết kiệm</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="bg-blue-800 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8 text-white text-sm">
              <Link href="/vga" className="hover:text-blue-200">VGA Card Màn Hình</Link>
              <Link href="/monitors" className="hover:text-blue-200">Màn Hình Máy Tính</Link>
              <Link href="/rtx-5070-ti" className="hover:text-blue-200">RTX 5070 Ti</Link>
              <Link href="/pc-gaming" className="hover:text-blue-200">PC Gaming</Link>
              <Link href="/cpu" className="hover:text-blue-200">CPU</Link>
              <Link href="/ram" className="hover:text-blue-200">RAM</Link>
              <Link href="/pc-builder" className="hover:text-blue-200 font-semibold">Xây dựng cấu hình</Link>
            </div>
          </div>
        </section>

        {/* Sliding Banner */}
        <section className="bg-white py-4">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                PC Gaming & Thiết Bị Chính Hãng
              </h2>
              <p className="text-blue-600 mb-4">
                Chuyên cung cấp linh kiện PC, laptop gaming với giá tốt nhất thị trường
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8"
                  asChild
                >
                  <Link href="/pc-builder">Build PC ngay</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8"
                  asChild
                >
                  <Link href="/products">Xem sản phẩm</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
          </div>
              <div className="flex-1 hidden md:block">
                <div className="relative">
                  <img
                    src="/rgb-gaming-setup.png"
                    alt="Gaming PC"
                    className="rounded-2xl shadow-2xl border-4 border-white/20"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CategoryBanner />

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            {productsByCategory.slice(0, 3).map(
              ({ category, products: categoryProducts }) =>
                categoryProducts.length > 0 && (
                  <div key={category.id} className="mb-16 last:mb-0">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                          <span className="text-2xl">{category.iconImg}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                          {category.categoryName}
                        </h2>
                      </div>
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white shadow-md"
                        asChild
                      >
                        <Link href={`/products?category=${category.id}`}>
                          Xem tất cả
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Tại sao chọn chúng tôi?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Với hơn 10 năm kinh nghiệm, chúng tôi cam kết mang đến trải
                nghiệm mua sắm tuyệt vời nhất
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-500 transition-colors duration-300">
                      <Cpu className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-3 text-gray-800 text-lg">
                    Chính hãng 100%
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Cam kết sản phẩm chính hãng, nguồn gốc rõ ràng từ các nhà
                    phân phối chính thức
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-500 transition-colors duration-300">
                      <Zap className="h-10 w-10 text-green-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-3 text-gray-800 text-lg">
                    Giao hàng nhanh
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Giao hàng trong 24h tại TP.HCM và Hà Nội, 48h toàn quốc
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-500 transition-colors duration-300">
                      <Shield className="h-10 w-10 text-purple-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-3 text-gray-800 text-lg">
                    Bảo hành tận tâm
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Bảo hành chính hãng, hỗ trợ đổi trả trong 7 ngày đầu tiên
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 group-hover:bg-orange-500 transition-colors duration-300">
                      <Headphones className="h-10 w-10 text-orange-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-3 text-gray-800 text-lg">
                    Tư vấn miễn phí
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Đội ngũ chuyên gia tư vấn build PC 24/7, hỗ trợ tận tình
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <BrandLogosScroll />

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/95 to-blue-800/90"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-6">
              <img
                src="https://res.cloudinary.com/dggt29zsn/image/upload/v1761538283/logo_psoszk.png"
                alt="PC Store Logo"
                className="h-16 w-16 rounded-xl shadow-xl bg-white/10 p-2"
              />
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Sẵn sàng build PC của bạn?
            </h2>
            <p className="text-xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Sử dụng công cụ PC Builder thông minh của chúng tôi để tạo cấu
              hình hoàn hảo phù hợp với ngân sách và nhu cầu sử dụng của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl font-semibold px-10 py-4 text-lg"
                asChild
              >
                <Link href="/pc-builder">
                  Bắt đầu ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 bg-transparent shadow-lg font-semibold px-10 py-4 text-lg"
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
