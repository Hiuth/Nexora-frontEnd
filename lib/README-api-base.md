# API Base Documentation

## Mô tả

File này cung cấp các hàm utility để gọi API một cách nhất quán và xử lý authentication tự động.

## 🔧 Tính năng

### ✅ Authentication tự động

- Tự động thêm Bearer token vào header
- Tự động refresh token khi hết hạn
- Xử lý 401 errors và retry với token mới

### ✅ Error handling

- Parse error messages từ response
- Log chi tiết lỗi để debug
- Throw meaningful error messages

### ✅ Content-Type tự động

- Tự động set Content-Type cho JSON
- Tự động để browser set Content-Type cho FormData

### ✅ Public endpoints

- Tự động detect public endpoints (login, register, refresh)
- Không require authentication cho các endpoints này

## 📋 Functions

### `apiCall<T>(endpoint, options)`

Hàm chính để gọi API với xử lý authentication và error handling.

### `apiGet<T>(endpoint, params?)`

GET request với query parameters.

### `apiPost<T>(endpoint, data?)`

POST request với JSON data.

### `apiPostFormData<T>(endpoint, formData)`

POST request với FormData.

### `apiPut<T>(endpoint, data?)`

PUT request với JSON data.

### `apiPutFormData<T>(endpoint, formData)`

PUT request với FormData.

### `apiDelete<T>(endpoint)`

DELETE request.

## 🔐 Authentication

### Public endpoints (không cần token):

- `/Auth/login`
- `/Auth/refresh`
- `/Account/create`

### Protected endpoints:

- Tất cả endpoints khác require authentication
- Tự động thêm Bearer token
- Tự động refresh token nếu cần

## 💡 Sử dụng

```typescript
import { apiPost, apiGet, apiPostFormData } from "@/lib/api-base";

// GET request
const users = await apiGet<User[]>("/users");

// POST with JSON
const newUser = await apiPost<User>("/users", userData);

// POST with FormData
const formData = new FormData();
formData.append("email", "test@example.com");
const result = await apiPostFormData<LoginResponse>("/Auth/login", formData);
```
