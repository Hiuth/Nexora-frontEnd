import { useState, useEffect } from "react";
import { ProductImageResponse } from "@/types/api";
import { ProductImgService } from "@/services/product-img.service";

export function useProductImages(productId: string | null) {
  const [images, setImages] = useState<ProductImageResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      if (!productId) {
        setImages([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log("Loading images for product:", productId);
        const imageData = await ProductImgService.getProductImgByProductId(
          productId
        );
        console.log("Product images loaded:", imageData);
        setImages(imageData);
      } catch (error) {
        console.error("Failed to load product images:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [productId]);

  return {
    images,
    loading,
    error,
    refetch: () => {
      if (productId) {
        const loadImages = async () => {
          setLoading(true);
          setError(null);
          try {
            const imageData = await ProductImgService.getProductImgByProductId(
              productId
            );
            setImages(imageData);
          } catch (error) {
            console.error("Failed to refetch product images:", error);
            setError(error instanceof Error ? error.message : "Unknown error");
            setImages([]);
          } finally {
            setLoading(false);
          }
        };
        loadImages();
      }
    },
  };
}
