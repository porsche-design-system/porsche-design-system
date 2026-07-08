import type { CssStyle } from '../utils/css-serializer';

/**
 * Generates placeholder styles for an input element.
 *
 * @param {CssStyle} styles - The styles to apply to the placeholder.
 * @returns {CssStyle} - The generated placeholder styles.
 */
export const getPlaceholderCssStyle = (styles: CssStyle): CssStyle => ({
  '&::placeholder': styles,
  '&::-webkit-input-placeholder': styles /* Chrome/Opera/Safari */,
  '&::-moz-placeholder': styles /* Firefox 19+ */,
  '&:-moz-placeholder': styles /* Firefox 18- */,
});
