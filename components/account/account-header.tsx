"use client";

import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface AccountHeaderProps {
  user: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
}

export function AccountHeader({ user, onLogout }: AccountHeaderProps) {
  return (
    <div className="bg-white/80 rounded-2xl shadow-lg border border-primary/10 p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-lg">{user.name}</p>
            <p className="text-sm text-slate-600">{user.email}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={onLogout}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 rounded-xl px-4 py-2"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
