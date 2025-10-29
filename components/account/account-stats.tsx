"use client";

import { Package, ShoppingBag } from "lucide-react";

interface AccountStatsProps {
  totalOrders: number;
  completedOrders: number;
}

export function AccountStats({
  totalOrders,
  completedOrders,
}: AccountStatsProps) {
  const stats = [
    {
      id: "total-orders",
      label: "Tổng đơn hàng",
      value: totalOrders,
      icon: Package,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      id: "completed-orders",
      label: "Đã hoàn thành",
      value: completedOrders,
      icon: ShoppingBag,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6"
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-16 w-16 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-md`}
              >
                <Icon className={`h-8 w-8 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-800">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-slate-600 mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
