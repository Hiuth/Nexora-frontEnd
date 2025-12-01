"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/auth.service";

interface EmailStepProps {
  email: string;
  onNext: (email: string) => void;
}

export function EmailStep({ email: initialEmail, onNext }: EmailStepProps) {
  const [email, setEmail] = useState(initialEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Vui lòng nhập email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Định dạng email không hợp lệ");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await authService.sendOtpForgotPassword(email);
      
      toast({
        title: "Đã gửi mã OTP",
        description: `Mã xác thực đã được gửi đến ${email}`,
      });
      
      onNext(email);
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setError(error.message || "Có lỗi xảy ra khi gửi mã OTP");
      toast({
        title: "Lỗi",
        description: error.message || "Không thể gửi mã OTP. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={isSubmitting}
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Gửi mã xác thực
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Kiểm tra cả thư mục spam nếu bạn không nhận được email
        </p>
      </div>
    </div>
  );
}