"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PCBuilderContent } from "@/components/pc-builder/pc-builder-content";

export default function PCBuilderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <PCBuilderContent />
      </main>

      <Footer />
    </div>
  );
}
