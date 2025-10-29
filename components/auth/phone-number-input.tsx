"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PhoneNumberInput({
  value,
  onChange,
  error,
}: PhoneNumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // Chỉ cho phép số
    if (input.length <= 10) {
      onChange(input);
    }
  };

  const isValid = value.length === 10;
  const showError = !isFocused && value.length > 0 && !isValid;

  return (
    <div className="space-y-2">
      <Label
        htmlFor="phoneNumber"
        className="text-sm font-medium text-gray-700"
      >
        Số điện thoại <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          id="phoneNumber"
          type="tel"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="0987654321"
          className={`pl-10 h-12 transition-all ${
            showError || error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : isValid
              ? "border-green-500 focus:border-green-500 focus:ring-green-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
          }`}
          maxLength={10}
        />
        {value.length > 0 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            {value.length}/10
          </div>
        )}
      </div>
      {showError && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span className="font-medium">⚠</span> Số điện thoại phải có đúng 10
          chữ số
        </p>
      )}
      {error && !showError && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span className="font-medium">⚠</span> {error}
        </p>
      )}
      {isValid && !error && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <span className="font-medium">✓</span> Số điện thoại hợp lệ
        </p>
      )}
    </div>
  );
}
