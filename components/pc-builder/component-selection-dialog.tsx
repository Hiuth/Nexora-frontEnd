"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, X, AlertCircle, Box } from "lucide-react";
import { Product, Category, SubCategory } from "@/lib/types";
import { formatPrice } from "@/lib/mock-data";
import { BuildComponent } from "@/hooks/use-pc-builder";
import { useEffect, useState } from "react";

interface ComponentSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  component: BuildComponent | null;
  products: Product[];
  categories: Category[];
  subCategories: SubCategory[];
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  onSelectProduct: (product: Product) => void;
  
  // Compatibility checking
  checkCompatibility?: (product: Product, component: BuildComponent) => boolean;
}

export function ComponentSelectionDialog({
  isOpen,
  onClose,
  component,
  products,
  categories,
  subCategories,
  isLoading,
  isAuthenticated,
  onSelectProduct,
  checkCompatibility,
}: ComponentSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!component || !isOpen) return null;

  // Filter products based on search term
  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    return product.productName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Sort products by name
  const sortedProducts = filteredProducts.sort((a, b) => 
    a.productName.localeCompare(b.productName)
  );

  return (
    <>
      {/* Full-page overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" onClick={onClose} />
      
      {/* Modal content - reduced width */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[85vw] max-w-6xl h-[90vh] bg-white z-50 rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {component.icon}
              Chọn {component.name}
            </h2>
            {!isLoading && (
              <p className="text-sm text-gray-500 mt-1">
                {sortedProducts.length} sản phẩm tìm thấy
              </p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={`Tìm kiếm ${component.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products List */}
        <div className="flex-1 p-4 overflow-y-auto" 
             style={{ 
               maxHeight: 'calc(90vh - 240px)',
               scrollbarWidth: 'thin',
               scrollbarColor: '#cbd5e1 #f1f5f9'
             }}>
          <div className="pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Không có sản phẩm phù hợp</p>
              <p className="text-sm text-gray-500">
                {searchTerm ? `Không tìm thấy sản phẩm nào cho "${searchTerm}"` : "Không có sản phẩm nào trong danh mục này"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map(product => {
                // Check if product is compatible
                const isCompatible = checkCompatibility ? checkCompatibility(product, component) : true;

                return (
                  <div 
                    key={product.id}
                    className={`
                      border rounded-lg p-4 transition-colors cursor-pointer
                      ${
                        isCompatible 
                          ? "hover:border-blue-300 hover:bg-blue-50" 
                          : "border-red-200 bg-red-50 opacity-60"
                      }
                    `}
                    onClick={() => {
                      if (isCompatible && product.stockQuantity > 0) {
                        onSelectProduct(product);
                      }
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        {product.thumbnail ? (
                          <img 
                            src={product.thumbnail} 
                            alt={product.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-product.png';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Box className="h-8 w-8" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                          {product.productName}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-blue-600">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {product.stockQuantity > 0 ? (
                            <Badge variant="secondary" className="text-xs">
                              Còn {product.stockQuantity} sản phẩm
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="text-xs bg-red-100 text-red-600 border-red-200">
                              Hết hàng
                            </Badge>
                          )}
                          
                          {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                            <Badge variant="outline" className="text-xs text-orange-600">
                              Sắp hết
                            </Badge>
                          )}

                          {!isCompatible && (
                            <Badge variant="destructive" className="text-xs">
                              Không tương thích
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Select Button */}
                      <div className="flex-shrink-0">
                        <Button
                          size="sm"
                          disabled={product.stockQuantity === 0 || !isCompatible}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="min-w-[80px]"
                        >
                          Chọn
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </div> {/* Close padding div */}
        </div>
      </div>
    </>
  );
}