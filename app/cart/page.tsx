"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/mock-data"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
          <Card className="max-w-md w-full mx-4 border-2 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Giỏ hàng trống
              </h2>
              <p className="text-muted-foreground mb-6">Hãy thêm sản phẩm yêu thích vào giỏ hàng của bạn</p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90"
              >
                <Link href="/products">
                  <Package className="mr-2 h-5 w-5" />
                  Khám phá sản phẩm
                </Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent">
              Giỏ hàng của bạn
            </h1>
            <p className="text-muted-foreground text-lg">
              Bạn có <span className="font-bold text-primary">{items.length}</span> sản phẩm trong giỏ hàng
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card
                  key={item.product.id}
                  className="group hover:shadow-lg transition-all border-2 hover:border-primary/30"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="relative h-28 w-28 rounded-xl overflow-hidden bg-white flex-shrink-0 border-2 border-border group-hover:border-primary/50 transition-colors"
                      >
                        <Image
                          src={item.product.thumbnail || "/placeholder.svg"}
                          alt={item.product.product_Name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="font-bold text-base mb-2 hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {item.product.product_Name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-3">
                          SKU: PC-{item.product.id.toString().padStart(6, "0")}
                        </p>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center border-2 border-border rounded-xl overflow-hidden">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 hover:bg-primary/10 hover:text-primary"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-14 text-center text-base font-bold">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 hover:bg-primary/10 hover:text-primary"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock_quantity}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right flex-1">
                            <p className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            <p className="text-xs text-muted-foreground">{formatPrice(item.product.price)} / cái</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-between pt-4">
                <Button variant="outline" asChild className="border-2 hover:border-primary/50 bg-transparent">
                  <Link href="/products">
                    <Package className="mr-2 h-4 w-4" />
                    Tiếp tục mua sắm
                  </Link>
                </Button>
                <Button variant="ghost" onClick={clearCart} className="hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa giỏ hàng
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 border-2 shadow-xl bg-gradient-to-br from-card to-muted/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    Tổng đơn hàng
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Tạm tính</span>
                      <span className="font-semibold">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Phí vận chuyển</span>
                      <span className="font-semibold text-chart-1">Miễn phí</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Giảm giá</span>
                      <span className="font-semibold">0đ</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-chart-2/10 border-2 border-primary/20">
                    <span className="font-bold text-lg">Tổng cộng</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    className="w-full mb-4 h-14 text-lg bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 shadow-lg hover:shadow-xl transition-all"
                    asChild
                  >
                    <Link href="/checkout">
                      Thanh toán ngay
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Link>
                  </Button>

                  <div className="text-center p-4 rounded-lg bg-chart-1/10 border border-chart-1/20">
                    <p className="text-sm font-semibold text-chart-1">🎉 Miễn phí vận chuyển toàn quốc</p>
                    <p className="text-xs text-muted-foreground mt-1">Cho đơn hàng trên 500.000đ</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
