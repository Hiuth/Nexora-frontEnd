"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AccountTabsProps {
  defaultValue: string;
  profileContent: React.ReactNode;
  ordersManagementContent: React.ReactNode;
  warrantyLookupContent: React.ReactNode;
}

export function AccountTabs({
  defaultValue,
  profileContent,
  ordersManagementContent,
  warrantyLookupContent,
}: AccountTabsProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(defaultValue);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  const tabs = [
    {
      value: "profile",
      label: "Thông tin cá nhân",
      content: profileContent,
    },
    {
      value: "orders-management",
      label: "Quản lý đơn hàng",
      content: ordersManagementContent,
    },
    {
      value: "warranty-lookup",
      label: "Tra cứu bảo hành",
      content: warrantyLookupContent,
    },
  ];

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-6 sm:space-y-8"
    >
      <div className="rounded-xl sm:rounded-2xl p-1 sm:p-1.5 bg-white shadow-sm border border-slate-100">
        <TabsList className="bg-transparent rounded-lg sm:rounded-xl w-full grid grid-cols-3 gap-1 overflow-hidden">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-md sm:rounded-lg text-slate-600 hover:text-slate-800 hover:bg-blue-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 transition-all duration-200"
            >
              <span className="truncate">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="space-y-6 sm:space-y-8"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
