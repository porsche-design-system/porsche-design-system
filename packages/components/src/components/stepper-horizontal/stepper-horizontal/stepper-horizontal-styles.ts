import { buildResponsiveStyles, getCss } from '../../../utils';
import type { StepperHorizontalSize } from './stepper-horizontal-utils';
import type { BreakpointCustomizable } from '../../../types';
import { fontSizeText, textSmallStyle } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (size: BreakpointCustomizable<StepperHorizontalSize>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
    },
    scroller: {
      display: 'flex',
      ...textSmallStyle,
      ...buildResponsiveStyles(size, (s: StepperHorizontalSize) => {
        return { fontSize: fontSizeText[s] };
      }),
    },
  });
};
