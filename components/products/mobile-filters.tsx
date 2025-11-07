"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Brand } from "@/lib/types";

interface MobileFiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  brands: Brand[];
  selectedBrands: string[];
  hasActiveFilters: boolean;
  onBrandChange: (brandId: string) => void;
  onClearFilters: () => void;
}

export function MobileFilters({
  showFilters,
  setShowFilters,
  brands,
  selectedBrands,
  hasActiveFilters,
  onBrandChange,
  onClearFilters,
}: MobileFiltersProps) {
  if (!showFilters) return null;

  return (
    <Card className="lg:hidden mb-6 border-gray-200 shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Bộ lọc</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-semibold mb-2 block">
              Thương hiệu
            </Label>
            <div className="max-h-96 overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-mobile-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={() => onBrandChange(brand.id)}
                    />
                    <label
                      htmlFor={`brand-mobile-${brand.id}`}
                      className="text-xs cursor-pointer flex-1 leading-tight"
                    >
                      {brand.brandName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="w-full"
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
