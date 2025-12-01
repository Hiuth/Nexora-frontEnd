"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export function SuccessStep() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleGoToLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Đăng nhập ngay
        </Button>
        
        <p className="text-sm text-gray-500">
          Tự động chuyển đến trang đăng nhập sau 3 giây...
        </p>
      </div>
    </div>
  );
}