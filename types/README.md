# Types Documentation# Auth Types Documentation

## 📁 Cấu trúc Types mới## Tổ chức file types

### 🎯 **Tổ chức file types:**### 📁 Cấu trúc thư mục

````

types/types/

├── README.md        # Documentation này├── README.md            # Documentation

├── index.ts         # Export tất cả types└── auth/                # Auth types folder

├── requests.ts      # Request types cho API calls    ├── index.ts         # Export auth types

└── api.ts           # Response types và API wrappers    ├── requests.ts      # Auth request types

    ├── responses.ts     # Auth response types

lib/    └── README.md        # Auth documentation

└── types.ts         # Entity types cho internal data models```

```

### 🔐 Auth Request Types

## 🔄 **Separation of Concerns:**

File: `types/auth/requests.ts`

### 📤 **Request Types** (`types/requests.ts`)

- Chứa tất cả interface cho API requests- `LoginRequest` - Đăng nhập

- Được sử dụng khi gọi API- `SignUpRequest` - Đăng ký

- Ví dụ: `LoginRequest`, `CreateProductRequest`, `UpdateOrderRequest`- `ResetPasswordRequest` - Đổi mật khẩu

- `SendOTPRequest` - Gửi OTP

### 📥 **Response Types** (`types/api.ts`) - `VerifyOTPRequest` - Xác thực OTP

- Chứa tất cả interface cho API responses- `RefreshTokenRequest` - Refresh token

- Chứa wrapper types như `ApiResponse<T>`, `PaginatedResponse<T>`

- Ví dụ: `CategoryResponse`, `ProductResponse`, `LoginResponse`### 📨 Auth Response Types



### 🗄️ **Entity Types** (`lib/types.ts`)File: `types/auth/responses.ts`

- Chứa data models cho internal app usage

- Được map từ API responses- `LoginResponse` - Phản hồi đăng nhập

- Là "single source of truth" cho app data structures- `SignUpResponse` - Phản hồi đăng ký

- Ví dụ: `Category`, `Product`, `Account`- `SendOTPResponse` - Phản hồi gửi OTP

- `VerifyOTPResponse` - Phản hồi xác thực OTP

## 🎭 **Usage Flow:**- `ResetPasswordResponse` - Phản hồi đổi mật khẩu

- `LogoutResponse` - Phản hồi đăng xuất

```typescript- `RefreshTokenResponse` - Phản hồi refresh token

// 1. Import request type

import { CreateProductRequest } from "@/types/requests";### 📖 Cách sử dụng



// 2. Import response type```typescript

import { ProductResponse } from "@/types/api";// Import từ thư mục auth (khuyến khích)

import { LoginRequest, LoginResponse } from "@/types/auth";

// 3. Import entity type

import { Product } from "@/lib/types";// Hoặc import từ file cụ thể

import { LoginRequest } from "@/types/auth/requests";

// 4. API call flowimport { LoginResponse } from "@/types/auth/responses";

const request: CreateProductRequest = { ... };```

const response: ApiResponse<ProductResponse> = await api.createProduct(request);

const product: Product = mapToEntity(response.result);### ✅ Thay đổi validation

```

- **Mật khẩu**: Giảm từ 6 ký tự xuống 5 ký tự

## ✨ **Benefits:**- **Áp dụng cho**: Login form và Sign up form


- 🎯 **Clear separation** giữa API contracts và business logic
- 🔄 **Type safety** ở mọi layer
- 🧹 **Clean architecture** dễ maintain
- 📚 **Scalable** cho team lớn
- 🔧 **Easy refactoring** khi API thay đổi
````
