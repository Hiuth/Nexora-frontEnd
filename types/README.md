# Auth Types Documentation

## Tổ chức file types

### 📁 Cấu trúc thư mục

```
types/
├── README.md            # Documentation
└── auth/                # Auth types folder
    ├── index.ts         # Export auth types
    ├── requests.ts      # Auth request types
    ├── responses.ts     # Auth response types
    └── README.md        # Auth documentation
```

### 🔐 Auth Request Types

File: `types/auth/requests.ts`

- `LoginRequest` - Đăng nhập
- `SignUpRequest` - Đăng ký
- `ResetPasswordRequest` - Đổi mật khẩu
- `SendOTPRequest` - Gửi OTP
- `VerifyOTPRequest` - Xác thực OTP
- `RefreshTokenRequest` - Refresh token

### 📨 Auth Response Types

File: `types/auth/responses.ts`

- `LoginResponse` - Phản hồi đăng nhập
- `SignUpResponse` - Phản hồi đăng ký
- `SendOTPResponse` - Phản hồi gửi OTP
- `VerifyOTPResponse` - Phản hồi xác thực OTP
- `ResetPasswordResponse` - Phản hồi đổi mật khẩu
- `LogoutResponse` - Phản hồi đăng xuất
- `RefreshTokenResponse` - Phản hồi refresh token

### 📖 Cách sử dụng

```typescript
// Import từ thư mục auth (khuyến khích)
import { LoginRequest, LoginResponse } from "@/types/auth";

// Hoặc import từ file cụ thể
import { LoginRequest } from "@/types/auth/requests";
import { LoginResponse } from "@/types/auth/responses";
```

### ✅ Thay đổi validation

- **Mật khẩu**: Giảm từ 6 ký tự xuống 5 ký tự
- **Áp dụng cho**: Login form và Sign up form
