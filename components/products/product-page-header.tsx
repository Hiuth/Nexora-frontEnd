"use client";

import { Badge } from "@/components/ui/badge";

interface ProductPageHeaderProps {
  title?: string;
  isPcBuildMode: boolean;
  totalCount: number;
}

export function ProductPageHeader({ title, isPcBuildMode, totalCount }: ProductPageHeaderProps) {
  if (!title) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>
          {isPcBuildMode && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Máy bộ Nexora
            </Badge>
          )}
        </div>
        
        <div className="text-sm text-gray-600">
          {totalCount > 0 && (
            <span>
              {totalCount} {isPcBuildMode ? 'cấu hình' : 'sản phẩm'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}