import { useState, useCallback } from "react";
import { WarrantyService } from "@/services/warranty.service";
import { useToast } from "@/hooks/use-toast";
import type { WarrantyRecordResponse } from "@/types/api";

type SearchMode = "serial" | "imei" | "orderId" | "phoneNumber";

export function useWarrantySearch() {
  const { toast } = useToast();
  const [searchMode, setSearchMode] = useState<SearchMode>("serial");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [warranties, setWarranties] = useState<WarrantyRecordResponse[]>([]);

  const validateInput = useCallback((value: string, mode: SearchMode): boolean => {
    console.log("Validating input:", value, "for mode:", mode); // Debug log
    
    // Temporarily return true to bypass validation for testing
    if (value.trim().length >= 1) return true;
    
    switch (mode) {
      case "serial":
        return WarrantyService.validateSerialNumber(value);
      case "imei":
        return WarrantyService.validateImei(value);
      case "phoneNumber":
        return WarrantyService.validatePhoneNumber(value);
      case "orderId":
        return value.trim().length >= 3;
      default:
        return false;
    }
  }, []);

  const searchWarranty = useCallback(async (value?: string, mode?: SearchMode) => {
    console.log("searchWarranty called"); // Debug log
    const searchVal = value || searchValue;
    const searchMod = mode || searchMode;
    
    console.log("Search values:", { searchVal, searchMod }); // Debug log

    if (!searchVal.trim()) {
      console.log("Empty search value"); // Debug log
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập thông tin tra cứu",
        variant: "destructive"
      });
      return false;
    }

    if (!validateInput(searchVal, searchMod)) {
      console.log("Validation failed"); // Debug log
      toast({
        title: "Lỗi",
        description: `Định dạng thông tin tra cứu không hợp lệ`,
        variant: "destructive"
      });
      return false;
    }

    console.log("Starting API call..."); // Debug log
    setIsLoading(true);
    try {
      let result: WarrantyRecordResponse[] = [];

      // For testing - add a mock result to see if UI updates
      if (searchVal === "test") {
        result = [{
          id: "test-warranty-1",
          startDate: "2024-01-01T00:00:00.000Z",
          endDate: "2025-01-01T00:00:00.000Z", 
          status: "VALID",
          productId: "test-product-1",
          productName: "Test Product - PC Gaming",
          warrantyPeriod: 12,
          orderId: "test-order-1",
          productUnitId: "test-unit-1",
          serialNumber: "TEST123456",
          imei: undefined
        }];
        
        console.log("Using mock data:", result);
        setWarranties(result);
        
        toast({
          title: "Thành công (Mock)",
          description: `Tìm thấy ${result.length} thông tin bảo hành (test data)`,
        });
        
        return true;
      }

      switch (searchMod) {
        case "serial":
          const singleWarranty = await WarrantyService.getWarrantyRecordBySerialNumber(searchVal);
          result = [singleWarranty];
          break;
        case "imei":
          const imeiWarranty = await WarrantyService.getWarrantyRecordByImei(searchVal);
          result = [imeiWarranty];
          break;
        case "orderId":
          result = await WarrantyService.getWarrantyRecordsByOrderId(searchVal);
          break;
        case "phoneNumber":
          result = await WarrantyService.getWarrantyRecordsByPhoneNumber(searchVal);
          break;
      }

      setWarranties(result);

      if (result.length === 0) {
        toast({
          title: "Không tìm thấy",
          description: "Không tìm thấy thông tin bảo hành với thông tin đã nhập",
        });
      } else {
        toast({
          title: "Thành công",
          description: `Tìm thấy ${result.length} thông tin bảo hành`,
        });
      }

      return true;
    } catch (error: any) {
      console.error("Warranty search error:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tra cứu thông tin bảo hành. Vui lòng thử lại.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [searchValue, searchMode, validateInput, toast]);

  const clearResults = useCallback(() => {
    setWarranties([]);
    setSearchValue("");
  }, []);

  const resetSearch = useCallback(() => {
    setSearchMode("serial");
    setSearchValue("");
    setWarranties([]);
    setIsLoading(false);
  }, []);

  return {
    // State
    searchMode,
    searchValue,
    isLoading,
    warranties,
    
    // Actions
    setSearchMode,
    setSearchValue,
    searchWarranty,
    clearResults,
    resetSearch,
    
    // Utilities
    validateInput,
  };
}