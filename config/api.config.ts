// API configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  ENDPOINTS: {
    // Core entities
    CATEGORIES: "/categories",
    SUBCATEGORIES: "/subcategories",
    PRODUCTS: "/products",
    BRANDS: "/brands",

    // User related
    AUTH: "/auth",
    ACCOUNTS: "/accounts",

    // Shopping
    CART: "/cart",
    ORDERS: "/orders",

    // Services
    WARRANTY: "/warranty",
    PC_BUILDS: "/pc-builds",

    // Content
    COMMENTS: "/comments",
    RATINGS: "/ratings",

    // Search
    SEARCH: "/search",
  },
  // Request timeouts
  TIMEOUT: 10000,
  // Cache durations (in milliseconds)
  CACHE: {
    CATEGORIES: 5 * 60 * 1000, // 5 minutes
    PRODUCTS: 2 * 60 * 1000, // 2 minutes
    USER_DATA: 1 * 60 * 1000, // 1 minute
  },
};

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  data: {
    items: T[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
  message?: string;
  error?: string;
}
