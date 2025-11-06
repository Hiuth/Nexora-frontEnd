# Auth Types

Thư mục này chứa tất cả các type definitions liên quan đến authentication.

## 📝 Files

- **`requests.ts`** - Các interface cho request data (gửi đến server)
- **`responses.ts`** - Các interface cho response data (nhận từ server)
- **`index.ts`** - Export tất cả auth types

## 🔄 Import/Export

```typescript
// Import tất cả auth types
import { LoginRequest, LoginResponse } from "@/types/auth";

// Import cụ thể từ file con
import { LoginRequest } from "@/types/auth/requests";
import { LoginResponse } from "@/types/auth/responses";
```

## 📋 Request Types

- `LoginRequest` - Đăng nhập
- `SignUpRequest` - Đăng ký tài khoản
- `ResetPasswordRequest` - Đổi mật khẩu
- `SendOTPRequest` - Gửi mã OTP
- `VerifyOTPRequest` - Xác thực OTP
- `RefreshTokenRequest` - Refresh access token

## 📨 Response Types

- `LoginResponse` - Kết quả đăng nhập
- `SignUpResponse` - Kết quả đăng ký
- `SendOTPResponse` - Kết quả gửi OTP
- `VerifyOTPResponse` - Kết quả xác thực OTP
- `ResetPasswordResponse` - Kết quả đổi mật khẩu
- `LogoutResponse` - Kết quả đăng xuất
- `RefreshTokenResponse` - Kết quả refresh token
