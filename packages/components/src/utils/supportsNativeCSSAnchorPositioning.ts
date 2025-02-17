import { hasWindow } from './has-window';

/**
 * Checks if the current environment supports the native CSS Anchor Positioning.
 *
 * @returns {boolean} `true` if native CSS Anchor Positioning is supported, `false` otherwise.
 */
export const supportsNativeCSSAnchorPositioning = (): boolean => {
  if (!hasWindow) {
    return false;
  }
  return CSS.supports(
    '(anchor-name: --test) and (position-anchor: --test) and (position-area: bottom) and (position-try-fallbacks: flip-block) and (width: anchor-size(width))'
  );
};

// determine it once
const hasNativeCSSAnchorPositioningSupport = supportsNativeCSSAnchorPositioning();
// getter for easy mocking
export const getHasCSSAnchorPositioningSupport = (): boolean => hasNativeCSSAnchorPositioningSupport;
