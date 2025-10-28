"use client";

import { useState, useRef, useEffect } from "react";

export function useCategoryMenu() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredCategory(null);
    }, 200);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  };

  return {
    hoveredCategory,
    isOpen,
    setHoveredCategory,
    handleMouseEnter,
    handleMouseLeave,
  };
}
