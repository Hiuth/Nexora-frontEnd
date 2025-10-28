"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { ErrorStateProps } from "@/lib/component-utils";
import { Button } from "@/components/ui/button";

export function ErrorState({
  error,
  onRetry,
  showRetry = true,
  className = "",
  children,
}: ErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-8 px-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-red-600">
        <AlertTriangle className="w-6 h-6" />
        <h3 className="text-lg font-semibold">Có lỗi xảy ra</h3>
      </div>

      <p className="text-center text-gray-600 max-w-md">{error}</p>

      {showRetry && onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Thử lại
        </Button>
      )}

      {children}
    </div>
  );
}
