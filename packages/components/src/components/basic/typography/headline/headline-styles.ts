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
  pxToRemWithUnit, calculateLineHeight,
} from '../../../../utils';
import { HeadlineVariant, TextAlign, TextColor, Theme, VariantType } from '../../../../types';
import { mediaQuery, font } from '@porsche-design-system/utilities';

const getFontSize: { [key in VariantType]: {base: number, step: number }} = {
  'large-title': { base: 32, step: 10 },
  'headline-1': { base: 28, step: 8 },
  'headline-2': { base: 24, step: 6 },
  'headline-3': { base: 20, step: 4 },
  'headline-4': { base: 16, step: 2 },
  'headline-5': { base: 16, step: 0 },
};

const getVariantStyle = (variant: HeadlineVariant): JssStyle => {
  if (variant === 'inherit') {
    return { fontSize: 'inherit' };
  }

  const res = {
    fontSize: pxToRemWithUnit(getFontSize[variant as VariantType].base),
    lineHeight: calculateLineHeight(getFontSize[variant as VariantType].base),
    fontWeight: font.weight.semibold, // always 600 for any case
    fontFamily: font.family,
    [mediaQuery('s', 'm')]: {
      fontSize: pxToRemWithUnit(getFontSize[variant as VariantType].base + getFontSize[variant as VariantType].step),
      lineHeight: calculateLineHeight(getFontSize[variant as VariantType].base + getFontSize[variant as VariantType].step),
    },
    [mediaQuery('m', 'l')]: {
      fontSize: pxToRemWithUnit(
        getFontSize[variant as VariantType].base + 2 * getFontSize[variant as VariantType].step
      ),
      lineHeight: calculateLineHeight(
        getFontSize[variant as VariantType].base + 2 * getFontSize[variant as VariantType].step
      ),
    },
    [mediaQuery('l', 'xl')]: {
      fontSize: pxToRemWithUnit(
        getFontSize[variant as VariantType].base + 3 * getFontSize[variant as VariantType].step
      ),
      lineHeight: calculateLineHeight(
        getFontSize[variant as VariantType].base + 3 * getFontSize[variant as VariantType].step
      ),
    },
    [query('xl')]: {
      fontSize: pxToRemWithUnit(
        getFontSize[variant as VariantType].base + 4 * getFontSize[variant as VariantType].step
      ),
      lineHeight: calculateLineHeight(
        getFontSize[variant as VariantType].base + 4 * getFontSize[variant as VariantType].step
      )
    },
  };
  console.log(
    '%c fontSize',
    'color: red',
    pxToRemWithUnit(getFontSize[variant as VariantType].base + getFontSize[variant as VariantType].step),
    variant, res
  );
  return res;
};

export const getComponentCss = (
  variant: HeadlineVariant,
  ellipsis: boolean,
  align: TextAlign,
  color: Extract<TextColor, 'default' | 'inherit'>,
  theme: Theme
): string => {
  // conditional rendering with other props
  const { baseColor } = getThemedColors(theme);
  console.log("-> baseColor", baseColor);

  return getCss(
    mergeDeep<Styles>({
      ':host': {
        display: 'block',
      },
      ...addImportantToEachRule({
        '::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(h6)': {
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
        ...getVariantStyle(variant),
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

// do we still need those slotted styles?
export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(
    mergeDeep(
      buildSlottedStyles(host, getBaseSlottedStyles()),
      buildSlottedStyles(host, { '& a': { textDecoration: 'none' } })
    )
  );
};
