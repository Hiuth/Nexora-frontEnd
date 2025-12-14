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
        if (filters.search) {
          // Priority for search - use getProducts with search parameter
          response = await ProductService.getProducts({
            page: 1,
            pageSize,
            search: filters.search,
            category: filters.categoryId,
            subcategory: filters.subCategoryId,
            brand: filters.brands?.join(","),
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          });
        } else if (filters.subCategoryId) {
          response = await ProductService.getProducts({
            page: 1,
            pageSize,
            subcategory: filters.subCategoryId,
            search: filters.search,
            brand: filters.brands?.join(","),
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          });
        } else if (filters.categoryId) {
          response = await ProductService.getProducts({
            page: 1,
            pageSize,
            category: filters.categoryId,
            search: filters.search,
            brand: filters.brands?.join(","),
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          });
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
        }

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
    // Allow load more for all modes that have pagination
    const filters = filtersRef.current;
    
    if (!hasMore || loadingMore || loading || currentPage >= totalPages) {
      return;
    }

    const nextPage = currentPage + 1;
    setLoadingMore(true);
    setError(null);

    try {
      let newProducts: Product[] = [];
      
      // Call appropriate API with filters
      if (filters.search) {
        // Priority for search
        newProducts = await ProductService.getProducts({
          page: nextPage,
          pageSize,
          search: filters.search,
          category: filters.categoryId,
          subcategory: filters.subCategoryId,
          brand: filters.brands?.join(","),
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        });
      } else if (filters.subCategoryId) {
        newProducts = await ProductService.getProducts({
          page: nextPage,
          pageSize,
          subcategory: filters.subCategoryId,
          search: filters.search,
          brand: filters.brands?.join(","),
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        });
      } else if (filters.categoryId) {
        newProducts = await ProductService.getProducts({
          page: nextPage,
          pageSize,
          category: filters.categoryId,
          search: filters.search,
          brand: filters.brands?.join(","),
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        });
      } else {
        // getAll
        newProducts = await ProductService.getProducts({
          page: nextPage,
          pageSize,
          search: filters.search,
          brand: filters.brands?.join(","),
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        });
      }

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