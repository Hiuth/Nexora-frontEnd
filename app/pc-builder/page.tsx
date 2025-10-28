"use client";

import type React from "react";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Cpu,
  Zap,
  HardDrive,
  MemoryStick,
  Box,
  Fan,
  Battery,
  Monitor,
  Plus,
  X,
  ShoppingCart,
  AlertTriangle,
  CheckCircle2,
  Search,
} from "lucide-react";
import {
  products,
  categories,
  subCategories,
  formatPrice,
} from "@/lib/mock-data";
import type { Product } from "@/lib/types";
import Image from "next/image";

interface BuildComponent {
  category: string;
  categoryId: number;
  icon: React.ReactNode;
  product: Product | null;
  required: boolean;
}

const componentCategories = [
  { id: 1, name: "CPU", icon: <Cpu className="h-5 w-5" />, required: true },
  { id: 2, name: "GPU", icon: <Zap className="h-5 w-5" />, required: true },
  {
    id: 3,
    name: "RAM",
    icon: <MemoryStick className="h-5 w-5" />,
    required: true,
  },
  {
    id: 4,
    name: "Mainboard",
    icon: <Monitor className="h-5 w-5" />,
    required: true,
  },
  {
    id: 5,
    name: "Storage",
    icon: <HardDrive className="h-5 w-5" />,
    required: true,
  },
  { id: 6, name: "PSU", icon: <Battery className="h-5 w-5" />, required: true },
  { id: 7, name: "Case", icon: <Box className="h-5 w-5" />, required: true },
  {
    id: 8,
    name: "Cooling",
    icon: <Fan className="h-5 w-5" />,
    required: false,
  },
];

export default function PCBuilderPage() {
  const [buildComponents, setBuildComponents] = useState<BuildComponent[]>(
    componentCategories.map((cat) => ({
      category: cat.name,
      categoryId: cat.id,
      icon: cat.icon,
      product: null,
      required: cat.required,
    }))
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");

  const addComponent = (categoryId: number, product: Product) => {
    setBuildComponents((prev) =>
      prev.map((comp) =>
        comp.categoryId === categoryId ? { ...comp, product } : comp
      )
    );
    setIsDialogOpen(false);
  };

  const removeComponent = (categoryId: number) => {
    setBuildComponents((prev) =>
      prev.map((comp) =>
        comp.categoryId === categoryId ? { ...comp, product: null } : comp
      )
    );
  };

  const totalPrice = buildComponents.reduce(
    (sum, comp) => sum + (comp.product?.price || 0),
    0
  );

  const requiredComponents = buildComponents.filter((c) => c.required);
  const completedRequired = requiredComponents.filter(
    (c) => c.product !== null
  ).length;
  const isComplete = completedRequired === requiredComponents.length;

  const availableSubCategories = selectedCategory
    ? subCategories.filter((sub) => sub.category_id === selectedCategory)
    : [];

  const availableProducts = selectedCategory
    ? products.filter((p) => {
        const category = categories.find((c) => c.id === selectedCategory);
        const matchesSearch = searchQuery
          ? p.product_Name.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        const matchesSubCategory =
          selectedSubCategory === "all" ||
          p.subCategoryId === Number.parseInt(selectedSubCategory);
        return (
          category &&
          p.subCategoryId <= selectedCategory + 1 &&
          p.subCategoryId >= selectedCategory &&
          matchesSearch &&
          matchesSubCategory
        );
      })
    : [];

  const openDialog = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    setSelectedSubCategory("all");
    setIsDialogOpen(true);
  };

  const clearBuild = () => {
    setBuildComponents((prev) =>
      prev.map((comp) => ({ ...comp, product: null }))
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
              PC Builder
            </h1>
            <p className="text-muted-foreground">
              Tạo cấu hình PC tùy chỉnh theo nhu cầu của bạn
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Build Components */}
            <div className="lg:col-span-2 space-y-4">
              {/* Progress */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Tiến độ build</span>
                    <span className="text-sm text-muted-foreground">
                      {completedRequired}/{requiredComponents.length} linh kiện
                      bắt buộc
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          (completedRequired / requiredComponents.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Component List */}
              {buildComponents.map((component) => (
                <Card key={component.categoryId}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        {component.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">
                            {component.category}
                          </h3>
                          {component.required && (
                            <Badge variant="secondary">Bắt buộc</Badge>
                          )}
                        </div>
                        {component.product ? (
                          <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <Image
                                src={
                                  component.product.thumbnail ||
                                  "/placeholder.svg"
                                }
                                alt={component.product.product_Name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm line-clamp-1">
                                {component.product.product_Name}
                              </p>
                              <p className="text-primary font-semibold">
                                {formatPrice(component.product.price)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeComponent(component.categoryId)
                              }
                              className="flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDialog(component.categoryId)}
                            className="bg-transparent"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Chọn {component.category}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Tổng quan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Compatibility Check */}
                  {isComplete ? (
                    <Alert className="bg-primary/10 border-primary/20">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <AlertDescription className="text-sm">
                        Cấu hình của bạn đã hoàn chỉnh và tương thích!
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Vui lòng chọn đủ các linh kiện bắt buộc để hoàn thành
                        build.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Chi tiết giá</h4>
                    {buildComponents
                      .filter((c) => c.product)
                      .map((component) => (
                        <div
                          key={component.categoryId}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {component.category}
                          </span>
                          <span className="font-medium">
                            {formatPrice(component.product!.price)}
                          </span>
                        </div>
                      ))}
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Tổng cộng</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-4">
                    <Button className="w-full" size="lg" disabled={!isComplete}>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Thêm vào giỏ hàng
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={clearBuild}
                    >
                      Xóa cấu hình
                    </Button>
                  </div>

                  {/* Estimated Power */}
                  <Separator />
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        Công suất ước tính
                      </span>
                      <span className="font-medium">~450W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        PSU khuyến nghị
                      </span>
                      <span className="font-medium">650W+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Product Selection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle>
              Chọn{" "}
              {componentCategories.find((c) => c.id === selectedCategory)?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 px-6 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {availableSubCategories.length > 0 && (
              <Select
                value={selectedSubCategory}
                onValueChange={setSelectedSubCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục con" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục con</SelectItem>
                  {availableSubCategories.map((subCat) => (
                    <SelectItem key={subCat.id} value={subCat.id.toString()}>
                      {subCat.subcategoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <ScrollArea className="flex-1 px-6 pb-6">
            <div className="space-y-3 pr-4">
              {availableProducts.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:border-primary transition-colors overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.product_Name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                          {product.product_Name}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-base font-bold text-primary whitespace-nowrap">
                            {formatPrice(product.price)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() =>
                              selectedCategory &&
                              addComponent(selectedCategory, product)
                            }
                            disabled={product.stock_quantity === 0}
                            className="flex-shrink-0"
                          >
                            {product.stock_quantity === 0 ? "Hết hàng" : "Chọn"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {availableProducts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  {searchQuery || selectedSubCategory !== "all"
                    ? "Không tìm thấy sản phẩm phù hợp"
                    : "Không có sản phẩm nào trong danh mục này"}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
