"use client";

import { useEffect, useState } from "react";
import { Shield, Key, Mail, CheckCircle2, Lock, RefreshCw } from "lucide-react";

const securityFeatures = [
  {
    icon: Mail,
    title: "Xác thực qua Email",
    description: "Gửi mã OTP bảo mật đến email của bạn",
  },
  {
    icon: Shield,
    title: "Mã hóa mạnh",
    description: "Dữ liệu được bảo vệ bằng mã hóa AES-256",
  },
  {
    icon: Key,
    title: "Quên mật khẩu an toàn",
    description: "Quy trình khôi phục mật khẩu đa lớp bảo mật",
  },
  {
    icon: CheckCircle2,
    title: "Xác minh danh tính",
    description: "Kiểm tra kỹ lưỡng trước khi thay đổi mật khẩu",
  },
  {
    icon: Lock,
    title: "Bảo mật tuyệt đối",
    description: "Không lưu trữ mật khẩu dạng văn bản thô",
  },
  {
    icon: RefreshCw,
    title: "Cập nhật nhanh chóng",
    description: "Mật khẩu mới có hiệu lực ngay lập tức",
  },
];

export function ForgotPasswordAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % securityFeatures.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hidden lg:flex lg:flex-col lg:justify-center h-full"
      suppressHydrationWarning
    >
      {/* Main animated section */}
      <div className="relative">
        {/* Background gradient circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          {/* Main title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Bảo mật tài khoản
            </h2>
            <p className="text-lg text-blue-700">
              Khôi phục mật khẩu một cách an toàn và bảo mật
            </p>
          </div>

          {/* Animated features grid */}
          <div className="grid grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className={`
                    relative p-6 rounded-2xl transition-all duration-500 transform
                    ${
                      isActive
                        ? "bg-blue-600 text-white scale-105 shadow-2xl"
                        : "bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 shadow-md border border-blue-200/50"
                    }
                  `}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div
                      className={`
                      p-3 rounded-full transition-all duration-500
                      ${isActive ? "bg-white/20" : "bg-blue-100/80"}
                    `}
                    >
                      <Icon
                        className={`
                        w-6 h-6 transition-all duration-500
                        ${isActive ? "text-white" : "text-blue-600"}
                      `}
                      />
                    </div>
                    <h3
                      className={`
                      font-semibold text-sm transition-all duration-500
                      ${isActive ? "text-white" : "text-gray-900"}
                    `}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`
                      text-xs leading-relaxed transition-all duration-500
                      ${isActive ? "text-white/90" : "text-gray-600"}
                    `}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Glow effect for active card */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-2xl blur-xl -z-10"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {securityFeatures.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-500
                  ${
                    index === activeIndex
                      ? "bg-blue-600 w-8"
                      : "bg-blue-300/50"
                  }
                `}
              />
            ))}
          </div>

          {/* Security badge */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Quy trình bảo mật SSL 256-bit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}