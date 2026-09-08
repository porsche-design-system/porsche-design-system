import { style } from '@vanilla-extract/css';
import { getMediaQueryMinMax } from '../../../src';

// Will be compiled by rollup into css file which is then used in the unit test
export const vanillaExtractGetMediaQueryMinMax = style({
  '@media': {
    [getMediaQueryMinMax('base', 'xxl')]: {
      margin: 0,
    },
  },
});
