"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AccountTabsProps {
  defaultValue: string;
  overviewContent: React.ReactNode;
  profileContent: React.ReactNode;
  ordersContent: React.ReactNode;
}

export function AccountTabs({
  defaultValue,
  overviewContent,
  profileContent,
  ordersContent,
}: AccountTabsProps) {
  const tabs = [
    {
      value: "overview",
      label: "Tổng quan",
      content: overviewContent,
    },
    {
      value: "profile",
      label: "Thông tin",
      content: profileContent,
    },
    {
      value: "orders",
      label: "Đơn hàng",
      content: ordersContent,
    },
  ];

  return (
    <Tabs defaultValue={defaultValue} className="space-y-8">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-primary/10 p-2">
        <TabsList className="bg-transparent border-0 w-full">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-primary/20 text-slate-700 hover:text-slate-900 font-medium px-6 py-3 rounded-xl transition-all duration-200"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="space-y-8">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
