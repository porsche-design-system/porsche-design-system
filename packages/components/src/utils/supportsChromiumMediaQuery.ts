import type { CssStyle } from './css-serializer';

/**
 * Applies a style only on Chromium based browsers by using a media query which is only supported there.
 * https://browserstack.com/guide/create-browser-specific-css
 *
 * @param {CssStyle} style - The style to be applied when the Chromium media query is supported.
 * @returns {CssStyle} - The Chromium media query containing the style.
 */
export const supportsChromiumMediaQuery = (style: CssStyle): CssStyle => ({
  '@media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm)': style,
});
