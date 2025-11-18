"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface ProductsAutoLoaderProps {
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  onLoadMore: () => void;
  onRetry?: () => void;
}

export function ProductsAutoLoader({
  loading,
  hasMore,
  error,
  onLoadMore,
  onRetry,
}: ProductsAutoLoaderProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const lastLoadTime = useRef<number>(0);

  // Intersection Observer for auto-loading
  useEffect(() => {
    if (!hasMore || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        
        if (target.isIntersecting && !loading) {
          // Throttle calls - minimum 1500ms between requests
          const now = Date.now();
          const timeSinceLastLoad = now - lastLoadTime.current;
          if (timeSinceLastLoad < 1500) {
            return;
          }
          
          lastLoadTime.current = now;
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px",
      }
    );

    const trigger = triggerRef.current;
    if (trigger) {
      observer.observe(trigger);
    }

    return () => {
      if (trigger) {
        observer.unobserve(trigger);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  if (!hasMore && !loading && !error) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-400">
        <div className="text-center">
          <p className="text-sm mb-1">🎉 Bạn đã xem hết tất cả sản phẩm!</p>
          <p className="text-xs">Hãy thử thay đổi bộ lọc để xem thêm sản phẩm khác</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      {/* Auto-loader trigger */}
      <div ref={triggerRef} className="h-4" />
      
      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p className="text-sm">Đang tải thêm sản phẩm...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex flex-col items-center justify-center py-8 text-red-500">
          <p className="text-sm">{error}</p>
          <button
            onClick={onRetry || onLoadMore}
            className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      )}
    </div>
  );
}