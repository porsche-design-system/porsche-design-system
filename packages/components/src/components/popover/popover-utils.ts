export const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverDirection = (typeof POPOVER_DIRECTIONS)[number];

export const POPOVER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type PopoverAriaAttribute = (typeof POPOVER_ARIA_ATTRIBUTES)[number];

export const POPOVER_SAFE_ZONE = 8;

// Matches the popover's `radiusXl` (12px) border-radius. Used as `arrow` middleware padding so the arrow keeps a
// safe zone to the rounded corners and is never placed on top of them.
export const POPOVER_BORDER_RADIUS = 12;
