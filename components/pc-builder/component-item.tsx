"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Minus } from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import type { Product } from "@/lib/types";
import Image from "next/image";

interface BuildComponent {
  category: string;
  categoryId: number;
  icon: React.ReactNode;
  product: Product | null;
  quantity: number;
  required: boolean;
  categoryType: string;
}

interface ComponentItemProps {
  component: BuildComponent;
  onSelectComponent: (categoryId: number) => void;
  onRemoveComponent: (categoryId: number) => void;
  onUpdateQuantity: (categoryId: number, quantity: number) => void;
}

export function ComponentItem({
  component,
  onSelectComponent,
  onRemoveComponent,
  onUpdateQuantity,
}: ComponentItemProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 shadow-sm border-0">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0 shadow-sm">
            {component.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                {component.category}
              </h3>
              {component.required && (
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-600 border-blue-200 text-xs shadow-sm"
                >
                  Bắt buộc
                </Badge>
              )}
            </div>
            {component.product ? (
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 shadow-sm">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                    <Image
                      src={component.product.thumbnail || "/placeholder.svg"}
                      alt={component.product.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-800">
                        {component.product.productName}
                      </p>
                      {/* Quantity controls and delete button */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 shadow-sm hover:bg-blue-100 hover:border-blue-300"
                          onClick={() =>
                            onUpdateQuantity(
                              component.categoryId,
                              Math.max(1, component.quantity - 1)
                            )
                          }
                          disabled={component.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          max="99"
                          value={component.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            onUpdateQuantity(
                              component.categoryId,
                              Math.max(1, Math.min(99, value))
                            );
                          }}
                          className="w-12 h-6 text-center text-xs shadow-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 shadow-sm hover:bg-blue-100 hover:border-blue-300"
                          onClick={() =>
                            onUpdateQuantity(
                              component.categoryId,
                              Math.min(99, component.quantity + 1)
                            )
                          }
                          disabled={component.quantity >= 99}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            onRemoveComponent(component.categoryId)
                          }
                          className="h-6 w-6 ml-1 text-red-500 hover:bg-red-50 hover:border-red-300 shadow-sm"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700 font-medium text-sm">
                        {formatPrice(component.product.price)}
                      </p>
                      {/* Total price - same level as original price */}
                      {component.quantity > 1 && (
                        <p className="text-blue-700 font-bold text-base">
                          {formatPrice(
                            component.product.price * component.quantity
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg p-4 text-center bg-white shadow-sm border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                <p className="text-gray-500 text-sm mb-3">
                  Chưa chọn {component.category.toLowerCase()}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectComponent(component.categoryId)}
                  className="bg-white hover:bg-blue-50 border-blue-300 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Chọn {component.category}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
