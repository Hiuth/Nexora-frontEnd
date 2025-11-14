// Request types for API calls

// Auth request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  userName: string;
  password: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  otp: string;
}

export interface ResetPasswordRequest {
  otp: string;
  newPassword: string;
}

export interface SendOTPRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Account request types
export interface CreateAccountRequest {
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  otp: string;
  file?: File;
}

export interface UpdateAccountRequest {
  userName?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  file?: File;
}

export interface SendOTPRegisterRequest {
  email: string;
}

// Category request types
export interface CreateCategoryRequest {
  categoryName: string;
}

export interface UpdateCategoryRequest {
  categoryName?: string;
}

// SubCategory request types
export interface CreateSubCategoryRequest {
  subCategoryName: string;
  subCategoryImg?: string;
  description?: string;
  categoryId: string;
}

export interface UpdateSubCategoryRequest {
  subCategoryName?: string;
  subCategoryImg?: string;
  description?: string;
  categoryId?: string;
}

// Brand request types
export interface CreateBrandRequest {
  brandName: string;
}

export interface UpdateBrandRequest {
  brandName?: string;
}

// Product request types
export interface CreateProductRequest {
  productName: string;
  price: number;
  stockQuantity: number;
  description?: string;
  thumbnail?: string;
  status: string;
  brandId: string;
  subCategoryId: string;
  warrantyPeriod: number;
}

export interface UpdateProductRequest {
  productName?: string;
  price?: number;
  stockQuantity?: number;
  description?: string;
  thumbnail?: string;
  status?: string;
  brandId?: string;
  subCategoryId?: string;
  warrantyPeriod?: number;
}

// Cart request types
export interface AddToCartRequest {
  quantity: number;
}

export interface UpdateCartRequest {
  quantity: number;
}

// Order request types
export interface CreateOrderRequest {
  status: string;
  totalAmount: number;
  customerName: string;
  phoneNumber: string;
  address: string;
}

export interface UpdateOrderRequest {
  status?: string;
  totalAmount?: number;
  customerName?: string;
  phoneNumber?: string;
  address?: string;
}

// OrderDetail request types
export interface CreateOrderDetailRequest {
  quantity: number;
  unitPrice: number;
}

// PC Build request types
export interface CreatePcBuildRequest {
  productName: string;
  price: number;
  description?: string;
  status: string;
}

export interface UpdatePcBuildRequest {
  productName?: string;
  price?: number;
  description?: string;
  status?: string;
}

// PC Build Item request types
export interface CreatePcBuildItemRequest {
  quantity: number;
}

export interface UpdatePcBuildItemRequest {
  quantity?: number;
}

// Product Attribute request types
export interface ProductAttributeRequest {
  value: string;
}

// Comment request types
export interface CommentRequest {
  content: string;
  rating: number;
}

export interface CreateCommentRequest {
  content: string;
  rating: number;
}

export interface UpdateCommentRequest {
  content?: string;
  rating?: number;
}

// Warranty request types
export interface CreateWarrantyRequest {
  productId: string;
  orderId: string;
  productUnitId: string;
  startDate: string;
  warrantyPeriod: number;
}

export interface UpdateWarrantyRequest {
  status?: string;
  endDate?: string;
}
