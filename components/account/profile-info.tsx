"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileEditor } from "./profile-editor";
import { Edit, LogOut } from "lucide-react";
import { AccountResponse } from "@/types/account";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
}

interface ProfileInfoProps {
  accountData?: AccountResponse | null;
  isLoading?: boolean;
  onEdit?: () => void;
  onLogout?: () => void;
  onAccountUpdate?: (data: AccountResponse) => void;
  onReloadAccount?: () => Promise<void>;
}

export function ProfileInfo({
  accountData,
  isLoading,
  onEdit,
  onLogout,
  onAccountUpdate,
  onReloadAccount,
}: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Return loading state if data is not available
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Return error state if no account data
  if (!accountData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <div className="text-center text-gray-500">
          <p>Không thể tải thông tin tài khoản</p>
          <button 
            onClick={onReloadAccount} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Use accountData for all user information
  const currentUser = {
    name: accountData.userName,
    email: accountData.email,
    phone: accountData.phoneNumber,
    address: accountData.address,
    avatar: accountData.accountImg,
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedUser: UserProfile) => {
    // TODO: Call API to update user profile
    console.log("Updated user:", updatedUser);
    setIsEditing(false);
    if (onEdit) {
      onEdit();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
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

  if (isEditing) {
    return (
      <ProfileEditor
        user={currentUser}
        onSave={handleSave}
        onCancel={handleCancel}
        onLogout={handleLogout}
        onReloadAccount={onReloadAccount}
      />
    );
  }

  const profileFields = [
    {
      label: "Họ và tên",
      value: currentUser.name,
      key: "name",
    },
    {
      label: "Email",
      value: currentUser.email,
      key: "email",
    },
    {
      label: "Số điện thoại",
      value: currentUser.phone,
      key: "phone",
    },
    {
      label: "Địa chỉ",
      value: currentUser.address,
      key: "address",
    },
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 relative overflow-hidden">
      {/* Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            Thông tin cá nhân
          </h3>
          <Button
            variant="outline"
            onClick={handleEdit}
            className="px-4 py-2 h-10 text-slate-700 border-slate-300 hover:bg-slate-50 flex items-center gap-2 self-start sm:self-auto"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Chỉnh sửa</span>
            <span className="sm:hidden">Sửa</span>
          </Button>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-slate-200/50">
            <div className="relative self-center sm:self-auto">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg sm:text-xl font-bold">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 bg-emerald-500 rounded-full border-3 sm:border-4 border-white"></div>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-bold text-slate-800">
                {currentUser.name}
              </h4>
              <p className="text-slate-600 mt-1 text-sm sm:text-base">
                {currentUser.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {profileFields.map((field) => (
              <div key={field.key} className="space-y-2 group">
                <label className="text-xs sm:text-sm font-semibold text-slate-600 block uppercase tracking-wide">
                  {field.label}
                </label>
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl transition-colors border-l-4 border-blue-300 group-hover:bg-blue-100">
                  <p className="font-medium text-slate-800 text-sm sm:text-base break-words">
                    {field.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200/50 flex flex-col sm:flex-row gap-3">
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-2 sm:ml-auto h-11 sm:h-12 w-full sm:w-auto"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
