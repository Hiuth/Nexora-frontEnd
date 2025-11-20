"use client";

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
    <div className="space-y-6">
      {/* Simple Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cấu hình của bạn</h3>
        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
          {selectedCount} linh kiện
        </Badge>
      </div>
      
      {/* Components List */}
      {selectedComponents.length > 0 ? (
        <div className="space-y-3">
          {selectedComponents.map(component => (
            <div key={component.id} className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm">
              {/* Simple Thumbnail */}
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                {component.product?.thumbnail ? (
                  <img 
                    src={component.product.thumbnail} 
                    alt={component.product.productName}
                    className="w-8 h-8 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-product.png';
                    }}
                  />
                ) : (
                  <Package className="h-4 w-4 text-gray-400" />
                )}
              </div>
              
              {/* Component Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {component.name}
                </p>
                {component.product && (
                  <p className="text-xs text-gray-600 truncate">
                    {component.product.productName}
                  </p>
                )}
              </div>
              
              {/* Price */}
              <div className="text-right">
                {component.product && (
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(component.product.price * component.quantity)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm">Chưa chọn linh kiện nào</p>
        </div>
      )}

      {selectedComponents.length > 0 && (
        <>
          <Separator />
          
          {/* Simple Total */}
          <div className="flex items-center justify-between py-4 bg-white rounded-lg px-4 shadow-sm">
            <span className="font-semibold text-gray-900">Tổng cộng</span>
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {/* Simple Button */}
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={onAddAllToCart}
            disabled={!isAuthenticated}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Thêm vào giỏ hàng
          </Button>
          
          {!isAuthenticated && (
            <p className="text-xs text-red-600 text-center">
              Vui lòng đăng nhập để thêm vào giỏ hàng
            </p>
          )}
        </>
      )}
    </div>
  );
}