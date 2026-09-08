import { fontPorscheNext, fontWeightNormal, leadingNormal, ref, typescaleSm } from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import { sizeMap } from '../../../styles/maps';
import type { BreakpointCustomizable } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import type { StepperHorizontalSize } from './stepper-horizontal-utils';

export const getComponentCss = (size: BreakpointCustomizable<StepperHorizontalSize>): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'grid',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    scroller: {
      placeSelf: 'flex-start', // ensures scroller doesn't get stretched in x- or y-axis in case the stepper-horizontal is taller than the scroller (e.g. when placed in flex or grid context)
      font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      ...buildResponsiveStyles(size, (s: StepperHorizontalSize) => ({ fontSize: sizeMap[s] })),
    },
  });
};
