"use client";

import { Card, CardContent } from "@/components/ui/card";

interface BuildProgressProps {
  completedRequired: number;
  totalRequired: number;
}

export function BuildProgress({
  completedRequired,
  totalRequired,
}: BuildProgressProps) {
  const progressPercentage = (completedRequired / totalRequired) * 100;

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-800">
            Tiến độ build
          </span>
          <span className="text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded-full shadow-sm">
            {completedRequired}/{totalRequired} linh kiện bắt buộc
          </span>
        </div>
        <div className="w-full bg-white rounded-full h-3 shadow-inner">
          <div
            className="bg-gray-600 h-3 rounded-full transition-all duration-500 shadow-sm"
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
        <div className="mt-2 text-right">
          <span className="text-xs font-medium text-gray-600">
            {Math.round(progressPercentage)}% hoàn thành
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
