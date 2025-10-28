"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function WarrantyButton() {
  return (
    <Button
      variant="ghost"
      size="lg"
      asChild
      className="flex flex-col items-center justify-center gap-1 p-2 h-16 rounded-lg"
    >
      <Link href="/warranty">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Image
              src="/order-icon.png"
              alt="Warranty Check"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="text-xs font-medium text-gray-700 text-center leading-tight">
            Tra cứu
            <br />
            bảo hành
          </span>
        </div>
      </Link>
    </Button>
  );
}
