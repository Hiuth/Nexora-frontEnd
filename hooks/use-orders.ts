"use client";

import { useState, useEffect } from "react";
import { Order, OrderDetail } from "@/lib/types";
import { OrderService } from "@/services/order.service";

export function useOrders(accountId: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!accountId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await OrderService.getOrdersByAccountId(accountId);
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accountId]);

  const refetch = async () => {
    if (!accountId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await OrderService.getOrdersByAccountId(accountId);
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refetch };
}

export function useOrder(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await OrderService.getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, loading, error };
}

export function useOrderDetails(orderId: string) {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await OrderService.getOrderDetails(orderId);
        setOrderDetails(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch order details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return { orderDetails, loading, error };
}

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (orderData: {
    accountId: string;
    items: { productId: string; quantity: number; price: number }[];
    customerInfo: {
      customerName: string;
      phoneNumber: string;
      address: string;
    };
  }) => {
    try {
      setLoading(true);
      setError(null);
      const order = await OrderService.createOrder(orderData);
      return order;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create order";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
}
