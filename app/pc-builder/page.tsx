"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PCBuilderContent } from "@/components/pc-builder/pc-builder-content";

export default function PCBuilderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <PCBuilderContent />
      </main>

      <Footer />
    </div>
  );
}
