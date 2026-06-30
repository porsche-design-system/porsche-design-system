export const POPOVER_DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverDirection = (typeof POPOVER_DIRECTIONS)[number];

export const POPOVER_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type PopoverAriaAttribute = (typeof POPOVER_ARIA_ATTRIBUTES)[number];

export const POPOVER_SAFE_ZONE = 8;

/**
 * Name of the internal event broadcast on `document` whenever a popover opens. Other open popovers listen for it and
 * dismiss themselves (closed in uncontrolled mode, `dismiss` emitted in controlled mode), so that only a single popover
 * can be open at a time.
 *
 * A `document`-level event is used on purpose instead of a module-level instance registry: multiple PDS bundles/versions
 * can run side by side on the same page, each with its own module scope. A `Set` would therefore only coordinate
 * popovers originating from the same bundle. The event travels through the shared DOM, so any popover implementing this
 * contract coordinates regardless of which bundle/version created it. The event name is part of that cross-version
 * contract and must not be changed.
 */
export const POPOVER_OPEN_EVENT = 'internalPopoverOpen';

/** Detail payload of the {@link POPOVER_OPEN_EVENT}. `source` is the host element of the popover that just opened. */
export type PopoverOpenEventDetail = { source: HTMLElement };

/** Broadcasts that a popover has opened, so every other open popover (across all bundles/versions) can dismiss itself. */
export const dispatchPopoverOpenEvent = (source: HTMLElement): void => {
  document.dispatchEvent(new CustomEvent<PopoverOpenEventDetail>(POPOVER_OPEN_EVENT, { detail: { source } }));
};

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
