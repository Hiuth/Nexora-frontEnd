"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogIn } from "lucide-react";

interface LoginRequiredDialogProps {
  open: boolean;
  onClose?: () => void;
}

export function LoginRequiredDialog({
  open,
  onClose,
}: LoginRequiredDialogProps) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    onClose?.();
    router.push("/login");
  };

  const handleGoHome = () => {
    onClose?.();
    router.push("/");
  };

  return (
    <Dialog open={open} onOpenChange={() => {}} modal={true}>
      <DialogPortal>
        <DialogOverlay className="bg-black/20 backdrop-blur-sm" />
        <DialogContent
          className="sm:max-w-md"
          onPointerDownOutside={(e) => e.preventDefault()}
          showCloseButton={false}
        >
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Cần đăng nhập để xem giỏ hàng
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Bạn cần đăng nhập để có thể xem và quản lý giỏ hàng của mình. Đăng
              nhập ngay để tiếp tục mua sắm!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
            <Button
              variant="outline"
              onClick={handleGoHome}
              className="w-full sm:w-auto"
            >
              Về trang chủ
            </Button>
            <Button
              onClick={handleLoginRedirect}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              <LogIn className="w-4 h-4 mr-2 text-white" />
              Đăng nhập ngay
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
