import type { JssStyle } from 'jss';
import type { HeadlineVariant, TextAlign, TextColor, Theme, VariantType } from '../../../../types';
import { buildResponsiveStyles, buildSlottedStyles, getCss, mergeDeep, paramCaseToCamelCase } from '../../../../utils';
import { addImportantToEachRule, getBaseSlottedStyles, getThemedColors } from '../../../../styles';
import { fontWeight, headline, text, textSmall, titleLarge } from '@porsche-design-system/utilities-v2';
import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from '../../../../styles/typography-styles';
import { isVariantType } from './headline-utils';
import { getThemedTextColor } from '../../../../styles/text-icon-styles';
import { TextSize } from '../../../../types';

const getVariantStyle = (variant: HeadlineVariant): JssStyle => {
  return variant === 'large-title' ? titleLarge : headline[(variant as VariantType).slice(-1)];
};

export const getComponentCss = (
  variant: HeadlineVariant,
  align: TextAlign,
  color: Extract<TextColor, 'default' | 'inherit'>,
  ellipsis: boolean,
  theme: Theme
): string => {
  const getSizeJssStyle = (textSize: TextSize): JssStyle => {
    const fotWeightSemibold = fontWeight.semibold;
    return textSize === 'inherit'
      ? { fontSize: textSize, fontWeight: fotWeightSemibold }
      : { font: text[paramCaseToCamelCase(textSize)].font.replace('400', fotWeightSemibold) };
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      '::slotted': {
        '&(h1),&(h2),&(h3),&(h4),&(h5),&(h6)': addImportantToEachRule(getSlottedTypographyJssStyle()),
      },
    },
    root: {
      padding: 0,
      margin: 0,
      textAlign: align,
      color: color !== 'default' ? 'inherit' : getThemedColors(theme).baseColor,
      whiteSpace: 'inherit',
      ...(isVariantType(variant)
        ? getVariantStyle(variant)
        : {
            ...textSmall,
            color: getThemedTextColor(theme, color),
            transition: 'font-size 1ms linear',
            ...buildResponsiveStyles(variant, getSizeJssStyle),
            hyphens: 'manual',
          }),
      ...(ellipsis && getEllipsisJssStyle()),
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, mergeDeep(getBaseSlottedStyles(), { '& a': { textDecoration: 'none' } })));
};
