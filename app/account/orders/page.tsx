"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to account page with orders-management tab
    router.replace("/account?tab=orders-management");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-slate-50 to-blue-50/30">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-slate-600">Đang chuyển hướng...</p>
      </div>
    </div>
  );
}
