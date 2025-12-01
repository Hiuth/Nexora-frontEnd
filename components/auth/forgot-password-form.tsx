"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { EmailStep } from "./email-step";
import { OtpPasswordStep } from "./otp-password-step";
import { SuccessStep } from "./success-step";

export type ForgotPasswordStep = "email" | "otp" | "success";

export interface ForgotPasswordData {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export function ForgotPasswordForm() {
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>("email");
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleStepChange = (step: ForgotPasswordStep, data?: Partial<ForgotPasswordData>) => {
    if (data) {
      setFormData(prev => ({ ...prev, ...data }));
    }
    setCurrentStep(step);
  };

  const handleBack = () => {
    switch (currentStep) {
      case "otp":
        setCurrentStep("email");
        break;
      case "success":
        setCurrentStep("email");
        break;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "email":
        return "Nhập email của bạn";
      case "otp":
        return "Xác thực và đặt mật khẩu mới";
      case "success":
        return "Đổi mật khẩu thành công!";
      default:
        return "Đặt lại mật khẩu";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "email":
        return "Chúng tôi sẽ gửi mã xác thực đến email này";
      case "otp":
        return `Nhập mã OTP đã gửi đến ${formData.email} và mật khẩu mới`;
      case "success":
        return "Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập bằng mật khẩu mới.";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {getStepTitle()}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          {getStepDescription()}
        </p>
      </div>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Bước {currentStep === "email" ? 1 : currentStep === "otp" ? 2 : 3} / 3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: currentStep === "email" ? "33%" : currentStep === "otp" ? "66%" : "100%"
            }}
          />
        </div>
      </div>

      {/* Step Content */}
      {currentStep === "email" && (
        <EmailStep
          email={formData.email}
          onNext={(email) => handleStepChange("otp", { email })}
        />
      )}

      {currentStep === "otp" && (
        <OtpPasswordStep
          email={formData.email}
          otp={formData.otp}
          newPassword={formData.newPassword}
          confirmPassword={formData.confirmPassword}
          onNext={(data) => handleStepChange("success", data)}
          onBack={handleBack}
        />
      )}

      {currentStep === "success" && (
        <SuccessStep />
      )}

      {/* Back to Login - Only show on email step */}
      {currentStep === "email" && (
        <div className="text-center mt-8">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Quay lại đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
}