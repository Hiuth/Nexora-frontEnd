"use client";

import React from "react";

interface PCBuilderPageHeaderProps {
  // Props cho header nếu cần
}

export function PCBuilderPageHeader({}: PCBuilderPageHeaderProps) {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">PC Builder</h1>
        </div>
      </div>
    </div>
  );
}