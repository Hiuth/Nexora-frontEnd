"use client";

import { LoadingSpinnerProps } from "@/lib/component-utils";
import { Spinner } from "@/components/ui/spinner";

export function LoadingSpinner({
  size = "md",
  text = "Đang tải...",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 py-4 ${className}`}
    >
      <Spinner className={sizeClasses[size]} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
}
