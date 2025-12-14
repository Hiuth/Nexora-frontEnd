"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/types";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getProducts(params);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(params)]);

  return { products, loading, error, refetch: fetchProducts };
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

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ProductService.getFeaturedProducts();
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
  }, []);

  return { products, loading, error };
}

export function useProductSearch(query: string, pageSize: number = 10) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const searchProducts = async (page: number = 1, append: boolean = false) => {
    if (!query.trim()) {
      setProducts([]);
      setCurrentPage(1);
      setHasMore(false);
      setTotalPages(0);
      setTotalCount(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await ProductService.searchProducts(query, {
        page,
        pageSize
      });
      
      // Extract pagination info
      const paginationInfo = (data as any).__paginationInfo;
      
      if (append) {
        setProducts(prev => [...prev, ...data]);
      } else {
        setProducts(data);
      }
      
      if (paginationInfo) {
        setCurrentPage(paginationInfo.currentPage);
        setTotalPages(paginationInfo.totalPages);
        setTotalCount(paginationInfo.totalCount);
        setHasMore(paginationInfo.hasNextPage);
      } else {
        setCurrentPage(page);
        setTotalPages(Math.ceil(data.length / pageSize));
        setTotalCount(data.length);
        setHasMore(data.length === pageSize);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to search products"
      );
      if (!append) {
        setProducts([]);
        setCurrentPage(1);
        setHasMore(false);
        setTotalPages(0);
        setTotalCount(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (hasMore && !loading) {
      await searchProducts(currentPage + 1, true);
    }
  };

  const reset = () => {
    setProducts([]);
    setCurrentPage(1);
    setHasMore(false);
    setTotalPages(0);
    setTotalCount(0);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchProducts(1, false);
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { 
    products, 
    loading, 
    error, 
    currentPage,
    hasMore,
    totalPages,
    totalCount,
    loadMore,
    reset,
    refetch: () => searchProducts(1, false)
  };
}
