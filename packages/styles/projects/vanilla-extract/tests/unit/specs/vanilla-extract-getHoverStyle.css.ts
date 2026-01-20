import { style } from '@vanilla-extract/css';
import { getHoverStyle } from '../../../src';

// Will be compiled by rollup into css file which is then used in the unit test
export const vanillaExtractGetHoverStyle = style({
  ...getHoverStyle(),
});
