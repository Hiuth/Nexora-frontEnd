"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { CategoryMegaMenu } from "@/components/category-mega-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <img
              src="https://res.cloudinary.com/dggt29zsn/image/upload/v1761538283/logo_psoszk.png"
              alt="PC Store Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                PC Store
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 -mt-0.5 sm:-mt-1 hidden sm:block">
                Linh kiện chính hãng
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-4 md:gap-6 lg:gap-8 md:flex">
            <CategoryMegaMenu />
            <Link
              href="/pc-builder"
              className="text-sm lg:text-base font-semibold transition-colors hover:text-blue-600 hover:scale-105 px-2 lg:px-3 py-2 rounded-lg hover:bg-blue-50 whitespace-nowrap"
            >
              Build PC
            </Link>
            <Link
              href="/about"
              className="text-sm lg:text-base font-semibold transition-colors hover:text-blue-600 hover:scale-105 px-2 lg:px-3 py-2 rounded-lg hover:bg-blue-50 whitespace-nowrap"
            >
              Về chúng tôi
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-sm lg:max-w-lg mx-4 lg:mx-8 lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 lg:left-4 top-1/2 h-4 w-4 lg:h-5 lg:w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50 focus:bg-white transition-all text-sm lg:text-base"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:flex relative hover:bg-blue-50 hover:text-blue-600 rounded-lg lg:rounded-xl p-2 lg:p-3"
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center p-0 text-xs bg-blue-600 text-white border-2 border-white rounded-full">
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">Giỏ hàng</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:flex hover:bg-blue-50 hover:text-blue-600 rounded-lg lg:rounded-xl p-2 lg:p-3"
            >
              <Link href="/account">
                <User className="h-5 w-5 lg:h-6 lg:w-6" />
                <span className="sr-only">Tài khoản</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-blue-50 hover:text-blue-600 rounded-lg p-2"
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
              <Link
                href="/pc-builder"
                className="text-sm font-semibold hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Build PC
              </Link>
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
