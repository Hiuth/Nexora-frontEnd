"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { mockOrders, mockOrderDetails, getOrderStatusText, getOrderStatusColor } from "@/lib/mock-orders"
import { products, formatPrice } from "@/lib/mock-data"

export default function OrdersPage() {
  const allOrders = mockOrders
  const processingOrders = mockOrders.filter((o) => o.status === "processing" || o.status === "pending")
  const shippingOrders = mockOrders.filter((o) => o.status === "shipping")
  const completedOrders = mockOrders.filter((o) => o.status === "delivered")

  const OrderList = ({ orders }: { orders: typeof mockOrders }) => (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Không có đơn hàng nào</p>
          </CardContent>
        </Card>
      ) : (
        orders.map((order) => {
          const orderItems = mockOrderDetails.filter((d) => d.order_id === order.order_id)
          return (
            <Card key={order.order_id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-lg">Đơn hàng #{order.order_id.toString().padStart(6, "0")}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.order_date).toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <Badge className={getOrderStatusColor(order.status)}>{getOrderStatusText(order.status)}</Badge>
                </div>

                <div className="space-y-3 mb-4">
                  {orderItems.map((item) => {
                    const product = products.find((p) => p.id === item.product_id)
                    if (!product) return null
                    return (
                      <div key={item.product_id} className="flex gap-4">
                        <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.product_Name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link href={`/products/${product.id}`}>
                            <p className="font-medium line-clamp-1 hover:text-primary transition-colors">
                              {product.product_Name}
                            </p>
                          </Link>
                          <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                          <p className="text-sm font-semibold text-primary">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Địa chỉ giao hàng</p>
                    <p className="text-sm font-medium">{order.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Tổng cộng</p>
                    <p className="text-xl font-bold text-primary">{formatPrice(order.total_amount)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Xem chi tiết
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Mua lại
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/account">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Link>
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Đơn hàng của tôi</h1>
            <p className="text-muted-foreground">Quản lý và theo dõi đơn hàng của bạn</p>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">
                Tất cả <Badge className="ml-2">{allOrders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="processing">
                Đang xử lý <Badge className="ml-2">{processingOrders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="shipping">
                Đang giao <Badge className="ml-2">{shippingOrders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Hoàn thành <Badge className="ml-2">{completedOrders.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <OrderList orders={allOrders} />
            </TabsContent>

            <TabsContent value="processing">
              <OrderList orders={processingOrders} />
            </TabsContent>

            <TabsContent value="shipping">
              <OrderList orders={shippingOrders} />
            </TabsContent>

            <TabsContent value="completed">
              <OrderList orders={completedOrders} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
