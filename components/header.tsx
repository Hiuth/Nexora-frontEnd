"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { CategoryMegaMenu } from "@/components/category-mega-menu";
import { PCBuilderButton } from "@/components/pc-builder-button";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 shadow-lg"
      style={{ "--header-height": "85px" } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex h-24 lg:h-28 items-center gap-4 lg:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="Logo" className="h-42 w-auto lg:h-44" />
          </Link>

          {/* Category Menu */}
          <div className="flex items-center flex-shrink-0 mr-2">
            <CategoryMegaMenu />
          </div>

          {/* Search Bar - Center */}
          <div className="flex flex-1 max-w-2xl mx-2 lg:mx-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-12 pr-4 py-4 h-14 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50 focus:bg-white transition-all text-base"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {/* PC Builder Button */}
            <div className="flex">
              <PCBuilderButton />
            </div>

            {/* Cart & Account */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="lg"
                asChild
                className="relative flex items-center gap-3 p-3 h-16 rounded-lg"
              >
                <Link href="/cart">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center relative">
                      <ShoppingCart className="h-5 w-5" />
                      {totalItems > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-blue-600 text-white border-2 border-white rounded-full">
                          {totalItems}
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden xl:block">
                      Giỏ hàng
                    </span>
                  </div>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                asChild
                className="flex items-center gap-3 p-3 h-16 rounded-lg"
              >
                <Link href="/account">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden xl:block">
                      Tài khoản
                    </span>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Top Row: Category Menu + Logo + Cart & Account */}
          <div className="flex h-16 items-center justify-between px-2">
            {/* Category Menu - Far Left */}
            <div className="flex items-center">
              <CategoryMegaMenu />
            </div>

            {/* Logo - Center */}
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-30 w-auto" />
            </Link>

            {/* Cart & Account - Far Right */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="relative p-2 h-10 rounded-lg"
              >
                <Link href="/cart">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center relative">
                    <ShoppingCart className="h-4 w-4" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-3 w-3 flex items-center justify-center p-0 text-[10px] bg-blue-600 text-white border border-white rounded-full">
                        {totalItems}
                      </Badge>
                    )}
                  </div>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="p-2 h-10 rounded-lg"
              >
                <Link href="/account">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>

          {/* Bottom Row: Search Bar */}
          <div className="px-2 pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-3 py-2 h-10 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50 focus:bg-white transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
