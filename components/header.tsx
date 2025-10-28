"use client";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-24 sm:h-26 lg:h-28 items-center gap-2 sm:gap-4 lg:gap-6">
          {/* Logo */}
          <Link href="/" className="hidden sm:flex items-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-42 w-auto sm:h-48 lg:h-44"
            />
          </Link>

          {/* Category Menu */}
          <div className="hidden lg:flex flex-shrink-0">
            <CategoryMegaMenu />
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-2 lg:mx-6">
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
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
            {/* PC Builder Button */}
            <div className="hidden sm:flex">
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

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-blue-50 hover:text-blue-600 rounded-lg p-2 ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 py-3 sm:py-4 md:hidden bg-white rounded-b-xl shadow-lg">
            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50 focus:bg-white transition-all text-sm"
                />
              </div>
            </div>

            <nav className="flex flex-col gap-2 sm:gap-3">
              <Link
                href="/products"
                className="text-sm font-semibold hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sản phẩm
              </Link>

              {/* Mobile PC Builder */}
              <div className="px-4 lg:hidden">
                <div onClick={() => setIsMenuOpen(false)}>
                  <PCBuilderButton />
                </div>
              </div>

              <Link
                href="/about"
                className="text-sm font-semibold hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Về chúng tôi
              </Link>

              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 px-4">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-1 relative border-2 border-blue-200 text-blue-600 hover:bg-blue-50 text-xs sm:text-sm"
                >
                  <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                    Giỏ hàng
                    {totalItems > 0 && (
                      <Badge className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] sm:text-xs bg-blue-600 text-white">
                        {totalItems}
                      </Badge>
                    )}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-1 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 text-xs sm:text-sm"
                >
                  <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                    Tài khoản
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
