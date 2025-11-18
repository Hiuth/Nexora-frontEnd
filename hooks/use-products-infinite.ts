"use client";

import { useState, useCallback, useRef } from "react";
import { Product } from "@/lib/types";
import { ProductService } from "@/services/product.service";

interface ProductFilterOptions {
  search?: string;
  brands?: string[];
  categoryId?: string;
  subCategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface UseProductsInfiniteReturn {
  products: Product[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  totalItems: number;
  currentPage: number;
  fetchProducts: (filters?: ProductFilterOptions) => Promise<void>;
  loadMoreProducts: () => Promise<void>;
  reset: () => void;
}

export function useProductsInfinite(): UseProductsInfiniteReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Store current filters to use for load more
  const filtersRef = useRef<ProductFilterOptions>({});
  const pageSize = 10; // Cố định pageSize = 10
  
  const fetchProducts = useCallback(
    async (filters: ProductFilterOptions = {}) => {
      setLoading(true);
      setError(null);
      filtersRef.current = filters;
      
      try {
        let response: Product[] = [];

        // Choose appropriate API endpoint based on filters
        if (filters.subCategoryId) {
          response = await ProductService.getProductBySubCategoryId(filters.subCategoryId);
          // For category/subcategory, show all results, no pagination
          setProducts(response);
          setTotalItems(response.length);
          setCurrentPage(1);
          setTotalPages(1);
          setHasMore(false);
        } else if (filters.categoryId) {
          response = await ProductService.getProductByCategoryID(filters.categoryId);
          // For category/subcategory, show all results, no pagination
          setProducts(response);
          setTotalItems(response.length);
          setCurrentPage(1);
          setTotalPages(1);
          setHasMore(false);
        } else {
          // getAll with pagination
          response = await ProductService.getProducts({
            page: 1,
            pageSize,
            search: filters.search,
            brand: filters.brands?.join(","),
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          });

          // Extract pagination info
          const paginationInfo = (response as any).__paginationInfo;
          
          setProducts(response);
          setCurrentPage(1);
          
          if (paginationInfo) {
            setTotalItems(paginationInfo.totalCount);
            setTotalPages(paginationInfo.totalPages);
            setHasMore(paginationInfo.totalPages > 1);
          } else {
            // Fallback for mock data
            setTotalItems(response.length);
            setTotalPages(response.length === pageSize ? 2 : 1);
            setHasMore(response.length === pageSize);
          }
        }

      } catch (err: any) {
        console.error("❌ fetchProducts error:", err);
        setError(err.message || "Failed to fetch products");
        setProducts([]);
        setTotalItems(0);
        setTotalPages(0);
        setHasMore(false);
        setCurrentPage(1);
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  const loadMoreProducts = useCallback(async () => {
    // Only allow load more for getAll mode
    const filters = filtersRef.current;
    const isGetAll = !filters.categoryId && !filters.subCategoryId;
    
    if (!isGetAll || !hasMore || loadingMore || loading || currentPage >= totalPages) {

      return;
    }

    const nextPage = currentPage + 1;
    setLoadingMore(true);
    setError(null);

    try {
      const newProducts = await ProductService.getProducts({
        page: nextPage,
        pageSize,
        search: filters.search,
        brand: filters.brands?.join(","),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      });

      if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        setCurrentPage(nextPage);
        setTotalItems(prev => prev + newProducts.length);
        
        // Check if we have more pages
        const paginationInfo = (newProducts as any).__paginationInfo;
        if (paginationInfo) {
          setHasMore(nextPage < paginationInfo.totalPages);
        } else {
          setHasMore(newProducts.length === pageSize);
        }
      } else {
        setHasMore(false);
      }

    } catch (err: any) {
      console.error("❌ Load more error:", err);
      setError(err.message || "Failed to load more products");
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, loading, currentPage, totalPages, pageSize]);

  const reset = useCallback(() => {
    setProducts([]);
    setLoading(false);
    setLoadingMore(false);
    setError(null);
    setHasMore(true);
    setCurrentPage(1);
    setTotalItems(0);
    setTotalPages(0);
    filtersRef.current = {};
  }, []);

  return {
    products,
    loading,
    loadingMore,
    error,
    hasMore,
    totalItems,
    currentPage,
    fetchProducts,
    loadMoreProducts,
    reset,
  };
}