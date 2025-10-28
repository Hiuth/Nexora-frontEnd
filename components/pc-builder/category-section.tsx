"use client";

import { ComponentItem } from "./component-item";
import type { Product } from "@/lib/types";

interface BuildComponent {
  category: string;
  categoryId: number;
  icon: React.ReactNode;
  product: Product | null;
  quantity: number;
  required: boolean;
  categoryType: string;
}

interface CategorySectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  components: BuildComponent[];
  onSelectComponent: (categoryId: number) => void;
  onRemoveComponent: (categoryId: number) => void;
  onUpdateQuantity: (categoryId: number, quantity: number) => void;
  colorTheme?: "blue" | "teal" | "emerald" | "cyan";
}

export function CategorySection({
  title,
  description,
  icon,
  components,
  onSelectComponent,
  onRemoveComponent,
  onUpdateQuantity,
  colorTheme = "blue",
}: CategorySectionProps) {
  // Định nghĩa màu sắc cho từng theme
  const themeClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      desc: "text-blue-600",
    },
    teal: {
      bg: "bg-teal-50",
      text: "text-teal-800",
      desc: "text-teal-600",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-800",
      desc: "text-emerald-600",
    },
    cyan: {
      bg: "bg-cyan-50",
      text: "text-cyan-800",
      desc: "text-cyan-600",
    },
  };

  const theme = themeClasses[colorTheme];

  return (
    <div className="bg-white rounded-xl shadow-lg border-0 overflow-hidden">
      <div className={`${theme.bg} px-6 py-4`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
          <div>
            <h3 className={`text-lg font-semibold ${theme.text}`}>{title}</h3>
            <p className={`${theme.desc} text-sm font-medium`}>{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {components.map((component, index) => (
          <div key={component.categoryId}>
            <ComponentItem
              component={component}
              onSelectComponent={onSelectComponent}
              onRemoveComponent={onRemoveComponent}
              onUpdateQuantity={onUpdateQuantity}
            />
            {/* Divider giữa các component, không hiển thị sau component cuối */}
            {index < components.length - 1 && (
              <div className="my-4">
                <div className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
