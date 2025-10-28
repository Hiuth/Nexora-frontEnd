// Service manager - Central control for all API services

import { CategoryService } from "./category.service";
import { ProductService } from "./product.service";
import { CartService } from "./cart.service";
import { OrderService } from "./order.service";
import { WarrantyService } from "./warranty.service";
import { PcBuildService } from "./pc-build.service";
import { BrandService } from "./brand.service";

export class ServiceManager {
  private static instance: ServiceManager;
  private isApiMode: boolean = false;

  private constructor() {}

  public static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager();
    }
    return ServiceManager.instance;
  }

  // Enable/disable API mode for all services
  public setApiMode(enabled: boolean): void {
    this.isApiMode = enabled;

    // Update all services
    CategoryService.enableApiMode(enabled);
    ProductService.enableApiMode(enabled);
    CartService.enableApiMode(enabled);
    OrderService.enableApiMode(enabled);
    WarrantyService.enableApiMode(enabled);
    PcBuildService.enableApiMode(enabled);
    BrandService.enableApiMode(enabled);

    console.log(`All services API mode: ${enabled ? "enabled" : "disabled"}`);
  }

  public getApiMode(): boolean {
    return this.isApiMode;
  }

  // Initialize services with environment-based configuration
  public initialize(): void {
    // Check if API is available based on environment
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const isDevelopment = process.env.NODE_ENV === "development";

    // Enable API mode if URL is provided and not in development
    // You can modify this logic based on your needs
    const shouldUseApi = apiUrl && !isDevelopment;

    this.setApiMode(Boolean(shouldUseApi));

    console.log("ServiceManager initialized:", {
      apiMode: this.isApiMode,
      apiUrl,
      environment: process.env.NODE_ENV,
    });
  }

  // Health check for API services
  public async healthCheck(): Promise<boolean> {
    if (!this.isApiMode) {
      return true; // Mock mode is always "healthy"
    }

    try {
      // You can implement actual health check endpoints here
      // For now, just return true
      return true;
    } catch (error) {
      console.error("API health check failed:", error);
      return false;
    }
  }

  // Get service status
  public getStatus() {
    return {
      apiMode: this.isApiMode,
      services: {
        category: "ready",
        product: "ready",
        cart: "ready",
        order: "ready",
        warranty: "ready",
        pcBuild: "ready",
        brand: "ready",
      },
    };
  }
}

// Export singleton instance
export const serviceManager = ServiceManager.getInstance();
