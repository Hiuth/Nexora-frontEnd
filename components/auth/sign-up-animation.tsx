"use client";

import { useEffect, useState } from "react";
import { Cpu, Monitor, HardDrive, Zap, Shield, Award } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Linh kiện chính hãng",
    description: "100% sản phẩm chính hãng từ các thương hiệu uy tín",
  },
  {
    icon: Monitor,
    title: "Bảo hành tận tâm",
    description: "Chế độ bảo hành dài hạn, hỗ trợ nhanh chóng",
  },
  {
    icon: HardDrive,
    title: "Tư vấn chuyên nghiệp",
    description: "Đội ngũ kỹ thuật giàu kinh nghiệm",
  },
  {
    icon: Zap,
    title: "Giao hàng nhanh",
    description: "Giao hàng trong ngày tại TP.HCM",
  },
  {
    icon: Shield,
    title: "Thanh toán bảo mật",
    description: "An toàn, nhanh chóng, tiện lợi",
  },
  {
    icon: Award,
    title: "Giá cả cạnh tranh",
    description: "Giá tốt nhất thị trường, nhiều ưu đãi",
  },
];

export function SignUpAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
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
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          {/* Main title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Chào mừng đến với Nexora
            </h2>
            <p className="text-lg text-blue-700">
              Nơi bạn tìm thấy mọi linh kiện PC chất lượng cao
            </p>
          </div>

          {/* Animated features grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => {
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
                        className={`h-8 w-8 ${
                          isActive ? "text-white" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <h3 className="font-bold text-base">{feature.title}</h3>
                    <p
                      className={`text-sm ${
                        isActive ? "text-blue-100" : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Glow effect for active card */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-xl -z-10 animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pt-6">
            {features.map((_, index) => (
              <div
                key={index}
                className={`
                  h-2 rounded-full transition-all duration-500
                  ${
                    index === activeIndex
                      ? "w-8 bg-blue-600"
                      : "w-2 bg-blue-300"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
