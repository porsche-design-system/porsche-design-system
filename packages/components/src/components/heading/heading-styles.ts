import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { fontPorscheNext, leadingNormal, typescale2Xl } from '../../styles/css-variables';
import { colorMap, sizeMap, weightMap } from '../../styles/maps';
import type { BreakpointCustomizable } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  HEADING_TAGS,
  type HeadingAlign,
  type HeadingColor,
  type HeadingHyphens,
  type HeadingSize,
  type HeadingWeight,
} from './heading-utils';

export const getComponentCss = (
  size: BreakpointCustomizable<HeadingSize>,
  weight: HeadingWeight,
  align: HeadingAlign,
  color: HeadingColor,
  hyphens: HeadingHyphens,
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
      [`::slotted(:is(${HEADING_TAGS.join()}))`]: {
        all: 'unset',
      },
    },
    root: {
      all: 'unset',
      display: 'block',
      font: `${weightMap[weight]} ${typescale2Xl}/${leadingNormal} ${fontPorscheNext}`,
      ...buildResponsiveStyles(size, (v: HeadingSize) => ({
        fontSize: sizeMap[v],
      })),
      color: colorMap[color],
      textAlign: align,
      hyphens,
      ...((hyphens === 'auto' || hyphens === 'manual') && {
        overflowWrap: 'break-word',
      }),
      ...(ellipsis && {
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    },
  });
};
