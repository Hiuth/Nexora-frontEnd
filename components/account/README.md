# Account Components Documentation

## Overview

Tách và cải thiện giao diện tài khoản thành các component riêng biệt với logic rõ ràng và thiết kế nhất quán theo màu xanh của hệ thống.

## Components Structure

### 1. AccountSidebar (`components/account/account-sidebar.tsx`)

**Chức năng**: Thanh điều hướng bên trái với thông tin user và menu
**Props**:

- `user`: Thông tin người dùng (name, email, phone, address)
- `activeSection`: Section hiện tại đang active
- `onLogout`: Callback function khi click đăng xuất

**Features**:

- Hiển thị avatar và thông tin user
- Menu điều hướng với active states
- Nút đăng xuất màu đỏ
- Glass morphism design với shadow

### 2. AccountStats (`components/account/account-stats.tsx`)

**Chức năng**: Hiển thị thống kê tổng quan
**Props**:

- `totalOrders`: Tổng số đơn hàng
- `completedOrders`: Số đơn hàng đã hoàn thành

**Features**:

- 2 cards thống kê với icons
- Hover effects và animations
- Color coding (primary cho total, emerald cho completed)

### 3. RecentOrders (`components/account/recent-orders.tsx`)

**Chức năng**: Hiển thị danh sách đơn hàng gần đây
**Props**:

- `orders`: Mảng đơn hàng
- `orderItems`: Mảng chi tiết đơn hàng

**Features**:

- Danh sách đơn hàng với badge status
- Link "Xem tất cả" đến trang orders
- Empty state khi không có đơn hàng
- Formatted dates và prices

### 4. ProfileInfo (`components/account/profile-info.tsx`)

**Chức năng**: Hiển thị và chỉnh sửa thông tin cá nhân
**Props**:

- `user`: Thông tin người dùng
- `onEdit`: Callback function khi click chỉnh sửa

**Features**:

- Grid layout responsive
- Form-like display với labels
- CTA button để chỉnh sửa
- Input-style background cho values

### 5. OrdersList (`components/account/orders-list.tsx`)

**Chức năng**: Hiển thị danh sách đầy đủ các đơn hàng
**Props**:

- `orders`: Mảng đơn hàng
- `orderItems`: Mảng chi tiết đơn hàng
- `products`: Mảng sản phẩm

**Features**:

- Chi tiết đầy đủ từng đơn hàng
- Product thumbnails và links
- Address và total amount
- Empty state handling
- Responsive design

### 6. AccountTabs (`components/account/account-tabs.tsx`)

**Chức năng**: Wrapper cho tab navigation
**Props**:

- `defaultValue`: Tab mặc định
- `overviewContent`: Nội dung tab tổng quan
- `profileContent`: Nội dung tab thông tin
- `ordersContent`: Nội dung tab đơn hàng

**Features**:

- Responsive tab navigation
- Glass morphism design
- Active states với primary color
- Smooth transitions

## Design System

### Color Scheme

- **Primary**: Blue-600 (`--primary: 37 99 235`) - Màu chính của hệ thống
- **Backgrounds**: White với transparency (white/70, white/60)
- **Text**: Slate color palette (slate-800, slate-600, slate-500)
- **Accents**: Primary color variants với opacity
- **Error/Logout**: Red-500 và variants

### Visual Effects

- **Glass Morphism**: `backdrop-blur-md` với white transparency
- **Shadows**: `shadow-lg hover:shadow-xl` với smooth transitions
- **Rounded Corners**: `rounded-2xl` cho modern look
- **Borders**: Subtle borders với `border-primary/10`

### Typography

- **Headings**: Bold với slate-800/slate-900
- **Body Text**: Medium weight với slate-600/slate-700
- **Captions**: Small text với slate-500
- **Interactive**: Primary color cho links và buttons

### Spacing & Layout

- **Container**: Responsive grid với gap-8/gap-10
- **Internal Padding**: p-6 đến p-8 tùy component
- **Margins**: mb-6, mb-8, mb-12 cho vertical rhythm
- **Responsive**: lg:col-span patterns

## Usage Examples

### Main Account Page

```tsx
<AccountTabs
  defaultValue="overview"
  overviewContent={
    <div className="space-y-8">
      <AccountStats totalOrders={5} completedOrders={3} />
      <RecentOrders orders={recentOrders} orderItems={orderDetails} />
    </div>
  }
  profileContent={<ProfileInfo user={user} onEdit={handleEdit} />}
  ordersContent={
    <OrdersList orders={orders} orderItems={items} products={products} />
  }
/>
```

### Sidebar Usage

```tsx
<AccountSidebar
  user={userInfo}
  activeSection="profile"
  onLogout={handleLogout}
/>
```

## File Structure

```
components/account/
├── account-sidebar.tsx     # Sidebar navigation
├── account-stats.tsx      # Statistics cards
├── account-tabs.tsx       # Tab navigation wrapper
├── recent-orders.tsx      # Recent orders list
├── profile-info.tsx       # Profile information form
└── orders-list.tsx        # Full orders list
```

## Benefits of This Architecture

1. **Modularity**: Mỗi component có trách nhiệm rõ ràng
2. **Reusability**: Components có thể tái sử dụng ở nhiều nơi
3. **Maintainability**: Dễ duy trì và cập nhật từng phần
4. **Testability**: Có thể test từng component riêng biệt
5. **Consistency**: Design system đồng nhất
6. **Performance**: Chỉ re-render components cần thiết
7. **Type Safety**: TypeScript interfaces cho tất cả props
