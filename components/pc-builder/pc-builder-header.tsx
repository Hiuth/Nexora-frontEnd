"use client";

import { Monitor, CheckCircle, Zap, Shield } from "lucide-react";

export function PCBuilderHeader() {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm">
            <Monitor className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              PC Builder
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Tạo cấu hình PC tùy chỉnh theo nhu cầu của bạn với công cụ thông
              minh
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg shadow-sm">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Kiểm tra tương thích
                  </p>
                  <p className="text-xs text-gray-500">Tự động kiểm tra</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-lg shadow-sm">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Zap className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Tính công suất</p>
                  <p className="text-xs text-gray-500">PSU tối ưu</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg shadow-sm">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">20+ categories</p>
                  <p className="text-xs text-gray-500">Đầy đủ linh kiện</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
