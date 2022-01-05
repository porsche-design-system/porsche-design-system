import {
  addImportantToEachRule,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
  mergeDeep,
  JssStyle,
  mediaQuery as query,
  Styles,
  pxToRemWithUnit,
  calculateLineHeight,
} from '../../../../utils';
import { HeadlineVariant, TextAlign, TextColor, Theme, VariantType } from '../../../../types';
import { mediaQuery, font } from '@porsche-design-system/utilities';

export type MinToMaxBreakpoint = 'base' | 'sm' | 'ml' | 'lxl' | 'xl';

const getMediaQueryMultiple: { [key in MinToMaxBreakpoint]: number } = {
  base: 0,
  sm: 1,
  ml: 2,
  lxl: 3,
  xl: 4,
};

const variantFontSizeMapper: { [key in VariantType]: { base: number; step: number } } = {
  'large-title': { base: 32, step: 10 },
  'headline-1': { base: 28, step: 8 },
  'headline-2': { base: 24, step: 6 },
  'headline-3': { base: 20, step: 4 },
  'headline-4': { base: 16, step: 2 },
  'headline-5': { base: 16, step: 0 },
};

const getFontSize = (variant: HeadlineVariant, area: MinToMaxBreakpoint): number => {
  return (
    variantFontSizeMapper[variant as VariantType].base +
    getMediaQueryMultiple[area] * variantFontSizeMapper[variant as VariantType].step
  );
};

const getVariantStyle = (variant: HeadlineVariant): JssStyle => {
  if (variant === 'inherit') {
    return { fontSize: 'inherit' };
  }

  return {
    fontSize: pxToRemWithUnit(getFontSize(variant, 'base')),
    lineHeight: calculateLineHeight(getFontSize(variant, 'base')),
    fontWeight: font.weight.semibold, // to root since it never changes?
    fontFamily: font.family, // to root since it never changes?
    [mediaQuery('s', 'm')]: {
      fontSize: pxToRemWithUnit(getFontSize(variant, 'sm')),
      lineHeight: calculateLineHeight(getFontSize(variant, 'sm')),
    },
    [mediaQuery('m', 'l')]: {
      fontSize: pxToRemWithUnit(getFontSize(variant, 'ml')),
      lineHeight: calculateLineHeight(getFontSize(variant, 'ml')),
    },
    [mediaQuery('l', 'xl')]: {
      fontSize: pxToRemWithUnit(getFontSize(variant, 'lxl')),
      lineHeight: calculateLineHeight(getFontSize(variant, 'lxl')),
    },
    [query('xl')]: {
      fontSize: pxToRemWithUnit(getFontSize(variant, 'xl')),
      lineHeight: calculateLineHeight(getFontSize(variant, 'xl')),
    },
  };
};

export const getComponentCss = (
  variant: HeadlineVariant,
  ellipsis: boolean,
  theme: Theme,
  align: TextAlign,
  color: Extract<TextColor, 'default' | 'inherit'>
): string => {
  const { baseColor } = getThemedColors(theme);

  return getCss(
    mergeDeep<Styles>({
      ':host': {
        display: 'block',
      },
      ...addImportantToEachRule({
        '::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(h6)': {
          // export for text-style => helper in styles folder
          margin: 'inherit',
          padding: 'inherit',
          fontFamily: 'inherit',
          fontWeight: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          color: 'inherit',
          textAlign: 'inherit',
          overflowWrap: 'inherit',
          wordWrap: 'inherit',
          hyphens: 'inherit',
          whiteSpace: 'inherit',
        },
      }),
      root: {
        padding: 0,
        margin: 0,
        textAlign: 'left',
        color: baseColor,
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        hyphens: 'auto',
        whiteSpace: 'inherit',
        // use typ.ts definitions for title & headline
        ...getVariantStyle(variant),
        // condition for color & align
        ...(align && { textAlign: align }),
        ...(color && { color: 'inherit' }),
        ...(ellipsis && {
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }),
      },
    })
  );
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getBaseSlottedStyles()),
      buildSlottedStyles(host, { '& a': { textDecoration: 'none' } })
    )
  );
};
