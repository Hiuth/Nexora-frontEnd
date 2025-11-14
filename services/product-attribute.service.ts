import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse } from "@/types/api";
import type { ProductAttributeResponse } from "@/types/api";
import { ProductAttribute } from "@/lib/types";

export class ProductAttributeService {
  /**
   * Get product attributes by product ID
   */
  static async getProductAttributesByProductId(
    productId: string
  ): Promise<ProductAttributeResponse[]> {
    try {
      const response = await apiClient.get<ProductAttributeResponse[]>(
        `${API_CONFIG.ENDPOINTS.PRODUCT_ATTRIBUTE.GET_BY_PRODUCT_ID}/${productId}`
      );
      return response.result || [];
    } catch (error) {
      console.error("Error fetching product attributes:", error);
      throw error;
    }
  }

  /**
   * Get product attributes by product ID - Legacy method for backward compatibility
   * Maps API response to local ProductAttribute type
   */
  static async getProductAttributes(
    productId: string
  ): Promise<ProductAttribute[]> {
    try {
      const attributeResponses = await this.getProductAttributesByProductId(
        productId
      );
      return attributeResponses.map(this.mapResponseToProductAttribute);
    } catch (error) {
      console.error("Error fetching product attributes (legacy):", error);
      // Return empty array as fallback
      return [];
    }
  }

  /**
   * Check if product has specific attribute
   */
  static async hasProductAttribute(
    productId: string,
    attributeName: string
  ): Promise<boolean> {
    try {
      const attributes = await this.getProductAttributesByProductId(productId);
      return attributes.some(
        (attr) =>
          attr.attributeName.toLowerCase() === attributeName.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking product attribute:", error);
      return false;
    }
  }

  /**
   * Get specific attribute value by name for a product
   */
  static async getProductAttributeValue(
    productId: string,
    attributeName: string
  ): Promise<string | null> {
    try {
      const attributes = await this.getProductAttributesByProductId(productId);
      const attribute = attributes.find(
        (attr) =>
          attr.attributeName.toLowerCase() === attributeName.toLowerCase()
      );
      return attribute?.value || null;
    } catch (error) {
      console.error("Error getting product attribute value:", error);
      return null;
    }
  }

  /**
   * Get all unique attribute names for a product
   */
  static async getProductAttributeNames(productId: string): Promise<string[]> {
    try {
      const attributes = await this.getProductAttributesByProductId(productId);
      return attributes.map((attr) => attr.attributeName);
    } catch (error) {
      console.error("Error getting product attribute names:", error);
      return [];
    }
  }

  /**
   * Helper function to map API ProductAttributeResponse to local ProductAttribute type
   */
  private static mapResponseToProductAttribute(
    response: ProductAttributeResponse
  ): ProductAttribute {
    return {
      id: response.id,
      productId: response.productId,
      attributeId: response.attributeId,
      value: response.value,
      attributeName: response.attributeName,
    };
  }
}
