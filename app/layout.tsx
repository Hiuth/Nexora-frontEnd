import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC Store - Linh kiện PC chính hãng",
  description:
    "Chuyên cung cấp linh kiện PC, laptop gaming chính hãng với giá tốt nhất. Build PC theo yêu cầu với dịch vụ tư vấn chuyên nghiệp.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`font-sans bg-white text-gray-800 ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <CartProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
