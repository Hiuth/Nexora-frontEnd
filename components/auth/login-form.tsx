"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 5) {
      newErrors.password = "Mật khẩu phải có ít nhất 5 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Thông tin chưa đầy đủ",
        description: "Vui lòng kiểm tra lại các trường thông tin",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);

      toast({
        title: "Đăng nhập thành công! 🎉",
        description: "Chào mừng bạn quay trở lại",
      });

      // Redirect to home page or previous page
      router.push("/");
    } catch (error: any) {
      setLoginError("Email hoặc mật khẩu không đúng ! Vui lòng kiểm tra lại");
      toast({
        title: "Đăng nhập thất bại",
        description: error.message || "Email hoặc mật khẩu không chính xác",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Clear login error when user starts typing
    if (loginError) {
      setLoginError("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Đăng Nhập</h1>
        <p className="text-gray-600">Chào mừng bạn quay trở lại với Nexora</p>
      </div>

      {/* Login Error Message */}
      {loginError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm font-medium text-center">
            {loginError}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="example@email.com"
              className={`pl-10 h-12 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">⚠ {errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Mật khẩu <span className="text-red-500">*</span>
            </Label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => updateFormData("password", e.target.value)}
              placeholder="Nhập mật khẩu"
              className={`pl-10 h-12 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">⚠ {errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Đăng nhập
              </>
            )}
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="space-y-2">
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
