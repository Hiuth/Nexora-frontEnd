"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  AccountStats,
  ProfileInfo,
  AccountTabs,
  OrdersManagement,
} from "@/components/account";
import { mockOrders, mockOrderDetails } from "@/lib/mock-orders";
import { products } from "@/lib/mock-data";

export default function AccountPage() {
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    address: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM",
  };

  const recentOrders = mockOrders.slice(0, 3);
  const completedOrders = mockOrders.filter(
    (o) => o.status === "delivered"
  ).length;

  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement logout logic here
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Implement edit profile logic here
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 gradient-background min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Modern Account Dashboard */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            {/* Welcome Section */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 animate-in slide-in-from-top-4 duration-700">
                Xin chào, <span className="text-blue-600">{user.name}</span>
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
                user={user}
                onEdit={handleEditProfile}
                onLogout={handleLogout}
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
