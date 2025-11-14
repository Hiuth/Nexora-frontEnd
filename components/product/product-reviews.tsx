"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Star, Send, Edit, Trash2, LogIn } from "lucide-react";
import { CommentService } from "@/services/comment.service";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import type { CommentResponse, RatingSummaryResponse } from "@/types/api";

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [ratingSummary, setRatingSummary] =
    useState<RatingSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  // Edit states
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(5);

  // Delete confirmation
  const [deletingComment, setDeletingComment] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Load comments and rating summary
  useEffect(() => {
    loadCommentsAndRating();
  }, [productId]);

  const loadCommentsAndRating = async () => {
    try {
      setLoading(true);
      const [commentsData, ratingData] = await Promise.all([
        CommentService.getCommentsByProductId(productId),
        CommentService.getRatingSummaryByProductId(productId),
      ]);

      setComments(CommentService.sortComments(commentsData, "newest"));
      setRatingSummary(ratingData);
    } catch (error) {
      console.error("Error loading comments:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải đánh giá. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Bạn cần đăng nhập để viết đánh giá sản phẩm.",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Thiếu nội dung",
        description: "Vui lòng nhập nội dung đánh giá.",
        variant: "destructive",
      });
      return;
    }

    if (!CommentService.validateRating(newRating)) {
      toast({
        title: "Đánh giá không hợp lệ",
        description: "Vui lòng chọn số sao từ 1 đến 5.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      await CommentService.createComment(productId, {
        content: newComment.trim(),
        rating: newRating,
      });

      toast({
        title: "Thành công",
        description: "Đánh giá của bạn đã được gửi.",
      });

      // Reset form và reload data
      setNewComment("");
      setNewRating(5);
      await loadCommentsAndRating();
    } catch (error) {
      console.error("Error creating comment:", error);
      toast({
        title: "Lỗi",
        description: "Không thể gửi đánh giá. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartEdit = (comment: CommentResponse) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
    setEditRating(comment.rating);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
    setEditRating(5);
  };

  const handleSaveEdit = async () => {
    if (!editingComment) return;

    try {
      await CommentService.updateComment(editingComment, {
        content: editContent.trim(),
        rating: editRating,
      });

      toast({
        title: "Thành công",
        description: "Đánh giá đã được cập nhật.",
      });

      handleCancelEdit();
      await loadCommentsAndRating();
    } catch (error) {
      console.error("Error updating comment:", error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật đánh giá. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (commentId: string) => {
    setDeletingComment(commentId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingComment) return;

    try {
      await CommentService.deleteComment(deletingComment);

      toast({
        title: "Thành công",
        description: "Đánh giá đã được xóa.",
      });

      setShowDeleteDialog(false);
      setDeletingComment(null);
      await loadCommentsAndRating();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa đánh giá. Vui lòng thử lại sau.",
        variant: "destructive",
      });
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

  const canEditComment = (comment: CommentResponse) => {
    return isAuthenticated && user?.userId === comment.accountId;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      {ratingSummary && (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {ratingSummary.average.toFixed(1)}
            </div>
            <div className="flex justify-center mt-1">
              {renderStars(Math.round(ratingSummary.average))}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {ratingSummary.total} đánh giá
            </div>
          </div>
        </div>
      )}

      {/* Add Review Form */}
      <div className="border border-gray-200 rounded-lg p-4 space-y-4">
        <h4 className="font-semibold text-gray-900">Viết đánh giá của bạn</h4>

        {!isAuthenticated && (
          <Alert>
            <LogIn className="h-4 w-4" />
            <AlertDescription>
              Bạn cần <strong>đăng nhập</strong> để viết đánh giá sản phẩm.
            </AlertDescription>
          </Alert>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Đánh giá của bạn
          </label>
          {renderStars(newRating, isAuthenticated, setNewRating)}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Nhận xét
          </label>
          <Textarea
            placeholder={
              isAuthenticated
                ? "Chia sẻ trải nghiệm của bạn về sản phẩm..."
                : "Vui lòng đăng nhập để viết đánh giá"
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!isAuthenticated}
            className="min-h-[100px] border-gray-200"
          />
        </div>

        <Button
          onClick={handleSubmitReview}
          disabled={!isAuthenticated || !newComment.trim() || submitting}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Send className="h-4 w-4 mr-2" />
          {submitting ? "Đang gửi..." : "Gửi đánh giá"}
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Đánh giá từ khách hàng</h4>

        {comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Chưa có đánh giá nào cho sản phẩm này.
            </p>
            {isAuthenticated && (
              <p className="text-sm text-gray-400 mt-2">
                Hãy là người đầu tiên đánh giá sản phẩm này!
              </p>
            )}
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  {comment.accountAvatar ? (
                    <AvatarImage
                      src={comment.accountAvatar}
                      alt={comment.accountName}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {comment.accountName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">
                      {comment.accountName}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">
                      {CommentService.formatCommentDate(comment.createdAt)}
                    </span>
                  </div>

                  {editingComment === comment.id ? (
                    // Edit mode
                    <div className="space-y-3">
                      <div>{renderStars(editRating, true, setEditRating)}</div>
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveEdit}>
                          Lưu
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Display mode
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {renderStars(comment.rating)}
                        </div>
                        {canEditComment(comment) && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleStartEdit(comment)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteClick(comment.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {comment.content}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white border border-gray-200 shadow-xl max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">
              Xóa đánh giá
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Bạn có chắc chắn muốn xóa đánh giá này? Hành động này không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeletingComment(null)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white border border-red-600"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
