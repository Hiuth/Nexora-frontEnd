"use client";

import { useEffect } from "react";
import { serviceManager } from "@/services/service-manager";

export function ServiceInitializer() {
  useEffect(() => {
    // Initialize services when app starts
    serviceManager.initialize();
  }, []);

  // This component doesn't render anything
  return null;
}
