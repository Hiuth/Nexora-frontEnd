"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { ProductService } from "@/services/product.service";
import { CategoryService } from "@/services/category.service";
import { SubCategoryService } from "@/services/subcategory.service";
import { CartService } from "@/services/cart.service";
import { Product, Category, SubCategory } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export interface BuildComponent {
  id: number;
  name: string;
  icon: React.ReactNode;
  categoryId: string;
  subCategoryId?: string;
  product: Product | null;
  quantity: number;
}

export function usePCBuilder() {
  const [buildComponents, setBuildComponents] = useState<BuildComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<BuildComponent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Product selection state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  // Load products when component is selected
  useEffect(() => {
    if (selectedComponent) {
      loadProductsForComponent(selectedComponent);
    }
  }, [selectedComponent]);

  // Process products when they change
  useEffect(() => {
    filterAndSortProducts();
  }, [products]);

  const loadCategories = async () => {
    try {
      const categoriesData = await CategoryService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const loadSubCategories = async () => {
    try {
      const subCategoriesData = await SubCategoryService.getAllSubCategories();
      setSubCategories(subCategoriesData);
    } catch (error) {
      console.error("Failed to load subcategories:", error);
    }
  };

  const loadProductsForComponent = async (component: BuildComponent) => {
    setIsLoading(true);
    console.log("🔍 Loading products for component:", component.name);
    console.log("📋 Component details:", {
      categoryId: component.categoryId,
      subCategoryId: component.subCategoryId
    });
    
    try {
      let productsData: Product[] = [];

      if (component.subCategoryId) {
        console.log("🎯 Loading products by subcategory:", component.subCategoryId);
        productsData = await ProductService.getProducts({
          subcategory: component.subCategoryId,
          page: 1,
          pageSize: 100
        });
        console.log("✅ Subcategory products loaded:", productsData.length, "items");
      } else if (component.categoryId) {
        console.log("🎯 Loading products by category:", component.categoryId);
        productsData = await ProductService.getProducts({
          category: component.categoryId,
          page: 1,
          pageSize: 100
        });
        console.log("✅ Category products loaded:", productsData.length, "items");
      }

      // Don't fallback to all products - if no products found, keep empty array
      console.log("📦 Final products loaded:", productsData.length, "items");
      setProducts(productsData);
    } catch (error) {
      console.error("❌ Failed to load products:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách sản phẩm",
        variant: "destructive",
      });
      // Set empty array instead of trying fallbacks
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];
    console.log("🔄 Processing products:", {
      totalProducts: products.length
    });

    // Sort products by name (A-Z)
    filtered.sort((a, b) => a.productName.localeCompare(b.productName));

    console.log("✅ Processed result:", filtered.length, "products");
    setFilteredProducts(filtered);
  };

  const openComponentDialog = (component: BuildComponent) => {
    console.log("🔍 Opening component dialog for:", component.name);
    console.log("📝 Component config:", {
      categoryId: component.categoryId,
      subCategoryId: component.subCategoryId,
      name: component.name
    });
    
    setSelectedComponent(component);
    setIsDialogOpen(true);
    
    // Debug: Check if products are already available
    console.log("📦 Current products state:", {
      productsLength: products.length,
      filteredProductsLength: filteredProducts.length
    });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedComponent(null);
    setProducts([]);
    setFilteredProducts([]);
  };

  const selectProduct = (product: Product) => {
    if (!selectedComponent) return;

    // Check compatibility for CPU and Mainboard
    const isCompatible = checkCompatibility(product, selectedComponent);
    if (!isCompatible) {
      toast({
        title: "Không tương thích",
        description: "Sản phẩm này không tương thích với linh kiện đã chọn",
        variant: "destructive",
      });
      return;
    }

    // Remove any existing component with same subcategoryId
    setBuildComponents(prev => 
      prev.filter(comp => comp.subCategoryId !== selectedComponent.subCategoryId)
    );

    // Add new component
    setBuildComponents(prev => [
      ...prev,
      { ...selectedComponent, product, quantity: 1 }
    ]);

    closeDialog();
  };

  // Check compatibility between products
  const checkCompatibility = (newProduct: Product, component: BuildComponent): boolean => {
    // Get current CPU and Mainboard by checking component names
    const currentCPU = buildComponents.find(comp => 
      comp.name?.toLowerCase().includes('cpu') || 
      comp.name?.toLowerCase().includes('vi xử lý')
    )?.product;
    
    const currentMainboard = buildComponents.find(comp => 
      comp.name?.toLowerCase().includes('mainboard') || 
      comp.name?.toLowerCase().includes('bo mạch chủ') ||
      comp.name?.toLowerCase().includes('bo mach')
    )?.product;

    // Check if the new product is CPU
    const isNewProductCPU = newProduct.productName.toLowerCase().includes('cpu') ||
                           newProduct.productName.toLowerCase().includes('vi xử lý') ||
                           component.name?.toLowerCase().includes('cpu') ||
                           component.name?.toLowerCase().includes('vi xử lý');
    
    // Check if the new product is Mainboard
    const isNewProductMainboard = newProduct.productName.toLowerCase().includes('mainboard') ||
                                 newProduct.productName.toLowerCase().includes('bo mạch chủ') ||
                                 component.name?.toLowerCase().includes('mainboard') ||
                                 component.name?.toLowerCase().includes('bo mạch chủ') ||
                                 component.name?.toLowerCase().includes('bo mach');

    // If selecting CPU, check against current Mainboard
    if (isNewProductCPU && currentMainboard) {
      return isCPUMainboardCompatible(newProduct, currentMainboard);
    }
    
    // If selecting Mainboard, check against current CPU
    if (isNewProductMainboard && currentCPU) {
      return isCPUMainboardCompatible(currentCPU, newProduct);
    }

    return true; // No conflicts for other components
  };

  // Check if CPU and Mainboard are compatible
  const isCPUMainboardCompatible = (cpu: Product, mainboard: Product): boolean => {
    const cpuName = cpu.productName.toLowerCase();
    const mainboardName = mainboard.productName.toLowerCase();

    // Detect CPU brand
    const isIntelCPU = cpuName.includes('intel') || cpuName.includes('i3') || cpuName.includes('i5') || cpuName.includes('i7') || cpuName.includes('i9');
    const isAmdCPU = cpuName.includes('amd') || cpuName.includes('ryzen') || cpuName.includes('threadripper');

    // Detect Mainboard chipset/brand
    const isIntelMainboard = mainboardName.includes('intel') || mainboardName.includes('z690') || mainboardName.includes('z790') || mainboardName.includes('b660') || mainboardName.includes('b760') || mainboardName.includes('h610') || mainboardName.includes('h670');
    const isAmdMainboard = mainboardName.includes('amd') || mainboardName.includes('x570') || mainboardName.includes('b550') || mainboardName.includes('a520') || mainboardName.includes('x670') || mainboardName.includes('b650');

    // Intel CPU with AMD Mainboard - incompatible
    if (isIntelCPU && isAmdMainboard) {
      return false;
    }

    // AMD CPU with Intel Mainboard - incompatible  
    if (isAmdCPU && isIntelMainboard) {
      return false;
    }

    return true; // Compatible or no brand info available
  };

  // Check if a subcategory should be disabled due to compatibility
  const isSubCategoryDisabled = (subCategory: SubCategory): boolean => {
    const currentCPU = buildComponents.find(comp => 
      comp.name?.toLowerCase().includes('cpu')
    )?.product;
    
    if (!currentCPU) return false; // No CPU selected, allow all
    
    const subCategoryName = subCategory.subCategoryName.toLowerCase();
    const isMainboardSubCategory = subCategoryName.includes('mainboard') || 
                                  subCategoryName.includes('bo mạch') ||
                                  subCategoryName.includes('main') ||
                                  subCategoryName.includes('mb');
    
    if (!isMainboardSubCategory) return false; // Not mainboard, allow
    
    // Check CPU brand
    const cpuName = currentCPU.productName.toLowerCase();
    const isIntelCPU = cpuName.includes('intel') || cpuName.includes('i3') || cpuName.includes('i5') || cpuName.includes('i7') || cpuName.includes('i9');
    const isAmdCPU = cpuName.includes('amd') || cpuName.includes('ryzen');
    
    // Check subcategory brand
    const isIntelMainboard = subCategoryName.includes('intel') || subCategoryName.includes('z690') || subCategoryName.includes('z790') || subCategoryName.includes('b660') || subCategoryName.includes('b760');
    const isAmdMainboard = subCategoryName.includes('amd') || subCategoryName.includes('x570') || subCategoryName.includes('b550') || subCategoryName.includes('x670') || subCategoryName.includes('b650');
    
    // Disable incompatible combinations
    if (isIntelCPU && isAmdMainboard) return true;
    if (isAmdCPU && isIntelMainboard) return true;
    
    return false;
  };

  const removeProduct = (subCategoryId: string) => {
    setBuildComponents(prev => 
      prev.filter(comp => comp.subCategoryId !== subCategoryId)
    );
  };

  const updateQuantity = (componentId: number, quantity: number) => {
    setBuildComponents(prev => 
      prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, quantity: Math.max(1, quantity) }
          : comp
      )
    );
  };

  const addToCart = async (product: Product) => {
    if (!isAuthenticated) {
      toast({
        title: "Cần đăng nhập",
        description: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
      return;
    }

    try {
      // Gọi API thêm vào giỏ hàng
      await CartService.addToCart(product.id, 1);
      
      // Thêm vào local cart context
      await addItem(product, 1);
      
      toast({
        title: "Đã thêm vào giỏ hàng",
        description: `${product.productName} đã được thêm vào giỏ hàng`,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
    }
  };

  const getTotalPrice = () => {
    return buildComponents.reduce((total, comp) => {
      if (comp.product) {
        return total + (comp.product.price * comp.quantity);
      }
      return total;
    }, 0);
  };

  const getSelectedProductsCount = () => {
    return buildComponents.filter(comp => comp.product !== null).length;
  };

  return {
    // State
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
  };
}