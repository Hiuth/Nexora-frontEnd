"use client";

import { Menu } from "lucide-react";

interface CategoryMenuButtonProps {
  onClick?: () => void;
  compact?: boolean;
  isOpen?: boolean;
}

export function CategoryMenuButton({
  onClick,
  compact,
  isOpen = false,
}: CategoryMenuButtonProps) {
  if (compact) {
    return (
      <button
        aria-label="Danh mục"
        className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
          isOpen
            ? "bg-blue-600 text-white"
            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
        }`}
        onClick={onClick}
      >
        <Menu className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      className="bg-blue-600 text-white px-4 py-4 rounded-lg h-14 flex items-center gap-2 font-medium text-sm min-w-[200px] justify-center"
      onClick={onClick}
    >
      <Menu className="h-5 w-5" />
      Danh mục sản phẩm
    </button>
  );
}
