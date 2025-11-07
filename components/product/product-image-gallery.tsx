"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import type { ProductImageResponse } from "@/types/api";

interface ProductImageGalleryProps {
  product: Product;
  productImages?: ProductImageResponse[];
  imagesLoading?: boolean;
}

export function ProductImageGallery({
  product,
  productImages = [],
  imagesLoading = false,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [thumbnailStart, setThumbnailStart] = useState(0);

  // Put thumbnail first, then product images
  const allImages = [
    product.thumbnail,
    ...(productImages.map((img) => img.imgUrl) || []),
  ].filter(Boolean);

  // If no images available, use placeholder
  const displayImages = allImages.length > 0 ? allImages : ["/placeholder.svg"];

  // Thumbnail navigation settings
  const maxVisibleThumbnails = 4;
  const canScrollLeft = thumbnailStart > 0;
  const canScrollRight =
    thumbnailStart + maxVisibleThumbnails < displayImages.length;

  const visibleThumbnails = displayImages.slice(
    thumbnailStart,
    thumbnailStart + maxVisibleThumbnails
  );

  const scrollThumbnails = (direction: "left" | "right") => {
    if (direction === "left" && canScrollLeft) {
      setThumbnailStart((prev) => Math.max(0, prev - 1));
    } else if (direction === "right" && canScrollRight) {
      setThumbnailStart((prev) =>
        Math.min(displayImages.length - maxVisibleThumbnails, prev + 1)
      );
    }
  };

  const handleThumbnailClick = (globalIndex: number) => {
    setSelectedImage(globalIndex);

    // Auto-scroll thumbnails if selected image is not visible
    if (globalIndex < thumbnailStart) {
      setThumbnailStart(globalIndex);
    } else if (globalIndex >= thumbnailStart + maxVisibleThumbnails) {
      setThumbnailStart(globalIndex - maxVisibleThumbnails + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && selectedImage > 0) {
        handleThumbnailClick(selectedImage - 1);
      } else if (
        e.key === "ArrowRight" &&
        selectedImage < displayImages.length - 1
      ) {
        handleThumbnailClick(selectedImage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, displayImages.length]);

  if (imagesLoading) {
    return (
      <div className="space-y-4">
        {/* Loading Main Image */}
        <div className="relative w-full">
          <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="w-full h-full bg-gray-300"></div>
          </div>
        </div>

        {/* Loading Thumbnails */}
        <div className="relative">
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-200 animate-pulse"
              >
                <div className="w-full h-full bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image - Same width as thumbnails */}
      <div className="relative w-full">
        <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm group">
          <Image
            src={
              displayImages[selectedImage] ||
              product.thumbnail ||
              "/placeholder.svg"
            }
            alt={product.productName}
            fill
            className="object-contain hover:scale-105 transition-transform duration-300"
            priority
          />

          {/* Navigation arrows on main image */}
          {displayImages.length > 1 && (
            <>
              {selectedImage > 0 && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-10 w-10 rounded-full shadow-lg"
                  onClick={() => handleThumbnailClick(selectedImage - 1)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}

              {selectedImage < displayImages.length - 1 && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-10 w-10 rounded-full shadow-lg"
                  onClick={() => handleThumbnailClick(selectedImage + 1)}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </>
          )}

          {/* Image counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
              {selectedImage + 1} / {displayImages.length}
            </div>
          )}

          {product.stockQuantity === 0 && (
            <Badge className="absolute top-4 right-4 bg-destructive">
              Hết hàng
            </Badge>
          )}
        </div>
      </div>

      {/* Thumbnail Gallery with Navigation */}
      <div className="relative">
        {/* Navigation Buttons */}
        {displayImages.length > maxVisibleThumbnails && (
          <>
            <Button
              variant="outline"
              size="icon"
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-md ${
                !canScrollLeft
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => scrollThumbnails("left")}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-md ${
                !canScrollRight
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => scrollThumbnails("right")}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Thumbnail Grid */}
        <div
          className={`grid grid-cols-4 gap-3 ${
            displayImages.length > maxVisibleThumbnails ? "px-8" : ""
          }`}
        >
          {visibleThumbnails.map((img, visibleIndex) => {
            const globalIndex = thumbnailStart + visibleIndex;
            return (
              <button
                key={globalIndex}
                onClick={() => handleThumbnailClick(globalIndex)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  selectedImage === globalIndex
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.productName} ${globalIndex + 1}`}
                  fill
                  className="object-cover"
                />
                {/* Show indicator for thumbnail (first image) */}
                {globalIndex === 0 && (
                  <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                    Chính
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Show total count if there are more images */}
        {displayImages.length > maxVisibleThumbnails && (
          <div className="text-center mt-2 text-sm text-gray-500">
            {thumbnailStart + 1}-
            {Math.min(
              thumbnailStart + maxVisibleThumbnails,
              displayImages.length
            )}{" "}
            / {displayImages.length} ảnh
          </div>
        )}
      </div>
    </div>
  );
}
