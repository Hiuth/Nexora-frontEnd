"use client";

import { useState, useEffect } from "react";
import { ProductAttributeService } from "@/services/product-attribute.service";
import type { ProductAttributeResponse } from "@/types/api";

interface ProductAttributesProps {
  productId: string;
}

export function ProductAttributes({ productId }: ProductAttributesProps) {
  const [attributes, setAttributes] = useState<ProductAttributeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAttributes = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const attributesData =
          await ProductAttributeService.getProductAttributesByProductId(
            productId
          );
        setAttributes(attributesData);
      } catch (error) {
        console.error("Failed to load product attributes:", error);
        setError("Không thể tải thông số kỹ thuật");
      } finally {
        setLoading(false);
      }
    };

    loadAttributes();
  }, [productId]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex py-3 border-b border-gray-100">
            <div className="w-1/3">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  if (attributes.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">
          Chưa có thông số kỹ thuật chi tiết
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {attributes.map((attribute) => (
        <div
          key={attribute.id}
          className="flex py-3 border-b border-gray-100 last:border-b-0"
        >
          <span className="font-medium w-1/3 text-gray-700">
            {attribute.attributeName}
          </span>
          <span className="text-gray-600 flex-1">{attribute.value}</span>
        </div>
      ))}
    </div>
  );
}
