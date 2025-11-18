// API Response wrapper
export interface ApiResponse<T> {
  code?: number;
  message: string;
  result: T;
}

// Paginated Response wrapper
export interface PaginatedResponse<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

// Auth response types
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    userName: string;
    email: string;
  };
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  isValid: boolean;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Account response types
export interface AccountResponse {
  id: string;
  userName: string;
  password: string;
  createdAt: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  accountImg: string;
}

export interface SendOTPRegisterResponse {
  success: boolean;
  message: string;
}

export interface CreateAccountResponse {
  success: boolean;
  message: string;
  data: AccountResponse;
}

export interface UpdateAccountResponse {
  success: boolean;
  message: string;
  data: AccountResponse;
}

// Category response types
export interface CategoryResponse {
  id: string;
  categoryName: string;
  iconImg?: string;
}

export interface CategoryRevenueResponse {
  totalRevenue: number;
  categoryRevenues: Array<{
    categoryId: string;
    categoryName: string;
    revenue: number;
  }>;
}

// SubCategory response types
export interface SubCategoryResponse {
  id: string;
  subCategoryName: string;
  subCategoryImg?: string;
  description?: string;
  categoryId: string;
  categoryName: string;
}

// Brand response types
export interface BrandResponse {
  id: string;
  brandName: string;
}

// Product response types
export interface ProductResponse {
  id: string;
  productName: string;
  price: number;
  stockQuantity: number;
  description?: string;
  thumbnail?: string;
  createdAt: string;
  status: string;
  brandId: string;
  brandName: string;
  subCategoryId: string;
  subCategoryName: string;
  categoryId: string;
  categoryName: string;
  warrantyPeriod: number;
}

export interface ProductImageResponse {
  id: string;
  productId: string;
  imgUrl: string;
}

export interface AttributeResponse {
  id: string;
  attributeName: string;
  categoryId: string;
}

export interface ProductAttributeResponse {
  id: string;
  productId: string;
  attributeId: string;
  value: string;
  attributeName: string;
}

export interface ProductUnitResponse {
  id: string;
  productId: string;
  productName: string;
  imei?: string;
  serialNumber?: string;
  status: string;
  createdAt: string;
}

// Cart response types
export interface CartResponse {
  id: string;
  productId: string;
  accountId: string;
  quantity?: number;
  productName: string;
  thumbnail: string;
  price?: number;
  stockQuantity?: number;
}

// Order response types
export interface OrderResponse {
  id: string;
  accountId: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  phoneNumber: string;
  address: string;
  customerName: string;
}

export interface OrderDetailResponse {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unitPrice: number;
}

// PC Build response types
export interface PcBuildResponse {
  id: string;
  productName: string;
  price: number;
  description?: string;
  status: string;
  thumbnail: string;
  subCategoryId: string;
  subCategoryName: string;
}

export interface PcBuildItemResponse {
  id: string;
  pcBuildId: string;
  productId: string;
  quantity: number;
  stockQuantity: number;
  productName: string;
  price: number;
  thumbnail: string;
}

// Warranty response types
export interface WarrantyRecordResponse {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  productId: string;
  productName: string;
  warrantyPeriod: number;
  orderId: string;
  productUnitId: string;
  serialNumber?: string;
  imei?: string;
}

// Comment response types
export interface CommentResponse {
  id: string;
  accountId: string;
  accountName: string;
  accountAvatar: string;
  productId: string;
  content: string;
  rating: number;
  createdAt: string;
}

// Rating response types
export interface RatingSummaryResponse {
  average: number;
  total: number;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}
