import { fontSizeText, textSmallStyle } from '@porsche-design-system/emotion';
import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import type { StepperHorizontalSize } from './stepper-horizontal-utils';

export const getComponentCss = (size: BreakpointCustomizable<StepperHorizontalSize>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    scroller: {
      placeSelf: 'flex-start', // ensures scroller doesn't get stretched in x- or y-axis in case the stepper-horizontal is taller than the scroller (e.g. when placed in flex or grid context)
      ...textSmallStyle,
      ...buildResponsiveStyles(size, (s: StepperHorizontalSize) => ({ fontSize: fontSizeText[s] })),
    },
  });
};
