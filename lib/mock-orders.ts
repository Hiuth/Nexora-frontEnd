import type { Order, OrderDetail } from "./types"

export const mockOrders: Order[] = [
  {
    order_id: 1,
    account_id: 1,
    order_date: "2025-01-15T10:30:00",
    total_amount: 48980000,
    status: "delivered",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM",
    customer_Name: "Nguyễn Văn A",
  },
  {
    order_id: 2,
    account_id: 1,
    order_date: "2025-01-20T14:20:00",
    total_amount: 17980000,
    status: "shipping",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM",
    customer_Name: "Nguyễn Văn A",
  },
  {
    order_id: 3,
    account_id: 1,
    order_date: "2025-01-25T09:15:00",
    total_amount: 2990000,
    status: "processing",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM",
    customer_Name: "Nguyễn Văn A",
  },
]

export const mockOrderDetails: OrderDetail[] = [
  { order_id: 1, product_id: 1, quantity: 1, price: 15990000 },
  { order_id: 1, product_id: 3, quantity: 1, price: 32990000 },
  { order_id: 2, product_id: 2, quantity: 1, price: 14990000 },
  { order_id: 2, product_id: 5, quantity: 1, price: 2990000 },
  { order_id: 3, product_id: 5, quantity: 1, price: 2990000 },
]

export function getOrderStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "Chờ xác nhận",
    processing: "Đang xử lý",
    shipping: "Đang giao hàng",
    delivered: "Đã giao hàng",
    cancelled: "Đã hủy",
  }
  return statusMap[status] || status
}

export function getOrderStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    shipping: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    delivered: "bg-green-500/10 text-green-500 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  }
  return colorMap[status] || "bg-muted text-muted-foreground"
}
