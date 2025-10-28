"use client";

import { useState, useEffect } from "react";
import { PcBuild, PcBuildItem } from "@/lib/types";
import { PcBuildService } from "@/services/pc-build.service";

export function usePcBuilds() {
  const [builds, setBuilds] = useState<PcBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await PcBuildService.getPcBuilds();
        setBuilds(data);
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
        const data = await PcBuildService.getPcBuildItems(buildId);
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
        const data = await PcBuildService.getRecommendations(budget, purpose);
        setRecommendations(data);
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
      const build = await PcBuildService.createPcBuild(buildData);
      return build;
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
