"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, subCategories } from "@/lib/mock-data";

export function CategoryBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredSubCategories = selectedCategory
    ? subCategories.filter((sub) => sub.category_id === selectedCategory)
    : [];

  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-6">
      {/* Categories List */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Danh mục</h3>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              setSelectedCategory(
                category.id === selectedCategory ? null : category.id
              )
            }
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card hover:bg-accent hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.iconImg}</span>
              <span className="font-medium text-sm">
                {category.categoryName}
              </span>
            </div>
            <ChevronRight
              className={`h-5 w-5 transition-transform ${
                selectedCategory === category.id ? "rotate-90" : ""
              }`}
            />
          </button>
        ))}
      </div>

      {/* Subcategories Grid */}
      <div>
        {selectedCategory ? (
          <>
            <h3 className="font-semibold text-lg mb-4 text-foreground">
              Danh mục con -{" "}
              {categories.find((c) => c.id === selectedCategory)?.categoryName}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubCategories.map((subCategory) => (
                <Link
                  key={subCategory.id}
                  href={`/products?subcategory=${subCategory.id}`}
                >
                  <Card className="group cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary">
                    <CardContent className="p-6">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-accent/20 mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={
                            subCategory.subCategory_img ||
                            "/placeholder.svg?height=200&width=200"
                          }
                          alt={subCategory.subcategoryName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors text-balance">
                        {subCategory.subcategoryName}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">
                        {subCategory.description}
                      </p>
                      <Badge variant="secondary" className="mt-3">
                        Xem sản phẩm
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[400px] text-center">
            <div className="max-w-md">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Chọn danh mục để xem sản phẩm
              </h3>
              <p className="text-muted-foreground text-pretty">
                Chọn một danh mục bên trái để xem các danh mục con và sản phẩm
                tương ứng
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
