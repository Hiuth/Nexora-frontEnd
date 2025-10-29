"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Cpu,
  Zap,
  HardDrive,
  MemoryStick,
  Box,
  Fan,
  Battery,
  Monitor,
  Database,
  Wind,
  Keyboard,
  Mouse,
  Headphones,
  Armchair,
  Camera,
  Volume2,
  Mic,
  Wifi,
  Laptop,
} from "lucide-react";
import { products, subCategories } from "@/lib/mock-data";
import type { Product, SubCategory } from "@/lib/types";
import { BuildProgress } from "@/components/pc-builder/build-progress";
import { BuildSummary } from "@/components/pc-builder/build-summary-clean";
import { ProductSelectionDialog } from "@/components/pc-builder/product-selection-dialog";
import { CategorySection } from "@/components/pc-builder/category-section";
import { PCBuilderHeader } from "@/components/pc-builder/pc-builder-header";

interface BuildComponent {
  category: string;
  categoryId: number;
  icon: React.ReactNode;
  product: Product | null;
  quantity: number;
  required: boolean;
  categoryType: string;
}

const componentCategories = [
  // Core Components (Required)
  {
    id: 1,
    name: "CPU",
    icon: <Cpu className="h-5 w-5" />,
    required: true,
    category: "core",
  },
  {
    id: 2,
    name: "GPU",
    icon: <Zap className="h-5 w-5" />,
    required: true,
    category: "core",
  },
  {
    id: 3,
    name: "RAM",
    icon: <MemoryStick className="h-5 w-5" />,
    required: true,
    category: "core",
  },
  {
    id: 4,
    name: "Mainboard",
    icon: <Monitor className="h-5 w-5" />,
    required: true,
    category: "core",
  },
  {
    id: 5,
    name: "SSD chính",
    icon: <HardDrive className="h-5 w-5" />,
    required: true,
    category: "core",
  },
  {
    id: 6,
    name: "Nguồn",
    icon: <Battery className="h-5 w-5" />,
    required: true,
    category: "core",
  },
  {
    id: 7,
    name: "Case",
    icon: <Box className="h-5 w-5" />,
    required: true,
    category: "core",
  },

  // Storage & Cooling (Optional)
  {
    id: 8,
    name: "SSD phụ",
    icon: <HardDrive className="h-5 w-5" />,
    required: false,
    category: "storage",
  },
  {
    id: 9,
    name: "HDD",
    icon: <Database className="h-5 w-5" />,
    required: false,
    category: "storage",
  },
  {
    id: 10,
    name: "Tản nhiệt nước",
    icon: <Fan className="h-5 w-5" />,
    required: false,
    category: "cooling",
  },
  {
    id: 11,
    name: "Tản nhiệt khí",
    icon: <Wind className="h-5 w-5" />,
    required: false,
    category: "cooling",
  },

  // Peripherals
  {
    id: 12,
    name: "Bàn phím",
    icon: <Keyboard className="h-5 w-5" />,
    required: false,
    category: "peripheral",
  },
  {
    id: 13,
    name: "Chuột",
    icon: <Mouse className="h-5 w-5" />,
    required: false,
    category: "peripheral",
  },
  {
    id: 14,
    name: "Tai nghe",
    icon: <Headphones className="h-5 w-5" />,
    required: false,
    category: "peripheral",
  },
  {
    id: 15,
    name: "Webcam",
    icon: <Camera className="h-5 w-5" />,
    required: false,
    category: "peripheral",
  },
  {
    id: 16,
    name: "Loa",
    icon: <Volume2 className="h-5 w-5" />,
    required: false,
    category: "peripheral",
  },
  {
    id: 17,
    name: "Microphone",
    icon: <Mic className="h-5 w-5" />,
    required: false,
    category: "peripheral",
  },

  // Furniture & Network
  {
    id: 18,
    name: "Ghế gaming",
    icon: <Armchair className="h-5 w-5" />,
    required: false,
    category: "furniture",
  },
  {
    id: 19,
    name: "Bàn",
    icon: <Laptop className="h-5 w-5" />,
    required: false,
    category: "furniture",
  },
  {
    id: 20,
    name: "Thiết bị mạng",
    icon: <Wifi className="h-5 w-5" />,
    required: false,
    category: "network",
  },
];

export default function PCBuilderPage() {
  const [buildComponents, setBuildComponents] = useState<BuildComponent[]>(
    componentCategories.map((cat) => ({
      category: cat.name,
      categoryId: cat.id,
      icon: cat.icon,
      product: null,
      quantity: 1,
      required: cat.required,
      categoryType: cat.category,
    }))
  );
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");

  const addComponent = (categoryId: number, product: Product) => {
    setBuildComponents((prev) =>
      prev.map((comp) =>
        comp.categoryId === categoryId
          ? { ...comp, product, quantity: 1 }
          : comp
      )
    );
    setIsDialogOpen(false);
  };

  const updateQuantity = (categoryId: number, quantity: number) => {
    setBuildComponents((prev) =>
      prev.map((comp) =>
        comp.categoryId === categoryId ? { ...comp, quantity } : comp
      )
    );
  };

  const removeComponent = (categoryId: number) => {
    setBuildComponents((prev) =>
      prev.map((comp) =>
        comp.categoryId === categoryId
          ? { ...comp, product: null, quantity: 1 }
          : comp
      )
    );
  };

  const totalPrice = buildComponents.reduce(
    (sum, comp) => sum + (comp.product?.price || 0) * comp.quantity,
    0
  );

  const requiredComponents = buildComponents.filter((c) => c.required);
  const completedRequired = requiredComponents.filter(
    (c) => c.product !== null
  ).length;
  const isComplete = completedRequired === requiredComponents.length;

  const availableSubCategories = selectedCategory
    ? subCategories.filter(
        (sub) => sub.categoryId === selectedCategory.toString()
      )
    : [];

  const availableProducts = selectedCategory
    ? products.filter((p) => {
        const matchesSearch = searchQuery
          ? p.productName.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        const matchesSubCategory =
          selectedSubCategory === "all" ||
          p.subCategoryId === selectedSubCategory;

        // Tìm subcategory phù hợp với category được chọn
        const relevantSubCategories = subCategories.filter(
          (sub) => sub.categoryId === selectedCategory.toString()
        );
        const isInCategory = relevantSubCategories.some(
          (sub) => sub.id === p.subCategoryId
        );

        return isInCategory && matchesSearch && matchesSubCategory;
      })
    : [];

  const openDialog = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    setSelectedSubCategory("all");
    setIsDialogOpen(true);
  };

  const clearBuild = () => {
    setBuildComponents((prev) =>
      prev.map((comp) => ({ ...comp, product: null, quantity: 1 }))
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <PCBuilderHeader />

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Build Components */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Progress */}
              <BuildProgress
                completedRequired={completedRequired}
                totalRequired={requiredComponents.length}
              />

              {/* Core Components Section */}
              <CategorySection
                title="Linh kiện chính"
                description="Các linh kiện cần thiết để build PC"
                icon={<Cpu className="h-6 w-6 text-blue-600" />}
                components={buildComponents.filter(
                  (comp) => comp.categoryType === "core"
                )}
                onSelectComponent={openDialog}
                onRemoveComponent={removeComponent}
                onUpdateQuantity={updateQuantity}
                colorTheme="blue"
              />

              {/* Storage & Cooling Section */}
              <CategorySection
                title="Lưu trữ & Tản nhiệt"
                description="Mở rộng lưu trữ và cải thiện hiệu suất làm mát"
                icon={<HardDrive className="h-6 w-6 text-teal-600" />}
                components={buildComponents.filter(
                  (comp) =>
                    comp.categoryType === "storage" ||
                    comp.categoryType === "cooling"
                )}
                onSelectComponent={openDialog}
                onRemoveComponent={removeComponent}
                onUpdateQuantity={updateQuantity}
                colorTheme="teal"
              />

              {/* Peripherals Section */}
              <CategorySection
                title="Thiết bị ngoại vi"
                description="Bàn phím, chuột, tai nghe và các thiết bị khác"
                icon={<Mouse className="h-6 w-6 text-emerald-600" />}
                components={buildComponents.filter(
                  (comp) => comp.categoryType === "peripheral"
                )}
                onSelectComponent={openDialog}
                onRemoveComponent={removeComponent}
                onUpdateQuantity={updateQuantity}
                colorTheme="emerald"
              />

              {/* Furniture & Network Section */}
              <CategorySection
                title="Nội thất & Mạng"
                description="Bàn, ghế và thiết bị kết nối mạng"
                icon={<Armchair className="h-6 w-6 text-cyan-600" />}
                components={buildComponents.filter(
                  (comp) =>
                    comp.categoryType === "furniture" ||
                    comp.categoryType === "network"
                )}
                onSelectComponent={openDialog}
                onRemoveComponent={removeComponent}
                onUpdateQuantity={updateQuantity}
                colorTheme="cyan"
              />
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <BuildSummary
                buildComponents={buildComponents}
                totalPrice={totalPrice}
                isComplete={isComplete}
                onClearBuild={clearBuild}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Product Selection Dialog */}
      <ProductSelectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedCategory={selectedCategory}
        categoryName={
          componentCategories.find((c) => c.id === selectedCategory)?.name || ""
        }
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSubCategory={selectedSubCategory}
        onSubCategoryChange={setSelectedSubCategory}
        availableSubCategories={availableSubCategories}
        availableProducts={availableProducts}
        onSelectProduct={(product) =>
          selectedCategory && addComponent(selectedCategory, product)
        }
      />

      <Footer />
    </div>
  );
}
