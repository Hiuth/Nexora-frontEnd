/**
 * PC Builder Component Category Mapping
 * 
 * Updated with actual category/subcategory IDs from the system's mock data and API.
 * These IDs correspond to the real data used throughout the application.
 */

export interface ComponentMapping {
  id: number;
  name: string;
  categoryId: string;
  subCategoryId?: string;
  description?: string;
}

// Component mappings with actual API category/subcategory IDs from mock data
export const COMPONENT_MAPPINGS: ComponentMapping[] = [
  // Core Components
  {
    id: 1,
    name: "CPU",
    categoryId: "1", // CPU category from mock data
    subCategoryId: "1", // Intel CPU subcategory
    description: "Bộ vi xử lý trung tâm"
  },
  {
    id: 2,
    name: "GPU", 
    categoryId: "2", // GPU category from mock data
    subCategoryId: "3", // NVIDIA GPU subcategory
    description: "Card đồ họa"
  },
  {
    id: 3,
    name: "RAM",
    categoryId: "3", // RAM category from mock data
    subCategoryId: "5", // DDR4 RAM subcategory
    description: "Bộ nhớ RAM"
  },
  {
    id: 4,
    name: "Mainboard",
    categoryId: "4", // Mainboard category from mock data
    subCategoryId: "7", // Intel Mainboard subcategory
    description: "Bo mạch chủ"
  },
  {
    id: 5,
    name: "SSD",
    categoryId: "5", // Storage category
    subCategoryId: "9", // SSD subcategory from mock data
    description: "Ổ cứng SSD"
  },
  {
    id: 6,
    name: "Nguồn",
    categoryId: "6", // PSU category
    subCategoryId: "11", // PSU subcategory from mock data
    description: "Bộ nguồn máy tính"
  },
  {
    id: 7,
    name: "Case",
    categoryId: "7", // Case category
    subCategoryId: "13", // Case subcategory from mock data
    description: "Vỏ máy tính"
  },

  // Optional Components
  {
    id: 8,
    name: "HDD",
    categoryId: "5", // Storage category (same as SSD)
    subCategoryId: "10", // HDD subcategory from mock data
    description: "Ổ cứng HDD"
  },
  {
    id: 9,
    name: "Tản nhiệt khí",
    categoryId: "8", // Cooling category
    subCategoryId: "15", // Air cooling subcategory from mock data
    description: "Tản nhiệt không khí"
  },
  {
    id: 10,
    name: "Tản nhiệt nước",
    categoryId: "8", // Cooling category
    subCategoryId: "16", // Water cooling subcategory from mock data
    description: "Tản nhiệt bằng nước"
  },

  // Peripherals - using general category since these aren't in PC Builder typically
  {
    id: 11,
    name: "Bàn phím",
    categoryId: "9", // Accessories category
    description: "Bàn phím cơ/màng"
  },
  {
    id: 12,
    name: "Chuột",
    categoryId: "9", // Accessories category
    description: "Chuột gaming/văn phòng"
  },
  {
    id: 13,
    name: "Tai nghe",
    categoryId: "9", // Accessories category
    description: "Tai nghe gaming/âm thanh"
  },
  {
    id: 14,
    name: "Loa",
    categoryId: "9", // Accessories category
    description: "Loa máy tính"
  },
  {
    id: 15,
    name: "Webcam",
    categoryId: "9", // Accessories category
    description: "Camera web"
  },
  {
    id: 16,
    name: "Màn hình",
    categoryId: "10", // Monitor category (if exists)
    description: "Màn hình máy tính"
  }
];

/**
 * Helper function to get component mapping by ID
 */
export function getComponentMapping(id: number): ComponentMapping | undefined {
  return COMPONENT_MAPPINGS.find(mapping => mapping.id === id);
}

/**
 * Helper function to get all core components (required)
 */
export function getCoreComponents(): ComponentMapping[] {
  return COMPONENT_MAPPINGS.slice(0, 7);
}

/**
 * Helper function to get all optional components
 */
export function getOptionalComponents(): ComponentMapping[] {
  return COMPONENT_MAPPINGS.slice(7);
}