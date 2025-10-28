"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Package, Heart, Settings, LogOut, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { mockOrders, mockOrderDetails, getOrderStatusText, getOrderStatusColor } from "@/lib/mock-orders"
import { products, formatPrice } from "@/lib/mock-data"

export default function AccountPage() {
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    address: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM",
  }

  const recentOrders = mockOrders.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Tài khoản của tôi</h1>
            <p className="text-muted-foreground">Quản lý thông tin và đơn hàng của bạn</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/account">
                        <User className="h-4 w-4 mr-3" />
                        Thông tin cá nhân
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/account/orders">
                        <Package className="h-4 w-4 mr-3" />
                        Đơn hàng của tôi
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/account/wishlist">
                        <Heart className="h-4 w-4 mr-3" />
                        Sản phẩm yêu thích
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/account/settings">
                        <Settings className="h-4 w-4 mr-3" />
                        Cài đặt
                      </Link>
                    </Button>
                    <Separator className="my-2" />
                    <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                      <LogOut className="h-4 w-4 mr-3" />
                      Đăng xuất
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="profile">Thông tin</TabsTrigger>
                  <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{mockOrders.length}</p>
                            <p className="text-sm text-muted-foreground">Tổng đơn hàng</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">
                              {mockOrders.filter((o) => o.status === "delivered").length}
                            </p>
                            <p className="text-sm text-muted-foreground">Đã hoàn thành</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Heart className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">0</p>
                            <p className="text-sm text-muted-foreground">Yêu thích</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Đơn hàng gần đây</CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/account/orders">Xem tất cả</Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentOrders.map((order) => {
                        const orderItems = mockOrderDetails.filter((d) => d.order_id === order.order_id)
                        return (
                          <div key={order.order_id} className="border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="font-semibold">Đơn hàng #{order.order_id.toString().padStart(6, "0")}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.order_date).toLocaleDateString("vi-VN")}
                                </p>
                              </div>
                              <Badge className={getOrderStatusColor(order.status)}>
                                {getOrderStatusText(order.status)}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">{orderItems.length} sản phẩm</p>
                              <p className="font-semibold text-primary">{formatPrice(order.total_amount)}</p>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông tin cá nhân</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Họ và tên</p>
                          <p className="font-semibold">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                          <p className="font-semibold">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Số điện thoại</p>
                          <p className="font-semibold">{user.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Địa chỉ</p>
                          <p className="font-semibold">{user.address}</p>
                        </div>
                      </div>
                      <Separator />
                      <Button>Chỉnh sửa thông tin</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Đơn hàng của tôi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockOrders.map((order) => {
                        const orderItems = mockOrderDetails.filter((d) => d.order_id === order.order_id)
                        return (
                          <div key={order.order_id} className="border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="font-semibold text-lg">
                                  Đơn hàng #{order.order_id.toString().padStart(6, "0")}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.order_date).toLocaleString("vi-VN")}
                                </p>
                              </div>
                              <Badge className={getOrderStatusColor(order.status)}>
                                {getOrderStatusText(order.status)}
                              </Badge>
                            </div>
                            <div className="space-y-3 mb-4">
                              {orderItems.map((item) => {
                                const product = products.find((p) => p.id === item.product_id)
                                if (!product) return null
                                return (
                                  <div key={item.product_id} className="flex gap-3">
                                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                      <Image
                                        src={product.thumbnail || "/placeholder.svg"}
                                        alt={product.product_Name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium text-sm line-clamp-1">{product.product_Name}</p>
                                      <p className="text-xs text-muted-foreground">Số lượng: {item.quantity}</p>
                                      <p className="text-sm font-semibold text-primary">{formatPrice(item.price)}</p>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                            <Separator className="my-3" />
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">Tổng cộng</p>
                              <p className="text-lg font-bold text-primary">{formatPrice(order.total_amount)}</p>
                            </div>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
