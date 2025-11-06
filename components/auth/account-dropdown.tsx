"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth-context";

export function AccountDropdown() {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // If not authenticated, show login/signup dropdown
  if (!isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center gap-3 p-3 h-16 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div className="hidden xl:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-700">
                  Tài khoản
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 hidden xl:block" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 bg-white border border-gray-200 shadow-lg"
          align="end"
        >
          <DropdownMenuItem asChild>
            <Link href="/login" className="w-full">
              <UserCircle className="mr-2 h-4 w-4" />
              Đăng nhập
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/signup" className="w-full">
              <User className="mr-2 h-4 w-4" />
              Đăng ký
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // If authenticated, show user dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="flex items-center gap-3 p-3 h-16 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.userName || "User Avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <div className="hidden xl:flex flex-col items-start">
              <span className="text-sm font-medium text-gray-700">
                {user?.userName || user?.email || "Tài khoản"}
              </span>
              <span className="text-xs text-gray-500">
                {user?.role === "ADMIN" ? "Quản trị viên" : "Khách hàng"}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 hidden xl:block" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white border border-gray-200 shadow-lg"
        align="end"
      >
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user?.userName || user?.email}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="w-full">
            <User className="mr-2 h-4 w-4" />
            Thông tin tài khoản
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders" className="w-full">
            <Package className="mr-2 h-4 w-4" />
            Đơn hàng của tôi
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
