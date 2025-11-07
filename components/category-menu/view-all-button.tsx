"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Category } from "@/lib/types";

interface ViewAllButtonProps {
  categoryId: string;
  categories: Category[];
}

export function ViewAllButton({ categoryId, categories }: ViewAllButtonProps) {
  const category = categories.find((c) => c.id === categoryId);

  if (!category) return null;

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <Link
        href={`/products?category=${categoryId}`}
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
      >
        Xem tất cả {category.categoryName}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
