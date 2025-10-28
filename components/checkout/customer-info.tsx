"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface CustomerFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes: string;
}

interface CustomerInfoProps {
  formData: CustomerFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function CustomerInfo({ formData, onChange }: CustomerInfoProps) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="border-2 border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <CardTitle className="flex items-center gap-3 text-gray-900">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            Thông tin khách hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-gray-500" />
                Họ và tên *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
                required
                placeholder="Nguyễn Văn A"
                className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-gray-500" />
                Số điện thoại *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={onChange}
                required
                placeholder="0123456789"
                className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Mail className="h-4 w-4 text-gray-500" />
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              required
              placeholder="email@example.com"
              className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card className="border-2 border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
          <CardTitle className="flex items-center gap-3 text-gray-900">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="h-4 w-4 text-green-600" />
            </div>
            Địa chỉ giao hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-semibold text-gray-700"
            >
              Địa chỉ *
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={onChange}
              required
              placeholder="Số nhà, tên đường"
              className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-semibold text-gray-700"
              >
                Tỉnh/Thành phố *
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={onChange}
                required
                placeholder="TP. Hồ Chí Minh"
                className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="district"
                className="text-sm font-semibold text-gray-700"
              >
                Quận/Huyện *
              </Label>
              <Input
                id="district"
                name="district"
                value={formData.district}
                onChange={onChange}
                required
                placeholder="Quận 1"
                className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="ward"
                className="text-sm font-semibold text-gray-700"
              >
                Phường/Xã *
              </Label>
              <Input
                id="ward"
                name="ward"
                value={formData.ward}
                onChange={onChange}
                required
                placeholder="Phường Bến Nghé"
                className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="notes"
              className="text-sm font-semibold text-gray-700"
            >
              Ghi chú
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={onChange}
              placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
              rows={3}
              className="border-2 border-gray-200 focus:border-blue-400 rounded-xl resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
