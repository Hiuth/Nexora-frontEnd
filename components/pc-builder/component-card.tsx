"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import { BuildComponent } from "@/hooks/use-pc-builder";

interface ComponentCardProps {
  component: BuildComponent;
  onSelect: () => void;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

export function ComponentCard({
  component,
  onSelect,
  onRemove,
  onQuantityChange,
}: ComponentCardProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, component.quantity + delta);
    onQuantityChange(newQuantity);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Component Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              {component.icon}
            </div>
          </div>

          {/* Component Info */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">{component.name}</h3>
            </div>

            {component.product ? (
              <div className="space-y-3">
                {/* Selected Product */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    {component.product.thumbnail && (
                      <img
                        src={component.product.thumbnail}
                        alt={component.product.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                        {component.product.productName}
                      </h4>
                      <p className="text-blue-600 font-semibold mt-1">
                        {formatPrice(component.product.price)}
                      </p>
                      {component.product.stockQuantity <= 5 && component.product.stockQuantity > 0 && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          Chỉ còn {component.product.stockQuantity}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Số lượng:</span>
                    <div className="flex items-center gap-1 border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={component.quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={component.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          onQuantityChange(Math.max(1, val));
                        }}
                        className="w-16 h-8 text-center border-0 focus:ring-0"
                        min="1"
                        max={component.product.stockQuantity}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(1)}
                        disabled={component.quantity >= component.product.stockQuantity}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Tổng:</p>
                    <p className="font-semibold text-blue-600">
                      {formatPrice(component.product.price * component.quantity)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={onSelect} className="flex-1">
                    Đổi sản phẩm
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRemove}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Empty State */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-gray-400 mb-2">
                    <Plus className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Chưa chọn {component.name.toLowerCase()}
                  </p>
                  <Button onClick={onSelect} size="sm">
                    Chọn {component.name}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}