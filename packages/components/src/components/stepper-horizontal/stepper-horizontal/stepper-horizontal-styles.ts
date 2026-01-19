import { fontSizeText, textSmallStyle } from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  hostHiddenStyles,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import type { BreakpointCustomizable } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import type { StepperHorizontalSize } from './stepper-horizontal-utils';

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
      ...preventFoucOfNestedElementsStyles,
    },
    scroller: {
      ...textSmallStyle,
      ...buildResponsiveStyles(size, (s: StepperHorizontalSize) => ({ fontSize: fontSizeText[s] })),
    },
  });
};
