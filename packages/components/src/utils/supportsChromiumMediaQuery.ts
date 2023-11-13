import { JssStyle } from 'jss';

/**
 * Applies a style only on Chromium based browsers by using a media query which is only supported there.
 *
 * @param {JssStyle} style - The style to be applied when the Chromium media query is supported.
 * @returns {JssStyle} - The Chromium media query containing the style.
 */
export const supportsChromiumMediaQuery = (style: JssStyle): JssStyle => ({
  '@media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm)': style,
});
