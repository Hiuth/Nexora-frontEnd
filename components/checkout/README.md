# Checkout Components

This directory contains all components related to the checkout process.

## Components

### CheckoutForm

The main checkout form component that handles customer information input and order submission.

**Features:**

- Customer information form (name, phone, address)
- Order summary display
- Integration with VNPay payment system
- Real-time form validation
- Responsive design

**Usage:**

```tsx
import { CheckoutForm } from "@/components/checkout";

<CheckoutForm cartItems={cartItems} />;
```

## API Integration

The checkout components integrate with:

- `CartService` - for cart data
- `CheckoutService` - for order processing
- `PaymentService` - for VNPay integration

## Payment Flow

1. User fills customer information
2. Clicks "Thanh toán ngay" button
3. System creates order and order details
4. Redirects to VNPay payment page
5. After payment, user is redirected to `/payment/return`
6. System processes payment result and updates order status
