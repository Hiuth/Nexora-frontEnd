"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProductSearch } from "@/hooks/use-products";
import { formatPrice } from "@/lib/mock-data";
import Image from "next/image";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
}

export function SearchBar({ 
  className = "", 
  placeholder = "Tìm kiếm sản phẩm...",
  size = "md"
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const { products, loading, totalCount } = useProductSearch(query, 5);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show suggestions when query exists
  useEffect(() => {
    setShowSuggestions(query.trim().length > 0);
  }, [query, products.length, loading]);

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const sizeClasses = {
    sm: "h-10 text-sm",
    md: "h-12 text-base", 
    lg: "h-14 text-base"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-5 w-5"
  };

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${iconSizes[size]}`} />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          className={`
            w-full pl-10 pr-12 border-2 border-gray-200 rounded-xl 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
            bg-gray-50 focus:bg-white transition-all
            ${sizeClasses[size]}
          `}
        />
        {loading && (
          <Loader2 className={`absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400 ${iconSizes[size]}`} />
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <Card className="absolute top-full mt-2 w-full bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-hidden">
          <div className="p-4">
            {loading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span className="text-sm text-gray-600">Đang tìm kiếm...</span>
              </div>
            )}

            {!loading && products.length === 0 && query.trim() && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 mb-3">Không tìm thấy sản phẩm nào</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch()}
                  className="text-xs"
                >
                  Tìm kiếm "{query}" →
                </Button>
              </div>
            )}

            {!loading && products.length > 0 && (
              <>
                {/* Top suggestions */}
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.productName}
                        </p>
                        <p className="text-xs text-blue-600 font-semibold">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>

                {/* View all results */}
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSearch()}
                    className="w-full justify-between text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <span>Xem tất cả kết quả cho "{query}"</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {totalCount > 0 ? `${totalCount}+` : products.length}
                    </Badge>
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}