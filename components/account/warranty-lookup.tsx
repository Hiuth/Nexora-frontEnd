"use client";

import { Calendar, Package, AlertCircle, CheckCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { WarrantyService } from "@/services/warranty.service";
import { useWarrantySearch } from "@/hooks/use-warranty-search";
import { useToast } from "@/hooks/use-toast";
import type { WarrantyRecordResponse } from "@/types/api";

type SearchMode = "serial" | "imei" | "orderId" | "phoneNumber";

interface SearchModeOption {
  value: SearchMode;
  label: string;
  placeholder: string;
  description: string;
}

const searchModes: SearchModeOption[] = [
  {
    value: "serial",
    label: "Số Serial",
    placeholder: "Nhập số serial sản phẩm...",
    description: "Tra cứu bằng số serial được ghi trên sản phẩm"
  },
  {
    value: "imei",
    label: "IMEI",
    placeholder: "Nhập IMEI (15 số)...",
    description: "Tra cứu bằng mã IMEI cho thiết bị di động"
  },
  {
    value: "orderId",
    label: "Mã đơn hàng",
    placeholder: "Nhập mã đơn hàng...",
    description: "Tra cứu tất cả sản phẩm trong đơn hàng"
  },
  {
    value: "phoneNumber",
    label: "Số điện thoại",
    placeholder: "Nhập số điện thoại đặt hàng...",
    description: "Tra cứu bằng số điện thoại đã đăng ký"
  }
];

export function WarrantyLookup() {
  const { toast } = useToast();
  const {
    searchMode,
    searchValue,
    isLoading,
    warranties,
    setSearchMode,
    setSearchValue,
    searchWarranty
  } = useWarrantySearch();

  const handleSearch = () => {
    console.log("Button clicked, starting search..."); 
    console.log("Search mode:", searchMode);  
    console.log("Search value:", searchValue); 
    
    if (!searchValue?.trim()) {
      toast({
        title: "Lỗi", 
        description: "Vui lòng nhập thông tin tra cứu",
        variant: "destructive"
      });
      return;
    }
    
    // Show test message
    toast({
      title: "Bắt đầu tra cứu",
      description: `Đang tra cứu ${searchMode}: ${searchValue}`,
    });
    
    // Call the hook function
    searchWarranty();
  };

  const currentMode = searchModes.find(mode => mode.value === searchMode)!;

  const getWarrantyStatusBadge = (warranty: WarrantyRecordResponse) => {
    const isValid = WarrantyService.isWarrantyValid(warranty);
    const statusText = WarrantyService.getWarrantyStatusDisplay(warranty);

    if (isValid) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          {statusText}
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          {statusText}
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Tra cứu thông tin bảo hành
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Mode Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Chế độ tra cứu</label>
            <Select value={searchMode} onValueChange={(value: SearchMode) => setSearchMode(value)}>
              <SelectTrigger className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {searchModes.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    <div>
                      <div className="font-medium">{mode.label}</div>
                      <div className="text-xs text-gray-500">{mode.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Thông tin tra cứu</label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={currentMode.placeholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 border-0 shadow-md hover:shadow-lg focus:shadow-lg transition-shadow duration-200"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="px-6 shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isLoading ? "Đang tìm..." : "Tra cứu"}
              </Button>
            </div>
            <p className="text-xs text-gray-500">{currentMode.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {warranties.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Kết quả tra cứu ({warranties.length})</h3>
          
          {warranties.map((warranty, index) => (
            <Card key={warranty.id || index} className="shadow-lg hover:shadow-xl transition-shadow duration-200 border-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{warranty.productName}</h4>
                        <p className="text-sm text-gray-500">ID: {warranty.id}</p>
                      </div>
                      {getWarrantyStatusBadge(warranty)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Ngày bắt đầu:</span>
                          <span>{WarrantyService.formatWarrantyDate(warranty.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Ngày hết hạn:</span>
                          <span>{WarrantyService.formatWarrantyDate(warranty.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Thời hạn bảo hành:</span>
                          <span>{warranty.warrantyPeriod} tháng</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {warranty.serialNumber && (
                          <div>
                            <span className="font-medium">Serial:</span>
                            <span className="ml-2">{warranty.serialNumber}</span>
                          </div>
                        )}
                        {warranty.imei && (
                          <div>
                            <span className="font-medium">IMEI:</span>
                            <span className="ml-2">{warranty.imei}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Mã đơn hàng:</span>
                          <span className="ml-2">{warranty.orderId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Remaining Days Info */}
                    {WarrantyService.isWarrantyValid(warranty) && (
                      <div className="bg-blue-50 rounded-lg p-3 shadow-sm border-0">
                        <p className="text-sm text-blue-700">
                          <strong>Còn {WarrantyService.getRemainingWarrantyDays(warranty)} ngày</strong> để hết hạn bảo hành
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Info Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 border-0">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="font-semibold mb-2">Thông tin chi tiết</h3>
            <p className="text-sm text-gray-600">
              Xem đầy đủ thông tin bảo hành và thời hạn hiệu lực
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 border-0">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-4">🔧</div>
            <h3 className="font-semibold mb-2">Trạng thái bảo hành</h3>
            <p className="text-sm text-gray-600">
              Theo dõi tình trạng và lịch sử bảo hành sản phẩm
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 border-0">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="font-semibold mb-2">Hỗ trợ kỹ thuật</h3>
            <p className="text-sm text-gray-600">
              Liên hệ đội ngũ kỹ thuật để được hỗ trợ nhanh chóng
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}