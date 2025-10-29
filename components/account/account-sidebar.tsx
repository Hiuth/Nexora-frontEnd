"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Package, LogOut, Search } from "lucide-react";
import Link from "next/link";

interface AccountSidebarProps {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  activeSection?: string;
  onLogout?: () => void;
}

export function AccountSidebar({
  user,
  activeSection,
  onLogout,
}: AccountSidebarProps) {
  const menuItems = [
    {
      id: "profile",
      label: "Thông tin cá nhân",
      icon: User,
      href: "/account",
    },
    {
      id: "orders",
      label: "Đơn hàng của tôi",
      icon: Package,
      href: "/account/orders",
    },
    {
      id: "warranty",
      label: "Tra cứu bảo hành",
      icon: Search,
      href: "/warranty",
    },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-primary/10">
      <div className="p-8">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-800 truncate">{user.name}</p>
            <p className="text-sm text-slate-600 truncate">{user.email}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start h-12 px-4 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/15 text-primary shadow-sm border border-primary/20"
                    : "text-slate-700 hover:bg-primary/10 hover:text-primary hover:shadow-sm"
                }`}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <Separator className="my-6 bg-slate-200" />

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start h-12 px-4 rounded-xl font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
