import { addImportantToEachRule, hostHiddenStyles, preventFoucOfNestedElementsStyles } from '../../../styles';
import {
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  typescaleMd,
  typescaleSm,
} from '../../../styles/css-variables';
import type { BreakpointCustomizable } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import type { StepperHorizontalSize } from './stepper-horizontal-utils';

const sizeMap: Record<Exclude<StepperHorizontalSize, 'inherit'>, string> = {
  small: typescaleSm,
  medium: typescaleMd,
};

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
      font: `${fontWeightNormal} ${typescaleSm}/${leadingNormal} ${fontPorscheNext}`,
      ...buildResponsiveStyles(size, (s: StepperHorizontalSize) => ({ fontSize: sizeMap[s] })),
    },
  });
};
