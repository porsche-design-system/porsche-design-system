import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import { fontPorscheNext, leadingNormal, typescaleSm } from '../../styles/css-variables';
import { colorMap, sizeMap, weightMap } from '../../styles/maps';
import type { BreakpointCustomizable, TextSize } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { TEXT_TAGS, type TextAlign, type TextColor, type TextWeight } from './text-utils';

export const getComponentCss = (
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  align: TextAlign,
  color: TextColor,
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
      [`::slotted(:is(${TEXT_TAGS.join()}))`]: addImportantToEachRule({
        all: 'unset',
      }),
    },
    root: {
      all: 'unset',
      display: 'block',
      font: `${weightMap[weight]} ${typescaleSm}/${leadingNormal} ${fontPorscheNext}`,
      ...buildResponsiveStyles(size, (v: TextSize) => ({
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
