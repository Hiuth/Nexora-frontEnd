"use client";

import { useState, useEffect } from "react";
import { Product, PaginatedResponse } from "@/lib/types";
import { ProductService } from "@/services/product.service";

export function useProducts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) {
  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ProductService.getProducts(params);
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(params)]);

  return { products, loading, error, refetch: () => fetchProducts() };
}

export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await ProductService.getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
}

export function useFeaturedProducts(limit: number = 10) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ProductService.getFeaturedProducts(limit);
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch featured products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [limit]);

  return { products, loading, error };
}

export function useProductSearch(query: string, limit: number = 20) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    const searchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ProductService.searchProducts(query, limit);
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to search products"
        );
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, limit]);

  return { products, loading, error };
}
