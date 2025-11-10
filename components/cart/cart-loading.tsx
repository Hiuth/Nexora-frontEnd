"use client";

interface CartLoadingProps {
  message?: string;
}

export function CartLoading({
  message = "Đang tải giỏ hàng...",
}: CartLoadingProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
