# Authentication Components

## Tổng quan

Hệ thống components để xử lý đăng ký và xác thực người dùng.

## Components

### 1. PhoneNumberInput

Component riêng cho nhập số điện thoại.

**Features:**

- ✅ Chỉ cho phép nhập số
- ✅ Tự động giới hạn 10 chữ số
- ✅ Hiển thị counter (x/10)
- ✅ Validation real-time
- ✅ Visual feedback (green/red border)

**Props:**

```tsx
interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
```

**Usage:**

```tsx
import { PhoneNumberInput } from "@/components/auth";

<PhoneNumberInput
  value={phoneNumber}
  onChange={setPhoneNumber}
  error={errors.phoneNumber}
/>;
```

### 2. EmailOTPInput

Component kết hợp email và OTP input.

**Features:**

- ✅ Email validation
- ✅ Nút gửi OTP tích hợp
- ✅ Countdown timer (60s)
- ✅ Disable OTP input cho đến khi gửi OTP thành công
- ✅ Visual feedback cho từng trạng thái

**Props:**

```tsx
interface EmailOTPInputProps {
  email: string;
  otp: string;
  onEmailChange: (value: string) => void;
  onOtpChange: (value: string) => void;
  emailError?: string;
  otpError?: string;
}
```

**Usage:**

```tsx
import { EmailOTPInput } from "@/components/auth";

<EmailOTPInput
  email={email}
  otp={otp}
  onEmailChange={setEmail}
  onOtpChange={setOtp}
  emailError={errors.email}
  otpError={errors.otp}
/>;
```

## Trang Đăng Ký

**URL:** `/signup`

Trang đăng ký hoàn chỉnh sử dụng các components trên.

**Features:**

- Logo website ở header
- Form layout 2 cột responsive
- Validation real-time
- OTP flow qua email
- Gradient background đẹp mắt

## Auth Service

File `services/auth.service.ts` chứa các function để kết nối API:

**Available Methods:**

- `signUp(data)` - Đăng ký tài khoản mới
- `sendOTP(email)` - Gửi mã OTP đến email
- `verifyOTP(email, otp)` - Xác thực mã OTP
- `login(userName, password)` - Đăng nhập
- `logout()` - Đăng xuất
- `getCurrentUser()` - Lấy thông tin user hiện tại

**Cấu hình:**
Thêm biến môi trường vào file `.env.local`:

```
NEXT_PUBLIC_API_URL=http://your-api-url.com/api
```

**Usage:**

```tsx
import { authService } from "@/services/auth.service";

// Gửi OTP
await authService.sendOTP(email);

// Đăng ký
await authService.signUp({
  userName: "johndoe",
  password: "password123",
  gender: "male",
  email: "john@example.com",
  phoneNumber: "0987654321",
  address: "123 ABC Street",
  otp: "123456",
});
```

## Form Data Structure

```tsx
interface SignUpFormData {
  userName: string; // Tên đăng nhập (min 3 ký tự)
  password: string; // Mật khẩu (min 6 ký tự)
  confirmPassword: string; // Xác nhận mật khẩu
  gender: string; // Giới tính: "male" | "female" | "other"
  email: string; // Email hợp lệ
  phoneNumber: string; // Số điện thoại (10 chữ số)
  address: string; // Địa chỉ đầy đủ
  otp: string; // Mã OTP (6 chữ số)
}
```

## Validation Rules

1. **userName**: Bắt buộc, tối thiểu 3 ký tự
2. **password**: Bắt buộc, tối thiểu 6 ký tự
3. **confirmPassword**: Phải khớp với password
4. **gender**: Bắt buộc chọn
5. **email**: Bắt buộc, format email hợp lệ
6. **phoneNumber**: Bắt buộc, đúng 10 chữ số
7. **address**: Bắt buộc
8. **otp**: Bắt buộc, 6 chữ số

## TODO - Tích hợp API

### 1. Cập nhật auth.service.ts

Thay thế các comment `// TODO:` bằng code thực tế kết nối với backend API của bạn.

### 2. Cập nhật EmailOTPInput

Trong file `components/auth/email-otp-input.tsx`, tìm comment:

```tsx
// TODO: Gọi API gửi OTP tại đây
// await authService.sendOTP(email);
```

Bỏ comment và sử dụng authService thực tế.

### 3. Cập nhật SignUp Page

Trong file `app/signup/page.tsx`, tìm comment:

```tsx
// TODO: Gọi API đăng ký tại đây
```

Bỏ comment và gọi API đăng ký thực tế.

### 4. Thêm Error Handling

Xử lý các trường hợp lỗi từ API:

- Email đã tồn tại
- Username đã được sử dụng
- OTP không hợp lệ hoặc hết hạn
- Số điện thoại đã được đăng ký

Component riêng cho nhập số điện thoại.

**Features:**

- Chỉ cho phép nhập số
- Giới hạn 10 chữ số
- Validation real-time
- Hiển thị trạng thái (valid/invalid)
- Counter hiển thị số ký tự đã nhập

**Props:**

```tsx
interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
```

**Usage:**

```tsx
import { PhoneNumberInput } from "@/components/auth";

<PhoneNumberInput
  value={phoneNumber}
  onChange={setPhoneNumber}
  error={errors.phoneNumber}
/>;
```

### 3. EmailOTPInput

Component kết hợp email và OTP input.

**Features:**

- Email validation
- Nút gửi OTP tích hợp
- Countdown timer (60s)
- Disable OTP input cho đến khi gửi OTP thành công
- Visual feedback cho từng trạng thái

**Props:**

```tsx
interface EmailOTPInputProps {
  email: string;
  otp: string;
  onEmailChange: (value: string) => void;
  onOtpChange: (value: string) => void;
  emailError?: string;
  otpError?: string;
}
```

**Usage:**

```tsx
import { EmailOTPInput } from "@/components/auth";

<EmailOTPInput
  email={email}
  otp={otp}
  onEmailChange={setEmail}
  onOtpChange={setOtp}
  emailError={errors.email}
  otpError={errors.otp}
/>;
```

## Auth Service

File `services/auth.service.ts` chứa các function để kết nối API:

**Available Methods:**

- `signUp(data)` - Đăng ký tài khoản mới
- `sendOTP(email)` - Gửi mã OTP đến email
- `verifyOTP(email, otp)` - Xác thực mã OTP
- `login(userName, password)` - Đăng nhập
- `logout()` - Đăng xuất
- `getCurrentUser()` - Lấy thông tin user hiện tại

**Cấu hình:**
Thêm biến môi trường vào file `.env.local`:

```
NEXT_PUBLIC_API_URL=http://your-api-url.com/api
```

**Usage:**

```tsx
import { authService } from "@/services/auth.service";

// Gửi OTP
await authService.sendOTP(email);

// Đăng ký
await authService.signUp({
  userName: "johndoe",
  password: "123456",
  gender: "male",
  email: "john@example.com",
  phoneNumber: "0987654321",
  address: "123 ABC Street",
  otp: "123456",
});
```

## Form Data Structure

```tsx
interface SignUpFormData {
  userName: string; // Tên đăng nhập (min 3 ký tự)
  password: string; // Mật khẩu (min 6 ký tự)
  confirmPassword: string; // Xác nhận mật khẩu
  gender: string; // Giới tính: "male" | "female" | "other"
  email: string; // Email hợp lệ
  phoneNumber: string; // Số điện thoại (10 chữ số)
  address: string; // Địa chỉ đầy đủ
  otp: string; // Mã OTP (6 chữ số)
}
```

## Validation Rules

1. **userName**: Bắt buộc, tối thiểu 3 ký tự
2. **password**: Bắt buộc, tối thiểu 6 ký tự
3. **confirmPassword**: Phải khớp với password
4. **gender**: Bắt buộc chọn
5. **email**: Bắt buộc, format email hợp lệ
6. **phoneNumber**: Bắt buộc, đúng 10 chữ số
7. **address**: Bắt buộc
8. **otp**: Bắt buộc, 6 chữ số

## TODO - Tích hợp API

### 1. Cập nhật auth.service.ts

Thay thế các comment `// TODO:` bằng code thực tế kết nối với backend API của bạn.

### 2. Cập nhật EmailOTPInput

Trong file `components/auth/email-otp-input.tsx`, tìm comment:

```tsx
// TODO: Gọi API gửi OTP tại đây
// await authService.sendOTP(email);
```

Bỏ comment và sử dụng authService thực tế.

### 3. Cập nhật SignUpDialog

Trong file `components/auth/sign-up-dialog.tsx`, tìm comment:

```tsx
// TODO: Gọi API đăng ký tại đây
```

Bỏ comment và gọi API đăng ký thực tế.

### 4. Thêm Error Handling

Xử lý các trường hợp lỗi từ API:

- Email đã tồn tại
- Username đã được sử dụng
- OTP không hợp lệ hoặc hết hạn
- Số điện thoại đã được đăng ký

## Styling & Design

**Color Scheme:**

- Primary: Blue (from-blue-600 to-purple-600)
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Background gradient: blue → purple → pink

**Icons:**

- User, Lock, Phone, Mail, MapPin, Send, etc. (Lucide React)

**Responsive:**

- Desktop: 2 columns grid layout
- Mobile: 1 column stacked layout
- Max dialog width: 2xl (672px)

## Testing

Để test dialog, import và sử dụng trong bất kỳ component nào:

```tsx
import { SignUpDialog } from "@/components/auth";

export default function Page() {
  return (
    <div>
      <SignUpDialog />
    </div>
  );
}
```

## Next Steps

1. ✅ Components đã được tạo
2. ✅ Validation đã được implement
3. ✅ UI/UX đã được thiết kế
4. ⏳ Kết nối API backend
5. ⏳ Thêm chức năng đăng nhập
6. ⏳ Thêm forgot password
7. ⏳ Thêm social login (Google, Facebook)
