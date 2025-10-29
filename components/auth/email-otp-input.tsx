"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Send, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailOTPInputProps {
  email: string;
  otp: string;
  onEmailChange: (value: string) => void;
  onOtpChange: (value: string) => void;
  emailError?: string;
  otpError?: string;
}

export function EmailOTPInput({
  email,
  otp,
  onEmailChange,
  onOtpChange,
  emailError,
  otpError,
}: EmailOTPInputProps) {
  const [isSending, setIsSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = validateEmail(email);

  const handleSendOTP = async () => {
    if (!isEmailValid) {
      toast({
        title: "Email không hợp lệ",
        description: "Vui lòng nhập địa chỉ email hợp lệ",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      // TODO: Gọi API gửi OTP tại đây
      // await authService.sendOTP(email);

      // Giả lập delay API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setOtpSent(true);
      setCountdown(60);

      // Đếm ngược
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      toast({
        title: "Gửi OTP thành công",
        description: `Mã OTP đã được gửi đến ${email}`,
      });
    } catch (error) {
      toast({
        title: "Gửi OTP thất bại",
        description: "Vui lòng thử lại sau",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="example@email.com"
              className={`pl-10 h-12 transition-all ${
                emailError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : isEmailValid && email.length > 0
                  ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
            />
          </div>
          <Button
            type="button"
            onClick={handleSendOTP}
            disabled={!isEmailValid || isSending || countdown > 0}
            className={`h-12 px-6 font-medium transition-all ${
              otpSent && countdown > 0
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang gửi...
              </>
            ) : countdown > 0 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                {countdown}s
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Gửi OTP
              </>
            )}
          </Button>
        </div>
        {emailError && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="font-medium">⚠</span> {emailError}
          </p>
        )}
        {isEmailValid && !emailError && email.length > 0 && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <span className="font-medium">✓</span> Email hợp lệ
          </p>
        )}
      </div>

      {/* OTP Input */}
      <div className="space-y-2">
        <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
          Mã OTP <span className="text-red-500">*</span>
        </Label>
        <Input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ""))}
          placeholder="Nhập mã OTP đã gửi đến email"
          disabled={!otpSent}
          maxLength={6}
          className={`h-12 transition-all ${
            !otpSent
              ? "bg-gray-100 cursor-not-allowed"
              : otpError
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : otp.length === 6
              ? "border-green-500 focus:border-green-500 focus:ring-green-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
          }`}
        />
        {otpError && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="font-medium">⚠</span> {otpError}
          </p>
        )}
        {!otpSent && (
          <p className="text-sm text-gray-500 flex items-center gap-1">
            💡 Nhấn nút "Gửi OTP" để nhận mã xác thực
          </p>
        )}
        {otpSent && otp.length === 6 && !otpError && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            <span className="font-medium">✓</span> Mã OTP hợp lệ
          </p>
        )}
      </div>
    </div>
  );
}
