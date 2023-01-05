import { buildResponsiveStyles, getCss } from '../../../utils';
import type { StepperHorizontalSize } from './stepper-horizontal-utils';
import type { BreakpointCustomizable } from '../../../types';
import { fontSizeText, textSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (size: BreakpointCustomizable<StepperHorizontalSize>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
    },
    scroller: {
      display: 'flex',
      ...textSmall,
      ...buildResponsiveStyles(size, (s: StepperHorizontalSize) => {
        return { fontSize: fontSizeText[s] };
      }),
    },
  });
};
