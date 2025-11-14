import { apiClient } from "@/lib/api-client";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse } from "@/types/api";
import type { CommentResponse, RatingSummaryResponse } from "@/types/api";
import type {
  CommentRequest,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "@/types/requests";

export class CommentService {
  /**
   * Create a new comment for a product
   */
  static async createComment(
    productId: string,
    request: CreateCommentRequest
  ): Promise<CommentResponse> {
    try {
      const formData = new FormData();
      formData.append("content", request.content);
      formData.append("rating", request.rating.toString());

      const response = await apiClient.postFormData<CommentResponse>(
        `${API_CONFIG.ENDPOINTS.COMMENT.CREATE}/${productId}`,
        formData
      );
      return response.result;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  }

  /**
   * Update an existing comment
   */
  static async updateComment(
    commentId: string,
    request: UpdateCommentRequest
  ): Promise<CommentResponse> {
    try {
      const formData = new FormData();

      if (request.content !== undefined) {
        formData.append("content", request.content);
      }
      if (request.rating !== undefined) {
        formData.append("rating", request.rating.toString());
      }

      const response = await apiClient.putFormData<CommentResponse>(
        `${API_CONFIG.ENDPOINTS.COMMENT.UPDATE}/${commentId}`,
        formData
      );
      return response.result;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  }

  /**
   * Delete a comment
   */
  static async deleteComment(commentId: string): Promise<string> {
    try {
      const response = await apiClient.delete<string>(
        `${API_CONFIG.ENDPOINTS.COMMENT.DELETE}/${commentId}`
      );
      return response.result || "Comment deleted successfully";
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }

  /**
   * Get comments by product ID
   */
  static async getCommentsByProductId(
    productId: string
  ): Promise<CommentResponse[]> {
    try {
      const response = await apiClient.get<CommentResponse[]>(
        `${API_CONFIG.ENDPOINTS.COMMENT.GET_BY_PRODUCT}/${productId}`
      );
      return response.result || [];
    } catch (error) {
      console.error("Error fetching comments by product:", error);
      throw error;
    }
  }

  /**
   * Get comments by current account (authenticated user)
   */
  static async getCommentsByAccount(): Promise<CommentResponse[]> {
    try {
      const response = await apiClient.get<CommentResponse[]>(
        `${API_CONFIG.ENDPOINTS.COMMENT.GET_BY_ACCOUNT}/current`
      );
      return response.result || [];
    } catch (error) {
      console.error("Error fetching comments by account:", error);
      throw error;
    }
  }

  /**
   * Get rating summary for a product
   */
  static async getRatingSummaryByProductId(
    productId: string
  ): Promise<RatingSummaryResponse> {
    try {
      const response = await apiClient.get<RatingSummaryResponse>(
        `${API_CONFIG.ENDPOINTS.COMMENT.GET_RATING_SUMMARY}/${productId}`
      );
      return response.result;
    } catch (error) {
      console.error("Error fetching rating summary:", error);
      throw error;
    }
  }

  /**
   * Helper method to validate rating value
   */
  static validateRating(rating: number): boolean {
    return rating >= 1 && rating <= 5 && Number.isInteger(rating);
  }

  /**
   * Helper method to format date for display
   */
  static formatCommentDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  }

  /**
   * Helper method to check if user can edit/delete comment
   * (Client-side check, server will validate ownership)
   */
  static canUserModifyComment(
    comment: CommentResponse,
    currentUserId: string
  ): boolean {
    return comment.accountId === currentUserId;
  }

  /**
   * Helper method to calculate average rating from comments array
   */
  static calculateAverageRating(comments: CommentResponse[]): number {
    if (comments.length === 0) return 0;

    const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
    return Math.round((sum / comments.length) * 10) / 10; // Round to 1 decimal place
  }

  /**
   * Helper method to get rating distribution from comments array
   */
  static getRatingDistribution(comments: CommentResponse[]): {
    star1: number;
    star2: number;
    star3: number;
    star4: number;
    star5: number;
  } {
    const distribution = { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 };

    comments.forEach((comment) => {
      switch (comment.rating) {
        case 1:
          distribution.star1++;
          break;
        case 2:
          distribution.star2++;
          break;
        case 3:
          distribution.star3++;
          break;
        case 4:
          distribution.star4++;
          break;
        case 5:
          distribution.star5++;
          break;
      }
    });

    return distribution;
  }

  /**
   * Helper method to sort comments by different criteria
   */
  static sortComments(
    comments: CommentResponse[],
    sortBy: "newest" | "oldest" | "rating_high" | "rating_low" = "newest"
  ): CommentResponse[] {
    const sorted = [...comments];

    switch (sortBy) {
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "rating_high":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "rating_low":
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  }

  /**
   * Helper method to filter comments by rating
   */
  static filterCommentsByRating(
    comments: CommentResponse[],
    minRating?: number,
    maxRating?: number
  ): CommentResponse[] {
    return comments.filter((comment) => {
      if (minRating !== undefined && comment.rating < minRating) return false;
      if (maxRating !== undefined && comment.rating > maxRating) return false;
      return true;
    });
  }
}
