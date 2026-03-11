import { addImportantToEachRule, hostHiddenStyles } from '../../styles';
import {
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  typescale2Xs,
  typescaleLg,
  typescaleMd,
  typescaleSm,
  typescaleXl,
  typescaleXs,
} from '../../styles/css-variables';
import { getFontWeight } from '../../styles/font-weight-styles';
import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from '../../styles/typography-styles';
import type { BreakpointCustomizable, TextSize } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { TEXT_TAGS, type TextAlign, type TextColor, type TextWeight } from './text-utils';

const sizeMap: Record<Exclude<TextSize, 'inherit'>, string> = {
  'xx-small': typescale2Xs,
  'x-small': typescaleXs,
  small: typescaleSm,
  medium: typescaleMd,
  large: typescaleLg,
  'x-large': typescaleXl,
};

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
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
      [`::slotted(:is(${TEXT_TAGS.join()}))`]: addImportantToEachRule(getTypographySlottedJssStyle()),
    },
    root: getTypographyRootJssStyle(
      {
        font: `${fontWeightNormal} ${typescaleSm}/${leadingNormal} ${fontPorscheNext}`,
      },
      buildResponsiveStyles(size, (sizeValue: TextSize) => ({
        fontSize: sizeValue === 'inherit' ? sizeValue : sizeMap[sizeValue],
        fontWeight: getFontWeight(weight),
      })),
      align,
      color,
      ellipsis
    ),
  });
};
