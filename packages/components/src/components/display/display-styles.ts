import {
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  ref,
  typescale3Xl,
  typescale4Xl,
  typescale5Xl,
} from '@porsche-design-system/stylesheets';
import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { colorMap } from '../../styles/maps';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { DISPLAY_TAGS, type DisplayAlign, type DisplayColor, type DisplaySize } from './display-utils';

const sizeMap: { [key in DisplaySize]: string } = {
  small: ref(typescale3Xl),
  medium: ref(typescale4Xl),
  large: ref(typescale5Xl),
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
      font: `${ref(fontWeightNormal)} ${ref(typescale5Xl)}/${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
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
