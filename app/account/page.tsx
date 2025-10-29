"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AccountSidebar } from "@/components/account/account-sidebar";
import { AccountStats } from "@/components/account/account-stats";
import { RecentOrders } from "@/components/account/recent-orders";
import { ProfileInfo } from "@/components/account/profile-info";
import { OrdersList } from "@/components/account/orders-list";
import { AccountTabs } from "@/components/account/account-tabs";
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
    // Handle logout logic here
    console.log("Logout clicked");
  };

  const handleEditProfile = () => {
    // Handle edit profile logic here
    console.log("Edit profile clicked");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-primary/5 via-slate-50 to-blue-50/30 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-slate-900">
              Tài khoản của tôi
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Quản lý thông tin cá nhân và theo dõi đơn hàng của bạn một cách dễ
              dàng
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-10">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <AccountSidebar
                user={user}
                activeSection="profile"
                onLogout={handleLogout}
              />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AccountTabs
                defaultValue="overview"
                overviewContent={
                  <div className="space-y-8">
                    <AccountStats
                      totalOrders={mockOrders.length}
                      completedOrders={completedOrders}
                    />
                    <RecentOrders
                      orders={recentOrders}
                      orderItems={mockOrderDetails}
                    />
                  </div>
                }
                profileContent={
                  <ProfileInfo user={user} onEdit={handleEditProfile} />
                }
                ordersContent={
                  <OrdersList
                    orders={mockOrders}
                    orderItems={mockOrderDetails}
                    products={products}
                  />
                }
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
