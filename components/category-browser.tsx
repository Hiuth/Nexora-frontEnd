"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryService } from "@/services/category.service";
import { SubCategoryService } from "@/services/subcategory.service";
import { Category, SubCategory } from "@/lib/types";

export function CategoryBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await CategoryService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Load subcategories when selectedCategory changes
  useEffect(() => {
    const loadSubCategories = async () => {
      if (selectedCategory) {
        try {
          const subCategoriesData =
            await SubCategoryService.getSubCategoriesByCategoryId(
              selectedCategory
            );
          setSubCategories(subCategoriesData);
        } catch (error) {
          console.error("Failed to load subcategories:", error);
          setSubCategories([]);
        }
      } else {
        setSubCategories([]);
      }
    };

    loadSubCategories();
  }, [selectedCategory]);

  const filteredSubCategories = selectedCategory ? subCategories : [];

  if (loading) {
    return (
      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            {filteredSubCategories.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSubCategories.map((subCategory) => (
                  <Link
                    key={subCategory.id}
                    href={`/products?subcategory=${subCategory.id}`}
                  >
                    <Card className="group cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary">
                      <CardContent className="p-6">
                        {/* Enhanced image display area */}
                        <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/5 to-accent/10 mb-4 flex items-center justify-center overflow-hidden border border-gray-100">
                          {subCategory.subCategoryImg ? (
                            <img
                              src={subCategory.subCategoryImg}
                              alt={subCategory.subCategoryName}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <span className="text-4xl text-gray-400">📦</span>
                            </div>
                          )}
                        </div>
                        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors text-balance">
                          {subCategory.subCategoryName}
                        </h4>
                        <Badge variant="secondary" className="mt-3">
                          Xem sản phẩm
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-center">
                <div className="max-w-md">
                  <div className="text-6xl mb-4">📂</div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Không có danh mục con
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    Danh mục này hiện tại chưa có danh mục con nào. Vui lòng thử
                    chọn danh mục khác.
                  </p>
                </div>
              </div>
            )}
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
