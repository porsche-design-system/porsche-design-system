import type { JssStyle } from 'jss';

/**
 * utility to wrap jss styles parameter in `@media (hover: hover)`
 * which is used to not have hover styles on touch devices
 */
export const hoverMediaQuery = (style: JssStyle): JssStyle =>
  // puppeteer/chromium does not support `@media (hover: hover)` in headless mode
  // see https://github.com/puppeteer/puppeteer/issues/5096 and https://github.com/puppeteer/puppeteer/issues/4820
  ROLLUP_REPLACE_IS_STAGING === 'production' || // prod build
  process.env.NODE_ENV === 'test' || // unit tests
  (ROLLUP_REPLACE_IS_STAGING === 'staging' && process.env.NODE_ENV === 'development') // dev via yarn start
    ? { '@media(hover:hover)': style } // used for prod build, yarn start and unit tests
    : style; // used for staging build in e2e and vrt tests
