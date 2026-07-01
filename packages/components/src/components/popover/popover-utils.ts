export const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverDirection = (typeof POPOVER_DIRECTIONS)[number];

export const POPOVER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type PopoverAriaAttribute = (typeof POPOVER_ARIA_ATTRIBUTES)[number];

export const POPOVER_SAFE_ZONE = 8;


/**
 * Reads the popover panel's actually rendered `border-radius` in pixels. The radius is dynamic because it depends on the
 * `compact` prop (`radiusLg` vs `radiusXl`) and can be fully customized via the `--p-popover-radius` CSS variable. It is
 * used as `arrow` middleware padding so the arrow keeps a safe zone to the rounded corners and is never placed on top of
 * them.
 */
export const getPopoverBorderRadius = (popover: HTMLElement): number => {
  const borderRadius = Number.parseFloat(getComputedStyle(popover).borderRadius);
  // Fallback border-radius matching the popover's non-compact `radiusXl` (12px). Used when the rendered value can't be
  // resolved (e.g. SSR or test environments without layout).
  return Number.isNaN(borderRadius) ? 12 : borderRadius;
};
