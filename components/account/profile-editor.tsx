"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, X, Loader2 } from "lucide-react";
import { accountService } from "@/services/account.service";
import { UpdateAccountRequest } from "@/types/account";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
}

interface ProfileEditorProps {
  user: UserProfile;
  onSave: (user: UserProfile) => void;
  onCancel: () => void;
  onLogout: () => void;
}

export function ProfileEditor({
  user,
  onSave,
  onCancel,
  onLogout,
}: ProfileEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState(user);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Prepare update request
      const request: UpdateAccountRequest = {
        userName: formData.name,
        gender: "Nam", // TODO: Add gender field to form if needed
        phoneNumber: formData.phone,
        address: formData.address,
        ...(avatarFile && { file: avatarFile }),
      };

      // Call API to update account
      const updatedAccount = await accountService.updateAccount(request);

      // Update the form data with new avatar URL if available
      const updatedUser = {
        ...formData,
        avatar: updatedAccount.accountImg || avatarPreview,
      };

      toast({
        title: "Thành công",
        description: "Cập nhật thông tin cá nhân thành công",
      });

      onSave(updatedUser);
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      {/* Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-800">
            Chỉnh sửa thông tin cá nhân
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="hover:bg-slate-100 rounded-lg h-9 w-9"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-r from-primary/5 to-blue-50/30 rounded-xl">
            <div className="relative">
              <Avatar className="h-24 w-24 shadow-lg">
                <AvatarImage src={avatarPreview} alt={formData.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                  {getInitials(formData.name)}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 h-9 w-9 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110"
              >
                <Camera className="h-4 w-4 text-white" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-slate-600 font-medium">
              Nhấp vào biểu tượng camera để thay đổi ảnh đại diện
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 block">
                Họ và tên
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-white shadow-sm focus:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 block">
                Email
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-white shadow-sm focus:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 block">
                Số điện thoại
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-white shadow-sm focus:shadow-md transition-shadow"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-600 block">
                Địa chỉ
              </label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="bg-white shadow-sm focus:shadow-md transition-shadow resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-200/50 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 h-12"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSaving}
              className="text-slate-700 hover:bg-slate-50 font-semibold px-8 py-3 rounded-xl transition-colors h-12"
            >
              <span>Hủy bỏ</span>
            </Button>
            <Button
              variant="destructive"
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors sm:ml-auto h-12"
            >
              <span>Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
