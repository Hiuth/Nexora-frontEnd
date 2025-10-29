"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneNumberInput } from "@/components/auth/phone-number-input";
import { EmailOTPInput } from "@/components/auth/email-otp-input";
import {
  User,
  Lock,
  MapPin,
  UserPlus,
  Loader2,
  UserCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface SignUpFormData {
  userName: string;
  password: string;
  confirmPassword: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  otp: string;
}

export function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<SignUpFormData>({
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    otp: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpFormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignUpFormData, string>> = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Vui lòng nhập tên đăng nhập";
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Tên đăng nhập phải có ít nhất 3 ký tự";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    }

    if (formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Số điện thoại phải có đúng 10 chữ số";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (!formData.otp || formData.otp.length !== 6) {
      newErrors.otp = "Vui lòng nhập mã OTP hợp lệ";
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
      // TODO: Gọi API đăng ký tại đây
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Đăng ký thành công! 🎉",
        description: "Chào mừng bạn đến với PC Store",
      });

      setFormData({
        userName: "",
        password: "",
        confirmPassword: "",
        gender: "",
        email: "",
        phoneNumber: "",
        address: "",
        otp: "",
      });
    } catch (error) {
      toast({
        title: "Đăng ký thất bại",
        description: "Vui lòng thử lại sau",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof SignUpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Grid Layout - 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Tên đăng nhập */}
        <div className="space-y-2">
          <Label
            htmlFor="userName"
            className="text-sm font-medium text-gray-700"
          >
            Tên đăng nhập <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="userName"
              value={formData.userName}
              onChange={(e) => updateFormData("userName", e.target.value)}
              placeholder="Nhập tên đăng nhập"
              className={`pl-10 h-12 ${
                errors.userName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>
          {errors.userName && (
            <p className="text-sm text-red-500">⚠ {errors.userName}</p>
          )}
        </div>

        {/* Giới tính */}
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Giới tính <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
            <Select
              value={formData.gender}
              onValueChange={(value) => updateFormData("gender", value)}
            >
              <SelectTrigger
                className={`h-12 pl-10 ${
                  errors.gender
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : ""
                }`}
              >
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.gender && (
            <p className="text-sm text-red-500">⚠ {errors.gender}</p>
          )}
        </div>

        {/* Mật khẩu */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Mật khẩu <span className="text-red-500">*</span>
          </Label>
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

        {/* Xác nhận mật khẩu */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Xác nhận mật khẩu <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                updateFormData("confirmPassword", e.target.value)
              }
              placeholder="Nhập lại mật khẩu"
              className={`pl-10 h-12 ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">⚠ {errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Phone Number */}
      <PhoneNumberInput
        value={formData.phoneNumber}
        onChange={(value) => updateFormData("phoneNumber", value)}
        error={errors.phoneNumber}
      />

      {/* Email & OTP */}
      <EmailOTPInput
        email={formData.email}
        otp={formData.otp}
        onEmailChange={(value) => updateFormData("email", value)}
        onOtpChange={(value) => updateFormData("otp", value)}
        emailError={errors.email}
        otpError={errors.otp}
      />

      {/* Địa chỉ */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          Địa chỉ <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData("address", e.target.value)}
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
            rows={3}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
              errors.address
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
          />
        </div>
        {errors.address && (
          <p className="text-sm text-red-500">⚠ {errors.address}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
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
              <UserPlus className="h-5 w-5 mr-2" />
              Tạo tài khoản
            </>
          )}
        </Button>
      </div>

      {/* Login Link */}
      <div className="text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </form>
  );
}
