import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WarrantyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tra cứu thông tin bảo hành
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Nhập số serial hoặc mã đơn hàng để kiểm tra tình trạng bảo hành
              sản phẩm của bạn
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Kiểm tra bảo hành
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Nhập số serial hoặc mã đơn hàng..."
                  className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 text-base"
                />
              </div>
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Tra cứu bảo hành
              </Button>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="font-semibold mb-2">Thông tin sản phẩm</h3>
                <p className="text-sm text-gray-600">
                  Xem chi tiết thông tin và thời hạn bảo hành
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🔧</div>
                <h3 className="font-semibold mb-2">Lịch sử sửa chữa</h3>
                <p className="text-sm text-gray-600">
                  Theo dõi quá trình bảo hành và sửa chữa
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="font-semibold mb-2">Hỗ trợ kỹ thuật</h3>
                <p className="text-sm text-gray-600">
                  Liên hệ đội ngũ kỹ thuật để được hỗ trợ
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
