"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PCBuilderButton() {
  return (
    <Button
      variant="ghost"
      size="lg"
      asChild
      className="flex flex-col items-center justify-center gap-1 p-2 h-16 rounded-lg"
    >
      <Link href="/pc-builder">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <img
              src="/icon-buildPc.png"
              alt="Build PC"
              className="w-4 h-4 md:w-5 md:h-5 object-contain"
            />
          </div>
          <div className="hidden md:block text-xs font-medium text-gray-700 text-left leading-tight">
            <div>Xây dựng</div>
            <div>cấu hình</div>
          </div>
        </div>
      </Link>
    </Button>
  );
}
