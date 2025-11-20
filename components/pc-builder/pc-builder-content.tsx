"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePCBuilder } from "@/hooks/use-pc-builder";
import { ComponentCard } from "./component-card";
import { ComponentSelectionDialog } from './component-selection-dialog';
import { BuildSummaryCard } from './build-summary-card';
import { PCBuilderPageHeader } from './pc-builder-page-header';
import { CategoriesList } from './categories-list';
import { QuantityControls } from "./quantity-controls";
import { useQuantityValidator } from "./product-quantity-validator";
import { Category, SubCategory } from "@/lib/types";
import { 
  Cpu, 
  Zap, 
  MemoryStick, 
  Monitor, 
  HardDrive, 
  Battery, 
  Box,
  Database,
  Fan,
  Wind,
  Keyboard,
  Mouse,
  Headphones,
  Volume2,
  Camera,
  Tv
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { COMPONENT_MAPPINGS } from "@/config/pc-builder-mappings";
import { CartService } from "@/services/cart.service";

// Create component definitions from mappings with icons
const COMPONENT_DEFINITIONS = COMPONENT_MAPPINGS.map(mapping => ({
  id: mapping.id,
  name: mapping.name,
  icon: getIconForComponent(mapping.name),
  categoryId: mapping.categoryId,
  subCategoryId: mapping.subCategoryId,
  product: null,
  quantity: 1,
}));

function getIconForCategory(categoryId: number | string): React.ReactNode {
  const iconMap: { [key: string]: React.ReactNode } = {
    "1": <Cpu className="h-5 w-5" />, // CPU
    "2": <Zap className="h-5 w-5" />, // GPU
    "3": <MemoryStick className="h-5 w-5" />, // RAM
    "4": <Monitor className="h-5 w-5" />, // Mainboard
    "5": <HardDrive className="h-5 w-5" />, // Storage
    "6": <Battery className="h-5 w-5" />, // PSU
    "7": <Box className="h-5 w-5" />, // Case
    "8": <Fan className="h-5 w-5" />, // Cooling
    "9": <Keyboard className="h-5 w-5" />, // Accessories
    "10": <Tv className="h-5 w-5" />, // Monitor
  };
  
  return iconMap[categoryId.toString()] || <Box className="h-5 w-5" />;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price);
}

function getIconForComponent(name: string): React.ReactNode {
  const iconMap: { [key: string]: React.ReactNode } = {
    "CPU": <Cpu className="h-5 w-5" />,
    "GPU": <Zap className="h-5 w-5" />,
    "RAM": <MemoryStick className="h-5 w-5" />,
    "Mainboard": <Monitor className="h-5 w-5" />,
    "SSD": <HardDrive className="h-5 w-5" />,
    "Nguồn": <Battery className="h-5 w-5" />,
    "Case": <Box className="h-5 w-5" />,
    "HDD": <Database className="h-5 w-5" />,
    "Tản nhiệt khí": <Fan className="h-5 w-5" />,
    "Tản nhiệt nước": <Wind className="h-5 w-5" />,
    "Bàn phím": <Keyboard className="h-5 w-5" />,
    "Chuột": <Mouse className="h-5 w-5" />,
    "Tai nghe": <Headphones className="h-5 w-5" />,
    "Loa": <Volume2 className="h-5 w-5" />,
    "Webcam": <Camera className="h-5 w-5" />,
    "Màn hình": <Tv className="h-5 w-5" />,
  };
  
  return iconMap[name] || <Box className="h-5 w-5" />;
}

export function PCBuilderContent() {
  const router = useRouter();
  const {
    buildComponents,
    setBuildComponents,
    selectedComponent,
    isDialogOpen,
    filteredProducts,
    categories,
    subCategories,
    isLoading,
    isAuthenticated,
    
    // Actions
    openComponentDialog,
    closeDialog,
    selectProduct,
    removeProduct,
    updateQuantity,
    addToCart,
    
    // Compatibility
    checkCompatibility,
    isSubCategoryDisabled,
    
    // Computed
    getTotalPrice,
    getSelectedProductsCount,
  } = usePCBuilder();

  const { toast } = useToast();
  const { validateProductQuantities } = useQuantityValidator();

  // Filter out unwanted categories with multiple name variations
  const excludedCategoryNames = [
    "Laptop - Máy Xách Tay",
    "Laptop - Máy Tình Xách Tay", 
    "Laptop - Máy Tính Xách Tay",
    "Phần Mềm", 
    "Máy Bộ Nexora", 
    "Dịch Vụ Sản Phẩm",
    "Máy In & Máy Scan"
  ];
  
  const filteredCategories = categories.filter(cat => {
    const shouldExclude = excludedCategoryNames.some(excludedName => 
      cat.categoryName.includes(excludedName) || 
      excludedName.includes(cat.categoryName) ||
      cat.categoryName.toLowerCase().includes('laptop') ||
      cat.categoryName.toLowerCase().includes('phần mềm') ||
      cat.categoryName.toLowerCase().includes('nexora') ||
      cat.categoryName.toLowerCase().includes('dịch vụ')
    );
    console.log(`Category: "${cat.categoryName}" - Excluded: ${shouldExclude}`);
    return !shouldExclude;
  });

  // Group subcategories by category (excluding unwanted categories)
  const getCategorySubCategories = (categoryId: string) => {
    return subCategories.filter(sub => {
      // Check if subcategory belongs to the category
      if (sub.categoryId !== categoryId) return false;
      
      // Check if subcategory or parent category should be excluded
      const shouldExcludeSubCategory = excludedCategoryNames.some(excludedName => 
        sub.subCategoryName.includes(excludedName) || 
        excludedName.includes(sub.subCategoryName) ||
        sub.categoryName.includes(excludedName) ||
        excludedName.includes(sub.categoryName) ||
        sub.subCategoryName.toLowerCase().includes('laptop') ||
        sub.subCategoryName.toLowerCase().includes('phần mềm') ||
        sub.subCategoryName.toLowerCase().includes('nexora') ||
        sub.subCategoryName.toLowerCase().includes('dịch vụ') ||
        sub.categoryName.toLowerCase().includes('laptop') ||
        sub.categoryName.toLowerCase().includes('phần mềm') ||
        sub.categoryName.toLowerCase().includes('nexora') ||
        sub.categoryName.toLowerCase().includes('dịch vụ')
      );
      
      return !shouldExcludeSubCategory;
    });
  };

  // Get selected product for a subcategory
  const getSelectedProduct = (subCategoryId: string) => {
    return buildComponents.find(comp => comp.subCategoryId === subCategoryId)?.product;
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (subCategory: SubCategory) => {
    // Create a temporary component for the dialog
    const tempComponent = {
      id: Date.now(),
      name: subCategory.subCategoryName,
      icon: getIconForCategory(subCategory.categoryId),
      categoryId: subCategory.categoryId,
      subCategoryId: subCategory.id,
      product: null,
      quantity: 1,
    };
    
    openComponentDialog(tempComponent);
  };

  const handleAddAllToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Cần đăng nhập",
        description: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
      return;
    }

    const componentsWithProducts = buildComponents.filter(comp => comp.product !== null);
    
    if (componentsWithProducts.length === 0) {
      toast({
        title: "Chưa có sản phẩm",
        description: "Vui lòng chọn ít nhất một linh kiện",
        variant: "destructive",
      });
      return;
    }

    try {
      // Prepare products for validation
      const productsToValidate = componentsWithProducts
        .filter(comp => comp.product)
        .map(comp => ({
          product: comp.product!,
          quantity: comp.quantity
        }));

      // Validate quantities against cart and stock
      const { isValid, errors } = await validateProductQuantities(productsToValidate);
      
      if (!isValid) {
        toast({
          title: "Không thể thêm vào giỏ hàng",
          description: errors?.join("; ") || "Có lỗi xảy ra khi kiểm tra số lượng",
          variant: "destructive",
        });
        return;
      }

      // Add each component to cart with proper quantity
      for (const comp of componentsWithProducts) {
        if (comp.product) {
          // Use CartService to add with the specified quantity
          await CartService.addToCart(comp.product.id, comp.quantity);
        }
      }
      
      toast({
        title: "Thành công",
        description: `Đã thêm ${componentsWithProducts.length} loại sản phẩm vào giỏ hàng`,
      });
      
      // Redirect to cart page after successful add
      setTimeout(() => {
        router.push('/cart');
      }, 1500); // Delay to show toast message
      
    } catch (error) {
      console.error("Failed to add components to cart:", error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
    }
  };

  // Group components by category
  const coreComponents = buildComponents.slice(0, 7); // CPU, GPU, RAM, Mainboard, SSD, PSU, Case
  const optionalComponents = buildComponents.slice(7); // HDD, Cooling, Peripherals

  // Sort categories: PC components first, then VGA, Monitor, and others
  const getSortedCategories = () => {
    const categoryOrder = {
      'Linh Kiện Máy Tính': 1,
      'VGA - Card Đồ Họa': 2,
      'Màn Hình Máy Tính': 3,
      'Chuột - Phím - Tai Nghe': 4,
      'Phụ Kiện - Cáp - Hub -Usb': 5,
      'Bàn - Ghế - Setup': 6,
      'Thiết Bị Mạng - Thiết Bị Hội Nghị': 7,
    };
    
    const sorted = [...filteredCategories].sort((a, b) => {
      const orderA = categoryOrder[a.categoryName as keyof typeof categoryOrder] || 999;
      const orderB = categoryOrder[b.categoryName as keyof typeof categoryOrder] || 999;
      return orderA - orderB;
    });
    
    console.log('Sorted categories:', sorted.map(c => ({ id: c.id, name: c.categoryName })));
    return sorted;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PCBuilderPageHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PC Builder Categories */}
        <div className="lg:col-span-2">
          <CategoriesList
            categories={getSortedCategories()}
            getCategorySubCategories={getCategorySubCategories}
            onSubCategorySelect={handleSubCategorySelect}
            getSelectedProduct={getSelectedProduct}
            isSubCategoryDisabled={isSubCategoryDisabled}
            removeProduct={removeProduct}
          />
        </div>

        {/* Build Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <BuildSummaryCard
              components={buildComponents}
              totalPrice={getTotalPrice()}
              selectedCount={getSelectedProductsCount()}
              isAuthenticated={isAuthenticated}
              onAddAllToCart={handleAddAllToCart}
            />
          </div>
        </div>
      </div>

      {/* Product Selection Dialog */}
      <ComponentSelectionDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        component={selectedComponent}
        products={filteredProducts}
        categories={categories}
        subCategories={subCategories}
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
        onSelectProduct={selectProduct}
        checkCompatibility={checkCompatibility}
      />
      </div>
    </div>
  );
}