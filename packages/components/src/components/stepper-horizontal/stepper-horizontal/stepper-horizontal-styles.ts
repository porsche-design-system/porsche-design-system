import { buildResponsiveStyles, getCss } from '../../../utils';
import type { StepperHorizontalSize } from './stepper-horizontal-utils';
import type { BreakpointCustomizable } from '../../../types';
import { fontSize, textFluidSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (size: BreakpointCustomizable<StepperHorizontalSize>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
    },
    scroller: {
      display: 'flex',
      ...textFluidSmall,
      ...buildResponsiveStyles(size, (s: StepperHorizontalSize) => fontSize.fluid[s]),
    },
  });
};
