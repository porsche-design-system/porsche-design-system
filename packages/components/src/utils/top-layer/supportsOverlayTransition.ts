import type { JssStyle } from 'jss';

// Single source of truth for the two CSS feature queries behind the "keep on #top-layer during fade-out" capability,
// shared by the JS detection (`supportsOverlayTransition`) and the CSS `@supports` wrapper
// (`overlayTransitionSupportsQuery`) so the two can never drift.
const overlayFeature = 'overlay: auto';
const allowDiscreteFeature = 'transition-behavior: allow-discrete';

/**
 * Detects whether the browser can keep an element (e.g. a `dialog` or a `popover`) on the `#top-layer` during a
 * fade-out animation via the `overlay` property combined with `transition-behavior: allow-discrete`.
 *
 * BOTH capabilities are required: `transition-behavior: allow-discrete` is now widely supported (e.g. Firefox), but the
 * `overlay` property itself is Chromium-only. Firefox supports `allow-discrete` yet NOT `overlay`, so it would drop out
 * of the `#top-layer` immediately when leaving it and fall back to a high `z-index` — which breaks as soon as an
 * ancestor creates a new stacking context (e.g. `transform`/`isolation`, like a nested `p-modal` within `p-flyout`).
 *
 * For browsers lacking the `overlay` transition the element must be kept natively shown during the fade-out and only be
 * removed from the `#top-layer` once the transition has finished (see `createTopLayerController`).
 *
 * @returns {boolean} `true` if both `overlay` and `transition-behavior: allow-discrete` are supported.
 */
export const supportsOverlayTransition = (): boolean =>
  typeof CSS !== 'undefined' && CSS.supports(overlayFeature) && CSS.supports(allowDiscreteFeature);

/**
 * Wraps JSS styles in `@supports (overlay: auto) and (transition-behavior: allow-discrete)`, kept in sync with
 * `supportsOverlayTransition()`. Use it for styles that should only apply where the dialog/popover can stay on the
 * `#top-layer` during its fade-out (Chromium); other browsers defer the native hide instead (see
 * `createTopLayerController`).
 *
 * @param {JssStyle} style - The styles to apply only when the `overlay` transition is supported.
 * @returns {JssStyle} The `@supports`-wrapped styles.
 */
export const overlayTransitionSupportsQuery = (style: JssStyle): JssStyle => {
  return { [`@supports (${overlayFeature}) and (${allowDiscreteFeature})`]: style };
};
