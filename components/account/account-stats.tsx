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
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 p-6"
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-14 w-14 rounded-xl ${stat.iconBg} flex items-center justify-center`}
              >
                <Icon className={`h-7 w-7 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-800">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-slate-600">
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
