"use client";

import { EmptyStateProps } from "@/lib/component-utils";
import { Package } from "lucide-react";

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
  children,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-12 px-4 ${className}`}
    >
      <div className="text-gray-400">
        {icon || <Package className="w-12 h-12" />}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        {description && <p className="text-gray-600 max-w-md">{description}</p>}
      </div>

      {action && <div className="mt-4">{action}</div>}

      {children}
    </div>
  );
}
