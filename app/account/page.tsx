"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  AccountStats,
  ProfileInfo,
  AccountTabs,
  OrdersManagement,
} from "@/components/account";
import { accountService } from "@/services/account.service";
import { AccountResponse } from "@/types/api";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
  const { toast } = useToast();
  const { logout } = useAuth();
  const [accountData, setAccountData] = useState<AccountResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load account data from API
  const loadAccountData = async () => {
    try {
      setIsLoading(true);
      const data = await accountService.getAccountById();
      setAccountData(data);
    } catch (error: any) {
      console.error("Failed to load account data:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải thông tin tài khoản. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAccountData();
  }, [toast]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Đăng xuất thành công",
        description: "Bạn đã đăng xuất khỏi hệ thống",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // TODO: Implement edit profile logic or navigate to edit page
    toast({
      title: "Thông báo",
      description: "Tính năng chỉnh sửa hồ sơ đang được phát triển",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Modern Account Dashboard */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            {/* Welcome Section */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 animate-in slide-in-from-top-4 duration-700">
                Xin chào,{" "}
                <span className="text-blue-600">
                  {isLoading ? "..." : accountData?.userName || "Bạn"}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                Quản lý thông tin cá nhân và theo dõi đơn hàng của bạn
              </p>
            </div>
          </div>

          {/* Main Content */}
          <AccountTabs
            defaultValue="profile"
            profileContent={
              <ProfileInfo
                accountData={accountData}
                isLoading={isLoading}
                onEdit={handleEditProfile}
                onLogout={handleLogout}
                onAccountUpdate={setAccountData}
                onReloadAccount={loadAccountData}
              />
            }
            ordersManagementContent={<OrdersManagement />}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
