export const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverDirection = (typeof POPOVER_DIRECTIONS)[number];

export const POPOVER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type PopoverAriaAttribute = (typeof POPOVER_ARIA_ATTRIBUTES)[number];

// The reasons differ from the dialog-like components (`p-modal` / `p-flyout` / `p-sheet` / `p-drilldown`): the popover
// has neither a backdrop nor a dismiss button, and it adds a keyboard-only path when focus tabs out of the panel.
// Kept inline rather than referencing a shared alias so the generated API docs table renders the three values.
export type PopoverDismissEventDetail = { reason: 'outside-click' | 'focus-out' | 'escape' };

// Minimum gap (in px) kept between the panel and the viewport edges. Used both as Floating UI `shift`/`flip` padding
// and to inset the panel's default max-width/height (`100dvw/dvh - 2 * POPOVER_SAFE_ZONE`) so it never touches the edge.
export const POPOVER_SAFE_ZONE = 8;

// Arrow geometry (in px), single source of truth shared by the JSS `.arrow` rule (`popover-styles.ts`) and the
// runtime positioning/orientation logic (`popover.tsx`). Named by geometry rather than `width`/`height` because the
// arrow is rotated per placement, so its rendered CSS `width`/`height` swap depending on the panel edge it attaches to.
// - `POPOVER_ARROW_BASE`: length of the triangle's base along the panel edge.
// - `POPOVER_ARROW_THICKNESS`: depth of the triangle perpendicular to the panel edge (how far it protrudes).
export const POPOVER_ARROW_BASE = 24;
export const POPOVER_ARROW_THICKNESS = 12;
// Gap (in px) between the arrow tip and the trigger, added on top of the arrow thickness for the Floating UI `offset`.
export const POPOVER_ARROW_GAP = 6;

// Width threshold (in px) used to tell the built-in info button apart from a larger custom slotted trigger. The default
// info button renders at `--p-leading-normal` (`calc(6px + 2.125ex)`) ≈ 24px at `typescaleSm`; this cutoff sits a bit
// above that to absorb rounding / font-metric / zoom variance while staying below typical custom triggers. When the
// trigger is at or below it (the default button) the `limitShift` limiter offsets the panel by the trigger width so the
// arrow stays correctly placed on the small button; wider triggers get no offset. Replaced the earlier
// `this.slottedButton ? 0 : …` check (see #3486), so it's a heuristic, not a measured constant.
export const POPOVER_DEFAULT_BUTTON_WIDTH_THRESHOLD = 33;

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
