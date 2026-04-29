import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  typescale3Xl,
  typescale4Xl,
  typescale5Xl,
} from '../../styles/css-variables';
import { colorMap } from '../../styles/maps';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { DISPLAY_TAGS, type DisplayAlign, type DisplayColor, type DisplaySize } from './display-utils';

const sizeMap: { [key in DisplaySize]: string } = {
  small: typescale3Xl,
  medium: typescale4Xl,
  large: typescale5Xl,
  inherit: 'inherit',
};

export const getComponentCss = (
  size: BreakpointCustomizable<DisplaySize>,
  align: DisplayAlign,
  color: DisplayColor,
  ellipsis: boolean
): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      [`::slotted(:is(${DISPLAY_TAGS.join()}))`]: addImportantToEachRule({
        all: 'unset',
      }),
    },
    root: {
      all: 'unset',
      display: 'block',
      font: `${fontWeightNormal} ${typescale5Xl}/${leadingNormal} ${fontPorscheNext}`,
      ...buildResponsiveStyles(size, (v: DisplaySize) => ({
        fontSize: sizeMap[v],
      })),
      color: colorMap[color],
      textAlign: align,
      ...(ellipsis && {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    },
  });
};
