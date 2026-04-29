import { style } from '@vanilla-extract/css';
import { getMediaQueryMax } from '../../../src';

// Will be compiled by rollup into css file which is then used in the unit test
export const vanillaExtractGetMediaQueryMax = style({
  '@media': {
    [getMediaQueryMax('xxl')]: {
      margin: 0,
    },
  },
});
