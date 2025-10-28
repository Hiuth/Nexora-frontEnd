"use client";

import { useState, useEffect } from "react";
import { WarrantyRecord } from "@/lib/types";
import { WarrantyService } from "@/services/warranty.service";

export function useWarrantyCheck() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkWarranty = async (
    identifier: string
  ): Promise<WarrantyRecord | null> => {
    try {
      setLoading(true);
      setError(null);
      const warranty = await WarrantyService.checkWarranty(identifier);
      return warranty;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to check warranty";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { checkWarranty, loading, error };
}

export function useWarrantyRecords(accountId: string) {
  const [warranties, setWarranties] = useState<WarrantyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWarranties = async () => {
      if (!accountId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await WarrantyService.getWarrantyRecords(accountId);
        setWarranties(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch warranty records"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWarranties();
  }, [accountId]);

  return { warranties, loading, error };
}

export function useRegisterWarranty() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerWarranty = async (warrantyData: {
    productId: string;
    orderId: string;
    serialNumber?: string;
    imei?: string;
    warrantyPeriod: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const warranty = await WarrantyService.registerWarranty(warrantyData);
      return warranty;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to register warranty";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { registerWarranty, loading, error };
}
