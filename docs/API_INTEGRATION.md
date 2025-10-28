# API Integration Guide - Complete System

## 🏗️ Cấu trúc API đã được chuẩn bị cho toàn hệ thống

### 1. Services Layer

- `services/category.service.ts` - Xử lý API calls cho categories
- Tự động fallback về mock data khi API không available
- Có thể bật/tắt API mode

### 2. API Client

- `lib/api-client.ts` - Generic HTTP client với error handling
- `config/api.config.ts` - Cấu hình API endpoints và timeout

### 3. Data Layer

- `data/menu-data.ts` - Static menu data (có thể chuyển sang API)
- Mock data vẫn được sử dụng cho development

### 4. Components Structure

```
components/
├── category-menu/
│   ├── category-menu-button.tsx
│   ├── category-sidebar.tsx
│   ├── menu-column.tsx
│   ├── menu-content.tsx
│   └── view-all-button.tsx
├── category-mega-menu.tsx (main component)
└── hooks/
    └── use-category-menu.ts
```

## Cách chuyển sang API

### Bước 1: Cập nhật .env

```env
NEXT_PUBLIC_API_URL=http://your-api-domain.com/api
```

### Bước 2: Bật API mode

```typescript
// Trong component hoặc app initialization
CategoryService.enableApiMode(true);
```

### Bước 3: API Endpoints cần implement

```
GET /api/categories
GET /api/categories/{id}
GET /api/categories/{id}/subcategories
GET /api/products
GET /api/products/{id}
```

### Bước 4: Response format

```typescript
// Categories API response
{
  "success": true,
  "data": [
    {
      "id": "string",
      "categoryName": "string",
      "iconImg": "string"
    }
  ]
}
```

## Lợi ích của cấu trúc này

✅ **Modular**: Mỗi component có trách nhiệm riêng
✅ **Scalable**: Dễ dàng thêm features mới
✅ **API Ready**: Chỉ cần switch flag để dùng API
✅ **Error Handling**: Tự động fallback về mock data
✅ **Type Safe**: Full TypeScript support
✅ **Maintainable**: Code dễ đọc và maintain
