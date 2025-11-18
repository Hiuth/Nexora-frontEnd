"use client";

import { useState, useEffect, useCallback } from "react";
import { PcBuild, PcBuildItem } from "@/lib/types";
import { PcBuildService } from "@/services/pc-build.service";
import { PcBuildItemService } from "@/services/pc-build-item.service";

export function usePcBuilds() {
  const [builds, setBuilds] = useState<PcBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await PcBuildService.getPcBuilds();
        setBuilds(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch PC builds"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  return { builds, loading, error };
}

export function usePcBuild(buildId: string) {
  const [build, setBuild] = useState<PcBuild | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuild = async () => {
      if (!buildId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await PcBuildService.getPcBuildById(buildId);
        setBuild(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch PC build"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBuild();
  }, [buildId]);

  return { build, loading, error };
}

export function usePcBuildItems(buildId: string) {
  const [items, setItems] = useState<PcBuildItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (!buildId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await PcBuildItemService.getPcBuildItemsByPcBuildId(buildId);
        setItems(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch PC build items"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [buildId]);

  return { items, loading, error };
}

export function usePcBuildRecommendations(budget?: number, purpose?: string) {
  const [recommendations, setRecommendations] = useState<PcBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: Implement recommendations endpoint
        // const data = await PcBuildService.getRecommendations(budget, purpose);
        setRecommendations([]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch recommendations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [budget, purpose]);

  return { recommendations, loading, error };
}

export function useCreatePcBuild() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBuild = async (buildData: {
    productName: string;
    description?: string;
    items: { productId: string; quantity: number }[];
  }) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement create PC build endpoint
      // const build = await PcBuildService.createPcBuild(buildData);
      throw new Error("Create PC build not implemented yet");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create PC build";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createBuild, loading, error };
}

interface UsePcBuildsInfiniteOptions {
  getAll?: boolean;
  categoryId?: string;
  subCategoryId?: string;
  enabled?: boolean;
}

interface UsePcBuildsInfiniteResult {
  pcBuilds: PcBuild[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  loadMorePcBuilds: () => Promise<void>;
}

export function usePcBuildsInfinite({
  getAll,
  categoryId,
  subCategoryId,
  enabled = true,
}: UsePcBuildsInfiniteOptions): UsePcBuildsInfiniteResult {
  const [pcBuilds, setPcBuilds] = useState<PcBuild[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const resetState = useCallback(() => {
    setPcBuilds([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  const fetchPcBuilds = useCallback(
    async (page: number, reset = false) => {
      if (!enabled) return;

      try {
        const isFirstLoad = page === 1;
        if (isFirstLoad) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        let response;

        if (subCategoryId) {
          // Priority 1: SubCategory filter
          response = await PcBuildService.getPcBuildsBySubCategoryId({
            subCategoryId,
            page,
            pageSize,
          });
        } else if (categoryId) {
          // Priority 2: Category filter
          response = await PcBuildService.getPcBuildsByCategoryId({
            categoryId,
            page,
            pageSize,
          });
        } else if (getAll) {
          // Priority 3: Get all
          response = await PcBuildService.getPcBuilds({
            page,
            pageSize,
          });
        } else {
          return;
        }

        const newPcBuilds = response;
        const paginationInfo = (response as any).__paginationInfo;

        if (reset) {
          setPcBuilds(newPcBuilds);
        } else {
          setPcBuilds((prev) => [...prev, ...newPcBuilds]);
        }

        setHasMore(
          paginationInfo 
            ? paginationInfo.currentPage < paginationInfo.totalPages
            : false
        );
        setCurrentPage(page);
        setError(null);
      } catch (err) {
        console.error('Error fetching PC builds:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch PC builds');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [enabled, getAll, categoryId, subCategoryId, pageSize]
  );

  const loadMorePcBuilds = useCallback(async () => {
    if (!hasMore || loading || loadingMore) return;
    await fetchPcBuilds(currentPage + 1);
  }, [hasMore, loading, loadingMore, currentPage, fetchPcBuilds]);

  // Reset and fetch initial data when dependencies change
  useEffect(() => {
    if (!enabled) return;
    
    resetState();
    fetchPcBuilds(1, true);
  }, [enabled, getAll, categoryId, subCategoryId, resetState, fetchPcBuilds]);

  return {
    pcBuilds,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMorePcBuilds,
  };
}
