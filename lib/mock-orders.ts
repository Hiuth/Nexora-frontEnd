import type { Order, OrderDetail } from "./types";

export const mockOrders: Order[] = [
  {
    id: "1",
    accountId: "1",
    orderDate: "2025-01-15T10:30:00",
    totalAmount: 48980000,
    status: "delivered",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM",
    customerName: "Nguyễn Văn A",
  },
  {
    id: "2",
    accountId: "1",
    orderDate: "2025-01-20T14:20:00",
    totalAmount: 17980000,
    status: "shipping",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM",
    customerName: "Nguyễn Văn A",
  },
  {
    id: "3",
    accountId: "1",
    orderDate: "2025-01-25T09:15:00",
    totalAmount: 2990000,
    status: "processing",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM",
    customerName: "Nguyễn Văn A",
  },
];

export const mockOrderDetails: OrderDetail[] = [
  {
    id: "1",
    orderId: "1",
    productId: "1",
    productName: "Intel Core i9-14900K",
    quantity: 1,
    price: 15990000,
    unitPrice: 15990000,
  },
  {
    id: "2",
    orderId: "1",
    productId: "3",
    productName: "NVIDIA RTX 4090",
    quantity: 1,
    price: 32990000,
    unitPrice: 32990000,
  },
  {
    id: "3",
    orderId: "2",
    productId: "2",
    productName: "AMD Ryzen 9 7950X",
    quantity: 1,
    price: 14990000,
    unitPrice: 14990000,
  },
  {
    id: "4",
    orderId: "2",
    productId: "5",
    productName: "Corsair Vengeance LPX 32GB",
    quantity: 1,
    price: 2990000,
    unitPrice: 2990000,
  },
  {
    id: "5",
    orderId: "3",
    productId: "5",
    productName: "Corsair Vengeance LPX 32GB",
    quantity: 1,
    price: 2990000,
    unitPrice: 2990000,
  },
];

export function getOrderStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    pending: "Chờ xác nhận",
    processing: "Đang xử lý",
    shipping: "Đang giao hàng",
    delivered: "Đã giao hàng",
    cancelled: "Đã hủy",
  };
  return statusMap[status] || status;
}

export function getOrderStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    shipping: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    delivered: "bg-green-500/10 text-green-500 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return colorMap[status] || "bg-muted text-muted-foreground";
}
