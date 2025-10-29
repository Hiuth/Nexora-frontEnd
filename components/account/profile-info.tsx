"use client";

import { Button } from "@/components/ui/button";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileInfoProps {
  user: UserProfile;
  onEdit?: () => void;
}

export function ProfileInfo({ user, onEdit }: ProfileInfoProps) {
  const profileFields = [
    {
      label: "Họ và tên",
      value: user.name,
      key: "name",
    },
    {
      label: "Email",
      value: user.email,
      key: "email",
    },
    {
      label: "Số điện thoại",
      value: user.phone,
      key: "phone",
    },
    {
      label: "Địa chỉ",
      value: user.address,
      key: "address",
    },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10">
      <div className="p-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-8">
          Thông tin cá nhân
        </h3>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {profileFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-medium text-slate-600 block">
                  {field.label}
                </label>
                <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/50">
                  <p className="font-medium text-slate-800">{field.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Button
              onClick={onEdit}
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
