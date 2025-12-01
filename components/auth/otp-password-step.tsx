"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Shield, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/auth.service";

interface OtpPasswordStepProps {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
  onNext: (data: { otp: string; newPassword: string; confirmPassword: string }) => void;
  onBack: () => void;
}

export function OtpPasswordStep({
  email,
  otp: initialOtp,
  newPassword: initialNewPassword,
  confirmPassword: initialConfirmPassword,
  onNext,
  onBack,
}: OtpPasswordStepProps) {
  const [otp, setOtp] = useState(initialOtp);
  const [newPassword, setNewPassword] = useState(initialNewPassword);
  const [confirmPassword, setConfirmPassword] = useState(initialConfirmPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    otp?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!otp.trim()) {
      newErrors.otp = "Vui lòng nhập mã OTP";
    } else if (otp.length !== 6) {
      newErrors.otp = "Mã OTP phải có đúng 6 ký tự";
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "Mã OTP chỉ được chứa số";
    }

    if (!newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResendOtp = async () => {
    try {
      await authService.sendOtpForgotPassword(email);
      toast({
        title: "Đã gửi lại mã OTP",
        description: "Mã xác thức mới đã được gửi đến email của bạn",
      });
      setCountdown(300);
      setCanResend(false);
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể gửi lại mã OTP",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await authService.resetPassword(otp, newPassword, email);
      
      toast({
        title: "Đổi mật khẩu thành công",
        description: "Mật khẩu của bạn đã được cập nhật",
      });
      
      onNext({ otp, newPassword, confirmPassword });
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: "Lỗi",
        description: error.message || "Không thể đổi mật khẩu. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* OTP Input */}
        <div>
          <Label htmlFor="otp">Mã OTP</Label>
          <div className="relative mt-1">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
                // Auto clear error when typing
                if (errors.otp && value.length > 0) {
                  setErrors(prev => ({ ...prev, otp: undefined }));
                }
              }}
              className="pl-10 text-center tracking-widest font-mono text-lg"
              disabled={isSubmitting}
              autoFocus
              maxLength={6}
            />
          </div>
          {errors.otp && <p className="text-sm text-red-600 mt-1">{errors.otp}</p>}
          
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Gửi lại mã OTP
                </button>
              ) : (
                `Gửi lại sau ${formatTime(countdown)}`
              )}
            </p>
          </div>
        </div>

        {/* New Password */}
        <div>
          <Label htmlFor="newPassword">Mật khẩu mới</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                // Auto clear error when typing
                if (errors.newPassword && e.target.value.length > 0) {
                  setErrors(prev => ({ ...prev, newPassword: undefined }));
                }
              }}
              className="pl-10 pr-10"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.newPassword && <p className="text-sm text-red-600 mt-1">{errors.newPassword}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                // Auto clear error when typing
                if (errors.confirmPassword && e.target.value.length > 0) {
                  setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                }
              }}
              className="pl-10 pr-10"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          
          <Button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Đổi mật khẩu"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}