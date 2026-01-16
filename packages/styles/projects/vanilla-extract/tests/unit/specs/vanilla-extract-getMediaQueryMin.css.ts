import { style } from '@vanilla-extract/css';
import { getMediaQueryMin } from '../../../src';

// Will be compiled by rollup into css file which is then used in the unit test
export const vanillaExtractGetMediaQueryMin = style({
  '@media': {
    [getMediaQueryMin('xxl')]: {
      margin: 0,
    },
  },
});
