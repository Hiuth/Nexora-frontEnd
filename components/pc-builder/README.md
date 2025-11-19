# PC Builder Refactoring

## Overview
PC Builder has been completely refactored into a modern, component-based architecture with API integration, authentication support, and improved user experience.

## New Architecture

### Before Refactoring
- Single large page component (~406 lines)
- Mock data only
- No authentication integration
- Basic product selection
- Power calculation logic (removed)
- Required components validation (removed)

### After Refactoring
Modern component architecture with clear separation of concerns:

```
app/pc-builder/page.tsx (main page - ~30 lines)
├── PCBuilderContent (main layout)
├── usePCBuilder (state management hook)
├── ComponentCard (individual component display)
├── ComponentSelectionDialog (product selection)
├── BuildSummaryCard (build summary and actions)
└── config/pc-builder-mappings.ts (category mappings)
```

## Key Features

### 1. **API Integration**
- Real product data from ProductService
- Category and subcategory filtering
- Dynamic product loading based on component type

### 2. **Authentication Integration**
- Login required for cart operations
- Disabled state for unauthenticated users
- User-friendly authentication prompts

### 3. **Advanced Product Selection**
- **Expanded Dialog**: Full-screen dialog for better product browsing
- **No Black Overlay**: Clean white background for better UX
- **Category Filtering**: Filter products by category and subcategory
- **Sorting Options**: Sort by name (A-Z, Z-A) and price (low-high, high-low)
- **Component-Specific Products**: Only show relevant products for each component type

### 4. **Cart Integration**
- Individual product add to cart
- Bulk add entire build to cart
- Real API calls to CartService
- Stock validation and error handling

### 5. **Removed Features** (as requested)
- ❌ Power calculation logic
- ❌ Required components validation
- ✅ Simplified component selection flow

### 6. **Component Separation**
Each component has a single responsibility:
- `ComponentCard`: Display individual components and their selected products
- `ComponentSelectionDialog`: Handle product selection with filtering/sorting
- `BuildSummaryCard`: Show build summary and bulk actions
- `usePCBuilder`: Manage all state and business logic

## Component Details

### ComponentCard
- Displays component info (icon, name)
- Shows selected product details
- Quantity controls with stock validation
- Remove/replace product actions
- Empty state with call-to-action

### ComponentSelectionDialog
- **Expanded Modal**: Large dialog (max-w-6xl) for better product browsing
- **Filter System**:
  - Category dropdown
  - Subcategory dropdown (dependent on category)
  - Sort options dropdown
  - Clear filters button
- **Product Grid**: Responsive grid with product cards
- **Stock Indicators**: Out of stock badges, low stock warnings
- **Dual Actions**: Select for build + Add to cart buttons
- **Authentication-Aware**: Disabled cart button for guests

### BuildSummaryCard
- **Sticky Sidebar**: Stays visible while scrolling
- **Component List**: Shows all selected components with prices
- **Total Calculation**: Real-time price updates
- **Bulk Actions**:
  - Add all to cart (requires login)
  - Save build (requires login, placeholder for future feature)
- **Authentication Prompts**: Clear messaging for login requirements

### usePCBuilder Hook
Manages all business logic:
- **State Management**: Components, dialogs, filters
- **API Integration**: Product loading, categories, subcategories
- **Filtering Logic**: Real-time product filtering and sorting
- **Cart Operations**: Individual and bulk cart additions
- **Authentication Checks**: Validates user login state

## Configuration

### Category Mapping
File: `config/pc-builder-mappings.ts`

```typescript
export const COMPONENT_MAPPINGS: ComponentMapping[] = [
  {
    id: 1,
    name: "CPU",
    categoryId: "actual-cpu-category-id", // Update with real API IDs
    subCategoryId: "actual-cpu-subcategory-id",
    description: "Bộ vi xử lý trung tâm"
  },
  // ... more mappings
];
```

**Important**: Update the categoryId and subCategoryId with actual values from your API.

## Setup Instructions

### 1. Update Category Mappings
1. Get category/subcategory IDs from your API
2. Update `config/pc-builder-mappings.ts` with real IDs
3. Test component selection to ensure correct product filtering

### 2. API Integration
- Uses existing ProductService, CategoryService, SubCategoryService
- Uses existing CartService for add to cart functionality
- All API errors gracefully handled with toast notifications

### 3. Authentication
- Integrates with existing AuthContext
- Checks `isAuthenticated` state for all cart operations
- Shows appropriate UI states for guests vs logged-in users

## Usage

### For Users
1. **Select Components**: Click on component cards to open product selection
2. **Filter Products**: Use category/subcategory filters in the dialog
3. **Sort Products**: Choose sorting option (name/price)
4. **Add to Cart**: 
   - Individual products: Click cart icon in product cards
   - Entire build: Click "Add all to cart" in summary
5. **Authentication**: Login required for all cart operations

### For Developers
```tsx
// Simple page component
export default function PCBuilderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 bg-gray-50">
        <PCBuilderContent />
      </main>
      <Footer />
    </div>
  );
}
```

## Future Enhancements

### Planned Features
1. **Build Templates**: Pre-configured builds for different use cases
2. **Compatibility Checking**: Validate component compatibility
3. **Price History**: Track price changes over time
4. **Build Sharing**: Share builds with other users
5. **Save/Load Builds**: Persistent build storage
6. **Build Comparison**: Compare multiple build configurations

### Technical Improvements
1. **Virtualization**: For large product lists
2. **Infinite Scroll**: Better performance for many products
3. **Image Optimization**: Lazy loading and WebP support
4. **State Persistence**: Save build state in localStorage
5. **Error Boundaries**: Better error handling and recovery

## Performance

### Optimizations
- Component-based architecture for better re-rendering
- Memoized computations in hooks
- Lazy loading of product data
- Efficient filtering and sorting algorithms
- Responsive design with mobile optimization

### Bundle Size
- Removed unused components and logic
- Tree-shakeable exports
- Minimal external dependencies
- Optimized icon usage

## Testing

### Test Coverage Areas
1. Component rendering and interactions
2. API integration and error handling
3. Authentication flows
4. Cart operations
5. Filter and sort functionality
6. Responsive design

## Migration Guide

### From Old PC Builder
1. **State Management**: Logic moved to `usePCBuilder` hook
2. **Product Selection**: Now uses `ComponentSelectionDialog`
3. **Build Summary**: Replaced with `BuildSummaryCard`
4. **Authentication**: Added login requirements for cart operations
5. **API Integration**: Real data instead of mock data

### Breaking Changes
- Removed power calculation logic
- Removed required components validation
- Changed component interface and props
- New authentication requirements for cart operations

## Dependencies

- React 18+ (hooks and modern features)
- Next.js 15+ (app router)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Lucide React (icons)
- Existing services (ProductService, CartService, etc.)
- Existing auth context and cart context