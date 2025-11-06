// API configuration
export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7098/api",
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: "/Auth/login",
    LOGOUT: "/Auth/logout",
    REFRESH_TOKEN: "/Auth/refresh",
    SEND_OTP_FORGOT_PASSWORD: "/Auth/send-otp-forgot-password",
    RESET_PASSWORD: "/Auth/reset-password",

    // Category endpoints
    CATEGORY: {
      GET_ALL: "/Category/getAll",
      GET_BY_ID: "/Category/getById",
      CREATE: "/Category/create",
      UPDATE: "/Category/update",
      DELETE: "/Category/delete",
      REVENUE_SUMMARY: "/Category/revenueSummary",
    },

    // Brand endpoints
    BRAND: {
      GET_ALL: "/Brand/getAll",
      GET_BY_ID: "/Brand/getById",
      CREATE: "/Brand/create",
      UPDATE: "/Brand/update",
      DELETE: "/Brand/delete",
    },

    // SubCategory endpoints
    SUBCATEGORY: {
      GET_ALL: "/SubCategory/getAll",
      GET_BY_ID: "/SubCategory/getById",
      GET_BY_CATEGORY_ID: "/SubCategory/getByCategoryId",
      CREATE: "/SubCategory/create",
      UPDATE: "/SubCategory/update",
      DELETE: "/SubCategory/delete",
    },

    // Product endpoints
    PRODUCT: {
      GET_ALL: "/Product/getAll",
      GET_BY_ID: "/Product/getById",
      GET_BY_BRAND_ID: "/Product/getByBrandId",
      GET_BY_SUBCATEGORY_ID: "/Product/getBysubCategoryId",
      SEARCH: "/Product/searchProduct",
      GET_BY_PRICE_RANGE: "/Product/getByPriceRange",
      CREATE: "/Product/create",
      UPDATE: "/Product/update",
      DELETE: "/Product/delete",
    },

    // Order endpoints
    ORDER: {
      GET_ALL: "/Order/getAllOrders",
      GET_BY_ID: "/Order/getById",
      GET_BY_ACCOUNT_ID: "/Order/getOrderByAccountId",
      CREATE: "/Order/create",
      UPDATE: "/Order/update",
      DELETE: "/Order/deleteOrder",
    },

    // Account endpoints
    ACCOUNT: {
      GET_ALL: "/Account/getAll",
      GET_BY_ID: "/Account/getById",
      GET_BY_EMAIL: "/Account/getByEmail",
      GET_BY_PHONE: "/Account/getByPhone",
      CREATE: "/Account/create",
      UPDATE: "/Account/update",
      DELETE: "/Account/delete",
    },

    // PC Build endpoints
    PC_BUILD: {
      GET_ALL: "/PcBuild/getAll",
      GET_BY_ID: "/PcBuild/getById",
      GET_BY_CATEGORY_ID: "/PcBuild/getByCategory",
      GET_BY_SUBCATEGORY_ID: "/PcBuild/getBySubCategory",
      CREATE: "/PcBuild/create",
      UPDATE: "/PcBuild/update",
      DELETE: "/PcBuild/delete",
    },

    // Warranty endpoints
    WARRANTY_RECORD: {
      CREATE: "/WarrantyRecord/create",
      UPDATE: "/WarrantyRecord/update",
      DELETE: "/WarrantyRecord/delete",
      GET_BY_PRODUCT_ID: "/WarrantyRecord/GetByProductId",
      GET_BY_ORDER_ID: "/WarrantyRecord/GetByOrderId",
      GET_BY_STATUS: "/WarrantyRecord/GetByStatus",
      GET_BY_SERIAL_NUMBER: "/WarrantyRecord/GetBySerialNumber",
      GET_BY_IMEI: "/WarrantyRecord/GetByImei",
    },
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

// API response types (matching backend structure)
export interface ApiResponse<T> {
  code?: number;
  message: string;
  result: T;
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

// Helper function to build full URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get full endpoint URL
export const getApiEndpoint = (endpoint: string): string => {
  return buildApiUrl(endpoint);
};
