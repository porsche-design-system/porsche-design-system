import { JssStyle } from 'jss';

/**
 * Applies a style only when the browser supports the Chromium media query.
 *
 * @param {JssStyle} style - The style to be applied when the Chromium media query is supported.
 * @returns {JssStyle} - The Chromium media query containing the style.
 */
export const supportsChromiumMediaQuery = (style: JssStyle): JssStyle => ({
  '@media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm)': style,
});
