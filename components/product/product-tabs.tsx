"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Send } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductAttributes } from "./product-attributes";

interface ProductTabsProps {
  product: Product;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  // Mock reviews data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Nguyễn Văn A",
      rating: 5,
      comment: "Sản phẩm rất tốt, chất lượng cao, giao hàng nhanh!",
      date: "2025-01-20",
    },
    {
      id: "2",
      userName: "Trần Thị B",
      rating: 4,
      comment: "Sản phẩm ổn, đúng như mô tả. Dịch vụ hỗ trợ tốt.",
      date: "2025-01-18",
    },
  ]);

  const handleSubmitReview = () => {
    if (newComment.trim()) {
      const newReview: Review = {
        id: (reviews.length + 1).toString(),
        userName: "Khách hàng",
        rating: newRating,
        comment: newComment,
        date: new Date().toISOString().split("T")[0],
      };
      setReviews([newReview, ...reviews]);
      setNewComment("");
      setNewRating(5);
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRate?: (rating: number) => void
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Card className="border-gray-200">
      <CardContent className="p-4 md:p-6">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="description" className="text-sm">
              Mô tả
            </TabsTrigger>
            <TabsTrigger value="specs" className="text-sm">
              Thông số
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-sm">
              Đánh giá ({reviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">
              Mô tả sản phẩm
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {product.productName} là sản phẩm cao cấp từ thương hiệu{" "}
              <span className="font-semibold text-blue-600">
                {product.brandName}
              </span>
              , được thiết kế để mang lại hiệu suất tối ưu cho mọi nhu cầu sử
              dụng. Với công nghệ tiên tiến và chất lượng vượt trội, sản phẩm
              này là lựa chọn hoàn hảo cho những ai đang tìm kiếm giải pháp{" "}
              {product.categoryName} đáng tin cậy.
            </p>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">
              Thông số kỹ thuật
            </h3>

            {/* Thông số cơ bản */}
            <div className="mb-6">
              <div className="grid gap-3">
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Thương hiệu
                  </span>
                  <span className="text-gray-600">{product.brandName}</span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Danh mục
                  </span>
                  <span className="text-gray-600">{product.categoryName}</span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">Loại</span>
                  <span className="text-gray-600">
                    {product.subCategoryName}
                  </span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Tình trạng
                  </span>
                  <span
                    className={`text-gray-600 ${
                      product.stockQuantity > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.stockQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                  </span>
                </div>
                <div className="flex py-3 border-b border-gray-100">
                  <span className="font-medium w-1/3 text-gray-700">
                    Bảo hành
                  </span>
                  <span className="text-gray-600">
                    {product.warrantyPeriod || 36} tháng
                  </span>
                </div>
              </div>
            </div>

            {/* Thông số kỹ thuật chi tiết từ API */}
            <div>
              <ProductAttributes productId={product.id} />
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-6">
            {/* Rating Summary */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mt-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {reviews.length} đánh giá
                </div>
              </div>
            </div>

            {/* Add Review Form */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-gray-900">
                Viết đánh giá của bạn
              </h4>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Đánh giá của bạn
                </label>
                {renderStars(newRating, true, setNewRating)}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Nhận xét
                </label>
                <Textarea
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px] border-gray-200"
                />
              </div>

              <Button
                onClick={handleSubmitReview}
                disabled={!newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Gửi đánh giá
              </Button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">
                Đánh giá từ khách hàng
              </h4>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {review.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">
                          {review.userName}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
