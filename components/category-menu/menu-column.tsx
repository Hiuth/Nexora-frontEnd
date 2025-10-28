"use client";

import Link from "next/link";
import { MenuItem } from "@/data/menu-data";

interface MenuColumnProps {
  menuItems: MenuItem[];
}

export function MenuColumn({ menuItems }: MenuColumnProps) {
  return (
    <div>
      {menuItems.map((section, sectionIndex) => (
        <div key={sectionIndex} className={sectionIndex > 0 ? "mt-4" : ""}>
          <h3 className="font-bold text-red-600 text-sm mb-3 pb-2 border-b border-gray-200">
            {section.title}
          </h3>
          <div className="space-y-2">
            {section.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href}
                className="block text-sm text-gray-700 hover:text-red-600 transition-colors py-1"
              >
                {item.label}
                {item.hasArrow && " ›"}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
