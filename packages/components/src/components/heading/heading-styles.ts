import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  fontPorscheNext,
  fontWeightNormal,
  fontWeightSemibold,
  leadingNormal,
  typescale2Xl,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
} from '../../styles/css-variables';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';
import type { BreakpointCustomizable, HeadingSize } from '../../types';
import { buildResponsiveStyles, getCss, HEADING_TAGS } from '../../utils';
import type { HeadingAlign, HeadingColor } from './heading-utils';

export const sizeMap: { [key in Exclude<HeadingSize, 'inherit'>]: string } = {
  small: typescaleSm,
  medium: typescaleMd,
  large: typescaleLg,
  'x-large': typescaleXl,
  'xx-large': typescale2Xl,
};

export const getComponentCss = (
  size: BreakpointCustomizable<HeadingSize>,
  align: HeadingAlign,
  color: HeadingColor,
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
      [`::slotted(:is(${HEADING_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
    },
    root: getTypographyRootJssStyle(
      {
        font: `${fontWeightNormal} ${typescale2Xl}/${leadingNormal} ${fontPorscheNext}`,
      },
      buildResponsiveStyles(size, (sizeValue: HeadingSize) => ({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
        fontWeight: sizeValue === 'small' ? fontWeightSemibold : fontWeightNormal,
      })),
      align,
      color,
      ellipsis
    ),
  });
};
