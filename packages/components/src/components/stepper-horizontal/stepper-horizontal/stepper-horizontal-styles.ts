import { buildResponsiveStyles, getCss } from '../../../utils';
import type { StepperHorizontalSize } from './stepper-horizontal-utils';
import type { BreakpointCustomizable } from '../../../types';
import { fontSizeText, textSmallStyle } from '@porsche-design-system/utilities-v2';
import { addImportantToEachRule, colorSchemeStyles, hostHiddenStyles } from '../../../styles';

export const getComponentCss = (size: BreakpointCustomizable<StepperHorizontalSize>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
    },
    scroller: {
      ...textSmallStyle,
      ...buildResponsiveStyles(size, (s: StepperHorizontalSize) => ({ fontSize: fontSizeText[s] })),
    },
  });
};
