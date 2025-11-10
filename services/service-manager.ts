// Service manager - Central control for all API services

import { CategoryService } from "./category.service";
import { ProductService } from "./product.service";
import { ProductImgService } from "./product-img.service";
import { CartService } from "./cart.service";
import { OrderService } from "./order.service";
import { OrderDetailService } from "./order-detail.service";
import { PaymentService } from "./payment.service";
import { CheckoutService } from "./checkout.service";
import { WarrantyService } from "./warranty.service";
import { PcBuildService } from "./pc-build.service";
import { BrandService } from "./brand.service";
import { AuthService } from "./auth.service";

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

    // Update all services (except AuthService, CartService, OrderService, OrderDetailService,
    // PaymentService, and CheckoutService which always use API)
    CategoryService.enableApiMode(enabled);
    ProductService.enableApiMode(enabled);
    ProductImgService.enableApiMode(enabled);
    WarrantyService.enableApiMode(enabled);
    PcBuildService.enableApiMode(enabled);
    BrandService.enableApiMode(enabled);
  }

  public getApiMode(): boolean {
    return this.isApiMode;
  }

  // Initialize services with environment-based configuration
  public initialize(): void {
    // Check if API is available based on environment
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

    // Enable API mode if URL is provided (allow in development for testing)
    const shouldUseApi = Boolean(apiUrl);

    this.setApiMode(shouldUseApi);
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
        auth: "ready",
        category: "ready",
        product: "ready",
        productImg: "ready",
        cart: "ready",
        order: "ready",
        orderDetail: "ready",
        payment: "ready",
        checkout: "ready",
        warranty: "ready",
        pcBuild: "ready",
        brand: "ready",
      },
    };
  }
}

// Export singleton instance
export const serviceManager = ServiceManager.getInstance();
