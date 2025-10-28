// Menu item structure for category dropdown
export interface MenuItem {
  title: string;
  items: MenuLink[];
}

export interface MenuLink {
  label: string;
  href: string;
  hasArrow?: boolean;
}

// Static menu data - can be moved to API later
export const MENU_COLUMNS: MenuItem[] = [
  {
    title: "PC Theo VGA",
    items: [
      {
        label: "PC VGA Nvidia",
        href: "/products?subcategory=pc-vga-nvidia",
        hasArrow: true,
      },
      {
        label: "PC VGA AMD",
        href: "/products?subcategory=pc-vga-amd",
        hasArrow: true,
      },
      {
        label: "PC Sử Dụng VGA Chuyên Dung",
        href: "/products?subcategory=pc-vga-chuyen-dung",
      },
    ],
  },
  {
    title: "PC Gaming",
    items: [
      {
        label: "PC Watercooling Custom",
        href: "/products?subcategory=pc-watercooling",
      },
      { label: "PC Game Esport", href: "/products?subcategory=pc-game-esport" },
      { label: "PC Game AAA", href: "/products?subcategory=pc-game-aaa" },
    ],
  },
];

export const MENU_COLUMNS_2: MenuItem[] = [
  {
    title: "PC CPU Intel",
    items: [
      {
        label: "PC Sử Dụng Intel Core i3",
        href: "/products?subcategory=pc-intel-core-i3",
      },
      {
        label: "PC Sử Dụng Intel Core i5 | Ultra 5",
        href: "/products?subcategory=pc-intel-core-i5",
      },
      {
        label: "PC Sử Dụng Intel Core i7 | Ultra 7",
        href: "/products?subcategory=pc-intel-core-i7",
      },
      {
        label: "PC Sử Dụng Intel Core i9 | Ultra 9",
        href: "/products?subcategory=pc-intel-core-i9",
      },
    ],
  },
  {
    title: "PC Theo Sở Thích - Nhu Cầu",
    items: [
      {
        label: "PC Thiết Kế Đặc Biệt",
        href: "/products?subcategory=pc-thiet-ke-dac-biet",
      },
      {
        label: "PC Thiết Kế Đồ Họa",
        href: "/products?subcategory=pc-thiet-ke-do-hoa",
      },
      {
        label: "PC nhỏ gọn ITX",
        href: "/products?subcategory=pc-nho-gon-itx",
        hasArrow: true,
      },
    ],
  },
];

export const MENU_COLUMNS_3: MenuItem[] = [
  {
    title: "PC CPU AMD",
    items: [
      {
        label: "PC Sử Dụng AMD Athlon - Ryzen 3",
        href: "/products?subcategory=pc-amd-athlon-ryzen-3",
      },
      {
        label: "PC Sử Dụng AMD Ryzen 5",
        href: "/products?subcategory=pc-amd-ryzen-5",
      },
      {
        label: "PC Sử Dụng AMD Ryzen 7",
        href: "/products?subcategory=pc-amd-ryzen-7",
      },
      {
        label: "PC Sử Dụng AMD Ryzen 9",
        href: "/products?subcategory=pc-amd-ryzen-9",
      },
    ],
  },
  {
    title: "PC Theo Khoảng Giá",
    items: [
      { label: "PC Dưới 15 Triệu", href: "/products?price=under-15" },
      { label: "PC Từ 15 - 30 Triệu", href: "/products?price=15-30" },
      { label: "PC Từ 30 - 50 Triệu", href: "/products?price=30-50" },
      { label: "PC Từ 50 - 100 Triệu", href: "/products?price=50-100" },
      { label: "PC Trên 100 Triệu", href: "/products?price=over-100" },
    ],
  },
];

export const MENU_COLUMNS_4: MenuItem[] = [
  {
    title: "PC Theo Hãng",
    items: [
      { label: "PC Powered by Asus", href: "/products?brand=asus" },
      { label: "PC Powered by AMD", href: "/products?brand=amd" },
      { label: "PC Powered by MSI", href: "/products?brand=msi" },
      { label: "PC Gigabyte", href: "/products?brand=gigabyte" },
    ],
  },
  {
    title: "PC Chuyên Dung",
    items: [
      {
        label: "PC Machine Learning/AI",
        href: "/products?category=pc-machine-learning",
      },
    ],
  },
];
