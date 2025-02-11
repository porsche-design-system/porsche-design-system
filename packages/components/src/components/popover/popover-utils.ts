export const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverDirection = (typeof POPOVER_DIRECTIONS)[number];

export const POPOVER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type PopoverAriaAttribute = (typeof POPOVER_ARIA_ATTRIBUTES)[number];

export const POPOVER_SAFE_ZONE = 8;
