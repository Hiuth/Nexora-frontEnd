"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "@/services/auth.service";
import { accountService } from "@/services/account.service";
import { AuthManager } from "@/lib/auth-manager";

interface User {
  userId: string;
  email: string;
  userName?: string;
  avatar?: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);

    if (authenticated) {
      const currentUser = authService.getCurrentUser(); // từ token
      const storedUserName = AuthManager.getUserName(); // từ localStorage
      const storedAvatar = AuthManager.getUserAvatar(); // từ localStorage

      // Nếu không có userName hoặc avatar trong localStorage, lấy từ API
      if (!storedUserName || !storedAvatar) {
        try {
          const accountData = await accountService.getAccountById();
          if (accountData) {
            // Cập nhật localStorage với thông tin mới
            if (accountData.userName) {
              AuthManager.setUserName(accountData.userName);
            }
            if (accountData.accountImg) {
              AuthManager.setUserAvatar(accountData.accountImg);
            }

            setUser({
              userId: currentUser?.userId || "",
              email: currentUser?.email || "",
              userName: accountData.userName || currentUser?.email || "",
              avatar: accountData.accountImg || "",
              role: currentUser?.role || "USER",
            });
            return;
          }
        } catch (error) {
          console.error("Error fetching account data:", error);
          // Fallback to stored/token data if API fails
        }
      }

      // Sử dụng dữ liệu từ localStorage hoặc token
      setUser({
        userId: currentUser?.userId || "",
        email: currentUser?.email || "",
        userName: storedUserName || currentUser?.email || "",
        avatar: storedAvatar || "",
        role: currentUser?.role || "USER",
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Initial auth check
    const initAuth = async () => {
      await refreshAuth();
      setLoading(false);
    };
    initAuth();

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "accessToken" ||
        e.key === "userName" ||
        e.key === "userAvatar"
      ) {
        refreshAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Periodic auth check
    const interval = setInterval(() => {
      refreshAuth();
    }, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await authService.login(email, password);
      await refreshAuth();
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Force clear state even if API call fails
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Hook for protected routes
export function useRequireAuth() {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login page
      window.location.href = "/login";
    }
  }, [isAuthenticated, loading]);

  return { isAuthenticated, loading };
}
