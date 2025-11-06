"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { accountService } from "@/services/account.service";
import { AccountResponse, UpdateAccountRequest } from "@/types/account";
import {
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Upload,
  Camera,
} from "lucide-react";

export function AccountProfile() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [account, setAccount] = useState<AccountResponse | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const [formData, setFormData] = useState({
    userName: "",
    gender: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    loadAccountData();
  }, []);

  const loadAccountData = async () => {
    try {
      setIsLoading(true);
      const data = await accountService.getAccountById();
      setAccount(data);
      setFormData({
        userName: data.userName,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        address: data.address,
      });
      setAvatarPreview(data.accountImg);
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể tải thông tin tài khoản",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn file hình ảnh",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Lỗi",
          description: "Kích thước file không được vượt quá 5MB",
          variant: "destructive",
        });
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const request: UpdateAccountRequest = {
        userName: formData.userName,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        ...(avatarFile && { file: avatarFile }),
      };

      const updatedAccount = await accountService.updateAccount(request);
      setAccount(updatedAccount);
      setIsEditing(false);
      setAvatarFile(null);

      toast({
        title: "Thành công",
        description: "Cập nhật thông tin tài khoản thành công",
      });
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Cập nhật thông tin thất bại",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (account) {
      setFormData({
        userName: account.userName,
        gender: account.gender,
        phoneNumber: account.phoneNumber,
        address: account.address,
      });
      setAvatarPreview(account.accountImg);
      setAvatarFile(null);
    }
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Đang tải thông tin...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!account) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center text-gray-500">
            Không thể tải thông tin tài khoản
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-6">
        <div className="relative mx-auto mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          {isEditing && (
            <Label
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </Label>
          )}
        </div>
        <CardTitle className="text-2xl font-bold">{account.userName}</CardTitle>
        <p className="text-gray-500">{account.email}</p>

        <div className="flex justify-center gap-2 mt-4">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Chỉnh sửa
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Lưu
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Hủy
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tên người dùng */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tên người dùng</Label>
          {isEditing ? (
            <Input
              value={formData.userName}
              onChange={(e) => handleInputChange("userName", e.target.value)}
              placeholder="Nhập tên người dùng"
            />
          ) : (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-gray-500" />
              <span>{account.userName}</span>
            </div>
          )}
        </div>

        {/* Email (readonly) */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Email</Label>
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>{account.email}</span>
          </div>
        </div>

        {/* Giới tính */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Giới tính</Label>
          {isEditing ? (
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nam">Nam</SelectItem>
                <SelectItem value="Nữ">Nữ</SelectItem>
                <SelectItem value="Khác">Khác</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-gray-500" />
              <span>{account.gender}</span>
            </div>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Số điện thoại</Label>
          {isEditing ? (
            <Input
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          ) : (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{account.phoneNumber}</span>
            </div>
          )}
        </div>

        {/* Địa chỉ */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Địa chỉ</Label>
          {isEditing ? (
            <Textarea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Nhập địa chỉ"
              rows={3}
            />
          ) : (
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
              <span>{account.address}</span>
            </div>
          )}
        </div>

        {/* Ngày tạo tài khoản */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Ngày tạo tài khoản</Label>
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{formatDate(account.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
