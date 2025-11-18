import { PcBuild } from "@/lib/types";
import { apiGet } from "@/lib/api-base";
import { API_CONFIG } from "@/config/api.config";
import { PaginatedResponse } from "@/types/api";

export class PcBuildService {
  // Use API now
  private static USE_API = true;

  // Simulate API delay for mock data
  private static async delay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get all PC builds with pagination
  static async getPcBuilds(params?: {
    page?: number;
    pageSize?: number;
  }): Promise<PcBuild[]> {
    if (this.USE_API) {
      try {
        const queryParams: any = {};
        if (params?.page) queryParams.pageNumber = params.page;
        if (params?.pageSize) queryParams.pageSize = params.pageSize;

        const response = await apiGet<PaginatedResponse<PcBuild>>(
          API_CONFIG.ENDPOINTS.PC_BUILD.GET_ALL,
          queryParams
        );

        if (response.code === 1000 && response.result) {
          const paginatedData = response.result;
          const pcBuilds = paginatedData.items || [];
          
          // Store pagination info for hook to use
          (pcBuilds as any).__paginationInfo = {
            totalCount: paginatedData.totalCount,
            totalPages: paginatedData.totalPages,
            currentPage: paginatedData.currentPage,
            hasNextPage: paginatedData.currentPage < paginatedData.totalPages
          };
          
          return Array.isArray(pcBuilds) ? pcBuilds : [];
        }

        return [];
      } catch (error) {
        console.error("Failed to fetch PC builds from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return []; // TODO: Add mock PC builds
  }

  // Get PC builds by category with pagination
  static async getPcBuildsByCategoryId(params: {
    categoryId: string;
    page?: number;
    pageSize?: number;
  }): Promise<PcBuild[]> {
    if (this.USE_API) {
      try {
        const queryParams: any = {};
        if (params?.page) queryParams.pageNumber = params.page;
        if (params?.pageSize) queryParams.pageSize = params.pageSize;

        const response = await apiGet<PaginatedResponse<PcBuild>>(
          `${API_CONFIG.ENDPOINTS.PC_BUILD.GET_BY_CATEGORY_ID}/${encodeURIComponent(params.categoryId)}`,
          queryParams
        );

        if (response.code === 1000 && response.result) {
          const paginatedData = response.result;
          const pcBuilds = paginatedData.items || [];
          
          // Store pagination info for hook to use
          (pcBuilds as any).__paginationInfo = {
            totalCount: paginatedData.totalCount,
            totalPages: paginatedData.totalPages,
            currentPage: paginatedData.currentPage,
            hasNextPage: paginatedData.currentPage < paginatedData.totalPages
          };
          
          return Array.isArray(pcBuilds) ? pcBuilds : [];
        }

        return [];
      } catch (error) {
        console.error("Failed to fetch PC builds by category from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return [];
  }

  // Get PC builds by subcategory with pagination
  static async getPcBuildsBySubCategoryId(params: {
    subCategoryId: string;
    page?: number;
    pageSize?: number;
  }): Promise<PcBuild[]> {
    if (this.USE_API) {
      try {
        const queryParams: any = {};
        if (params?.page) queryParams.pageNumber = params.page;
        if (params?.pageSize) queryParams.pageSize = params.pageSize;

        const response = await apiGet<PaginatedResponse<PcBuild>>(
          `${API_CONFIG.ENDPOINTS.PC_BUILD.GET_BY_SUBCATEGORY_ID}/${encodeURIComponent(params.subCategoryId)}`,
          queryParams
        );

        if (response.code === 1000 && response.result) {
          const paginatedData = response.result;
          const pcBuilds = paginatedData.items || [];
          
          // Store pagination info for hook to use
          (pcBuilds as any).__paginationInfo = {
            totalCount: paginatedData.totalCount,
            totalPages: paginatedData.totalPages,
            currentPage: paginatedData.currentPage,
            hasNextPage: paginatedData.currentPage < paginatedData.totalPages
          };
          
          return Array.isArray(pcBuilds) ? pcBuilds : [];
        }

        return [];
      } catch (error) {
        console.error("Failed to fetch PC builds by subcategory from API:", error);
        return [];
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return [];
  }

  // Get PC build by ID
  static async getPcBuildById(buildId: string): Promise<PcBuild | null> {
    if (this.USE_API) {
      try {
        const endpoint = `${API_CONFIG.ENDPOINTS.PC_BUILD.GET_BY_ID}/${buildId}`;
        const response = await apiGet<PcBuild>(endpoint);

        if (response.code === 1000 && response.result) {
          return response.result;
        }

        return null;
      } catch (error) {
        console.error("❌ Failed to fetch PC build from API:", error);
        return null;
      }
    }

    // Mock data with simulated delay
    await this.delay();
    return null; // TODO: Add mock PC build
  }



  // Method to switch to API mode
  static enableApiMode(enable: boolean = true): void {
    this.USE_API = enable;
  }
}
