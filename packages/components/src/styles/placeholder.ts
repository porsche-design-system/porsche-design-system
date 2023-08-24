import { JssStyle } from 'jss';

/**
 * Generates placeholder styles for an input element.
 *
 * @param {JssStyle} styles - The styles to apply to the placeholder.
 * @returns {JssStyle} - The generated placeholder styles.
 */
export const getPlaceholderJssStyles = (styles: JssStyle): JssStyle => ({
  '&::placeholder': styles,
  '&::-webkit-input-placeholder': styles /* Chrome/Opera/Safari */,
  '&::-moz-placeholder': styles /* Firefox 19+ */,
  '&:-moz-placeholder': styles /* Firefox 18- */,
});
