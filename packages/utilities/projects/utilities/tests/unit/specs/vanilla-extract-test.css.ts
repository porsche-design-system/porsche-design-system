import { getFocusStyle, getHoverStyle } from '@porsche-design-system/components-js/styles/vanilla-extract';
import { style } from '@vanilla-extract/css';

// Will be compiled by rollup into css file which is then used in the unit test
export const vanillaExtractTestCss = style({
  ...getFocusStyle(),
  ...getHoverStyle(),
});
