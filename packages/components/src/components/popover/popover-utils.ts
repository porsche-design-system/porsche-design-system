export const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverDirection = (typeof POPOVER_DIRECTIONS)[number];

export const POPOVER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type PopoverAriaAttribute = (typeof POPOVER_ARIA_ATTRIBUTES)[number];

// Minimum gap (in px) kept between the panel and the viewport edges. Used both as Floating UI `shift`/`flip` padding
// and to inset the panel's default max-width/height (`100dvw/dvh - 2 * POPOVER_SAFE_ZONE`) so it never touches the edge.
export const POPOVER_SAFE_ZONE = 8;


/**
 * Reads the popover panel's actually rendered `border-radius` in pixels. The radius is dynamic because it depends on the
 * `compact` prop (`radiusLg` vs `radiusXl`) and can be fully customized via the `--p-popover-radius` CSS variable. It is
 * used as `arrow` middleware padding so the arrow keeps a safe zone to the rounded corners and is never placed on top of
 * them.
 */
export const getPopoverBorderRadius = (popover: HTMLElement): number => {
  const borderRadius = Number.parseFloat(getComputedStyle(popover).borderRadius);
  // Fallback used when the rendered value can't be resolved (e.g. SSR or test environments without layout). Matches the
  // non-compact `radiusXl` token (12px); the compact variant (`radiusLg`) is smaller, so this stays a safe default that
  // never places the arrow on top of a corner.
  return Number.isNaN(borderRadius) ? 12 : borderRadius;
};
