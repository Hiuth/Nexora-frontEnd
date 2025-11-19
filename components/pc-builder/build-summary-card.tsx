"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Package } from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import { BuildComponent } from "@/hooks/use-pc-builder";

interface BuildSummaryCardProps {
  components: BuildComponent[];
  totalPrice: number;
  selectedCount: number;
  isAuthenticated: boolean;
  onAddAllToCart?: () => void;
}

export function BuildSummaryCard({
  components,
  totalPrice,
  selectedCount,
  isAuthenticated,
  onAddAllToCart,
}: BuildSummaryCardProps) {
  const selectedComponents = components.filter(comp => comp.product !== null);

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tóm tắt cấu hình</span>
          <Badge variant="secondary">
            {selectedCount} linh kiện
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Components List */}
        {selectedComponents.length > 0 ? (
          <div className="space-y-3">
            {selectedComponents.map(component => (
              <div key={component.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Product Thumbnail */}
                  {component.product ? (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {component.product.thumbnail ? (
                        <img 
                          src={component.product.thumbnail} 
                          alt={component.product.productName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-product.png';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {component.icon}
                    </div>
                  )}
                  
                  {/* Component Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {component.name}
                    </p>
                    {component.product && (
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {component.product.productName}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Price and Quantity */}
                <div className="text-right flex-shrink-0">
                  {component.product && (
                    <>
                      <p className="text-sm font-medium">
                        {formatPrice(component.product.price * component.quantity)}
                      </p>
                      {component.quantity > 1 && (
                        <p className="text-xs text-gray-500">
                          x{component.quantity}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>Chưa có linh kiện nào được chọn</p>
          </div>
        )}

        {selectedComponents.length > 0 && (
          <>
            <Separator />
            
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Tổng cộng:</span>
              <span className="text-blue-600">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200" 
                onClick={onAddAllToCart}
                disabled={!isAuthenticated}
                title={!isAuthenticated ? "Cần đăng nhập để thêm vào giỏ hàng" : ""}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Thêm tất cả vào giỏ hàng
              </Button>
              
              {/* Warning message for unauthenticated users */}
              {!isAuthenticated && (
                <p className="text-sm text-red-500 text-center font-medium">
                  Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}