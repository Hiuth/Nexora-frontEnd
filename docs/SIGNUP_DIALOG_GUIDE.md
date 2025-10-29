# 🚀 Hướng Dẫn Sử Dụng Dialog Đăng Ký

## Xem Demo Nhanh

Truy cập: `http://localhost:3000/signup-demo`

## Cách Sử Dụng

### 1. Import Component

```tsx
import { SignUpDialog } from "@/components/auth";
```

### 2. Sử dụng trong Component

#### Cách 1: Sử dụng trigger mặc định

```tsx
<SignUpDialog />
```

#### Cách 2: Custom trigger button

```tsx
<SignUpDialog trigger={<button>Tạo tài khoản mới</button>} />
```

#### Cách 3: Trigger từ bất kỳ element nào

```tsx
<SignUpDialog trigger={<div className="custom-trigger">Đăng ký ngay</div>} />
```

## Các Component Riêng Biệt

### PhoneNumberInput

```tsx
import { PhoneNumberInput } from "@/components/auth";

function MyForm() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneNumberInput value={phone} onChange={setPhone} error={errors.phone} />
  );
}
```

**Tính năng:**

- ✅ Chỉ cho phép nhập số
- ✅ Tự động giới hạn 10 chữ số
- ✅ Hiển thị counter (x/10)
- ✅ Validation real-time
- ✅ Visual feedback (green/red border)

### EmailOTPInput

```tsx
import { EmailOTPInput } from "@/components/auth";

function MyForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <EmailOTPInput
      email={email}
      otp={otp}
      onEmailChange={setEmail}
      onOtpChange={setOtp}
      emailError={errors.email}
      otpError={errors.otp}
    />
  );
}
```

**Tính năng:**

- ✅ Email validation
- ✅ Nút "Gửi OTP" tích hợp sẵn
- ✅ Countdown 60 giây
- ✅ Disable OTP input cho đến khi gửi OTP
- ✅ Loading state khi gửi
- ✅ Toast notification

## Kết Nối API

### Bước 1: Cấu hình Environment

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://your-backend-api.com/api
```

### Bước 2: Cập nhật Auth Service

File: `services/auth.service.ts`

Tìm và thay thế các comment `// TODO:` bằng code thực tế:

```tsx
// Ví dụ: Gửi OTP
async sendOTP(email: string): Promise<SendOTPResponse> {
  try {
    const response = await fetch(`${this.baseURL}/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Gửi OTP thất bại");
    }

    return await response.json();
  } catch (error) {
    console.error("SendOTP Error:", error);
    throw error;
  }
}
```

### Bước 3: Cập nhật Components

#### EmailOTPInput Component

File: `components/auth/email-otp-input.tsx`

Tìm dòng:

```tsx
// TODO: Gọi API gửi OTP tại đây
// await authService.sendOTP(email);
```

Thay thế bằng:

```tsx
import { authService } from "@/services/auth.service";

// Trong handleSendOTP function:
await authService.sendOTP(email);
```

#### SignUpDialog Component

File: `components/auth/sign-up-dialog.tsx`

Tìm dòng:

```tsx
// TODO: Gọi API đăng ký tại đây
```

Thay thế bằng:

```tsx
import { authService } from "@/services/auth.service";

// Trong handleSubmit function:
const response = await authService.signUp({
  userName: formData.userName,
  password: formData.password,
  gender: formData.gender,
  email: formData.email,
  phoneNumber: formData.phoneNumber,
  address: formData.address,
  otp: formData.otp,
});

if (response.success) {
  // Xử lý thành công
  toast({
    title: "Đăng ký thành công! 🎉",
    description: response.message,
  });

  setOpen(false);
  // Redirect hoặc refresh
}
```

## API Endpoints Cần Thiết

Backend của bạn cần implement các endpoints sau:

### 1. Gửi OTP

```
POST /api/auth/send-otp
Body: { email: string }
Response: { success: boolean, message: string, expiresIn: number }
```

### 2. Xác thực OTP (Optional)

```
POST /api/auth/verify-otp
Body: { email: string, otp: string }
Response: { success: boolean, message: string, isValid: boolean }
```

### 3. Đăng ký

```
POST /api/auth/signup
Body: {
  userName: string,
  password: string,
  gender: string,
  email: string,
  phoneNumber: string,
  address: string,
  otp: string
}
Response: {
  success: boolean,
  message: string,
  data: { userId: string, userName: string, email: string }
}
```

## Error Handling

Xử lý các lỗi phổ biến:

```tsx
try {
  await authService.signUp(data);
} catch (error: any) {
  // Email đã tồn tại
  if (error.code === "EMAIL_EXISTS") {
    setErrors({ email: "Email đã được đăng ký" });
  }

  // Username đã tồn tại
  if (error.code === "USERNAME_EXISTS") {
    setErrors({ userName: "Tên đăng nhập đã được sử dụng" });
  }

  // OTP không hợp lệ
  if (error.code === "INVALID_OTP") {
    setErrors({ otp: "Mã OTP không chính xác" });
  }

  // OTP hết hạn
  if (error.code === "OTP_EXPIRED") {
    setErrors({ otp: "Mã OTP đã hết hạn" });
  }

  // Lỗi chung
  toast({
    title: "Đăng ký thất bại",
    description: error.message || "Vui lòng thử lại sau",
    variant: "destructive",
  });
}
```

## Customization

### Thay đổi màu sắc

File: `components/auth/sign-up-dialog.tsx`

```tsx
// Gradient header
className = "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500";

// Thay đổi thành:
className = "bg-gradient-to-br from-green-600 via-teal-600 to-blue-500";
```

### Thay đổi validation rules

```tsx
// Password tối thiểu 8 ký tự thay vì 6
if (formData.password.length < 8) {
  newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
}

// Username tối thiểu 5 ký tự thay vì 3
if (formData.userName.length < 5) {
  newErrors.userName = "Tên đăng nhập phải có ít nhất 5 ký tự";
}
```

### Thay đổi thời gian countdown OTP

File: `components/auth/email-otp-input.tsx`

```tsx
// Thay đổi từ 60s sang 120s
setCountdown(120); // Dòng này
```

## Testing

### Test Validation

1. Mở dialog
2. Bỏ trống các trường → Xem thông báo lỗi
3. Nhập email sai format → Xem validation
4. Nhập số điện thoại < 10 số → Xem validation
5. Password không khớp → Xem thông báo

### Test OTP Flow

1. Nhập email hợp lệ
2. Click "Gửi OTP"
3. Xem countdown 60s
4. Trong thời gian countdown, nút "Gửi OTP" bị disable
5. Input OTP được enable sau khi gửi thành công

### Test Submit

1. Điền đầy đủ thông tin hợp lệ
2. Click "Tạo tài khoản"
3. Xem loading state
4. Xem toast notification

## Troubleshooting

### Dialog không mở?

- Kiểm tra import: `import { SignUpDialog } from "@/components/auth"`
- Kiểm tra Dialog component đã được install: `components/ui/dialog.tsx`

### OTP không gửi được?

- Kiểm tra toast hook: `import { useToast } from "@/hooks/use-toast"`
- Kiểm tra email validation
- Xem console log để debug

### Validation không hoạt động?

- Kiểm tra state updates
- Xem errors object trong console
- Verify validation rules

### Số điện thoại nhập được chữ?

- Component đã có logic `replace(/\D/g, "")` để loại bỏ ký tự không phải số
- Kiểm tra version component có đúng không

## Support

Nếu cần hỗ trợ thêm, check:

- README.md trong `components/auth/`
- Comments trong code
- TypeScript types cho các props

## Changelog

**v1.0.0** - Initial Release

- ✅ SignUpDialog với full validation
- ✅ PhoneNumberInput component
- ✅ EmailOTPInput component
- ✅ Auth Service với TODO markers
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
