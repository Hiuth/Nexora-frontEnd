"use client";

import { Menu } from "lucide-react";

interface CategoryMenuButtonProps {
  onClick?: () => void;
}

export function CategoryMenuButton({ onClick }: CategoryMenuButtonProps) {
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
