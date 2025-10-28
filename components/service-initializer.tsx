"use client";

import { useEffect } from "react";
import { serviceManager } from "@/services/service-manager";

export function ServiceInitializer() {
  useEffect(() => {
    // Initialize services when app starts
    serviceManager.initialize();

    // Optional: Perform health check
    serviceManager.healthCheck().then((isHealthy) => {
      if (!isHealthy) {
        console.warn("API services health check failed, using mock data");
      }
    });
  }, []);

  // This component doesn't render anything
  return null;
}
