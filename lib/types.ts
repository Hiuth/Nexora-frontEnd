// Entity types for application data models
// These are used internally in the app after mapping from API responses

export interface Category {
  id: string;
  categoryName: string;
  iconImg?: string;
}

export interface SubCategory {
  id: string;
  categoryId: string;
  subCategoryName: string;
  subCategoryImg?: string;
  description?: string;
  categoryName: string;
}

export interface Brand {
  id: string;
  brandName: string;
  categoryId: string;
}

export interface Product {
  id: string;
  subCategoryId: string;
  productName: string;
  price: number;
  stockQuantity: number;
  createdAt: string;
  description?: string;
  thumbnail?: string;
  status: string;
  brandId: string;
  brandName: string;
  subCategoryName: string;
  warrantyPeriod: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  imgUrl: string;
}

export interface Attribute {
  id: string;
  attributeName: string;
  categoryId: string;
}

export interface ProductAttribute {
  id: string;
  productId: string;
  attributeId: string;
  value: string;
  attributeName: string;
}

export interface CartItem {
  id: string;
  productId: string;
  accountId: string;
  quantity?: number;
  productName: string;
  thumbnail: string;
  price?: number;
  stockQuantity?: number;
}

export interface Order {
  id: string;
  accountId: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  phoneNumber: string;
  address: string;
  customerName: string;
}

export interface OrderDetail {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unitPrice: number;
}

export interface Account {
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

export interface Comment {
  id: string;
  accountId: string;
  accountName: string;
  productId: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface RatingSummary {
  average: number;
  total: number;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

export interface ProductUnit {
  id: string;
  productId: string;
  productName: string;
  imei?: string;
  serialNumber?: string;
  status: string;
  createdAt: string;
}

export interface WarrantyRecord {
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

export interface PcBuild {
  id: string;
  productName: string;
  price: number;
  description?: string;
  status: string;
  thumbnail: string;
  subCategoryId: string;
  subCategoryName: string;
}

export interface PcBuildItem {
  id: string;
  pcBuildId: string;
  productId: string;
  quantity: number;
  productName: string;
  price: number;
  thumbnail: string;
}
