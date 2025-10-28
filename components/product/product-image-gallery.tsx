"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";

interface ProductImageGalleryProps {
  product: Product;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock images for gallery
  const productImages = [
    product.thumbnail,
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ];

  return (
    <div className="space-y-4">
      {/* Main Image - Same width as thumbnails */}
      <div className="relative w-full">
        <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
          <Image
            src={
              productImages[selectedImage] ||
              product.thumbnail ||
              "/placeholder.svg"
            }
            alt={product.productName}
            fill
            className="object-contain hover:scale-105 transition-transform duration-300"
            priority
          />
          {product.stockQuantity === 0 && (
            <Badge className="absolute top-4 right-4 bg-destructive">
              Hết hàng
            </Badge>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery - Natural aspect ratio */}
      <div className="grid grid-cols-4 gap-3">
        {productImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
              selectedImage === idx
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image
              src={img || "/placeholder.svg"}
              alt={`${product.productName} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
