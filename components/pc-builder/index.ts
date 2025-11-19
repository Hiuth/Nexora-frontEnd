// PC Builder Components
export { PCBuilderContent } from "./pc-builder-content";
export { ComponentCard } from "./component-card";
export { ComponentSelectionDialog } from "./component-selection-dialog";
export { BuildSummaryCard } from "./build-summary-card";
export { QuantityControls } from "./quantity-controls";
export { ProductQuantityValidator, useQuantityValidator } from "./product-quantity-validator";

// Hooks
export { usePCBuilder } from "@/hooks/use-pc-builder";

// Types and configurations
export { COMPONENT_MAPPINGS } from "@/config/pc-builder-mappings";
export type { ComponentMapping } from "@/config/pc-builder-mappings";
export type { BuildComponent } from "@/hooks/use-pc-builder";