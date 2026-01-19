import { style } from '@vanilla-extract/css';
import { getFocusStyle } from '../../../src';

// Will be compiled by rollup into css file which is then used in the unit test
export const vanillaExtractGetFocusStyle = style({
  ...getFocusStyle(),
});
