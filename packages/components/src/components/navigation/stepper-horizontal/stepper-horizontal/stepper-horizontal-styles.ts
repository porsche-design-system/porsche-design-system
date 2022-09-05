import { buildResponsiveStyles, getCss } from '../../../../utils';
import { addImportantToRule } from '../../../../styles';
import type { StepperHorizontalSize } from './stepper-horizontal-utils';
import type { BreakpointCustomizable } from '../../../../types';
import { fontSize, textSmall } from '@porsche-design-system/utilities-v2';

export const getComponentCss = (size: BreakpointCustomizable<StepperHorizontalSize>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      '::slotted(*:not(:last-child))': {
        marginRight: addImportantToRule('1em'),
      },
    },
    scroller: {
      display: 'flex',
      ...textSmall,
      ...buildResponsiveStyles(size, (s: StepperHorizontalSize) => fontSize[s]),
    },
  });
};
