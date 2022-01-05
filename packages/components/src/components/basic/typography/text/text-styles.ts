import {
  addImportantToEachRule,
  BreakpointCustomizable,
  buildSlottedStyles,
  calculateLineHeight,
  getBaseSlottedStyles,
  getCss,
  getThemedColors,
  mergeDeep,
  pxToRemWithUnit,
  Styles,
} from '../../../../utils';
import { TextAlign, TextColor, TextSize, TextWeight, Theme } from '../../../../types';
import { font } from '@porsche-design-system/utilities';

const fontSizeMapper: { [key in TextSize]: number } = {
  'x-small': 12,
  small: 16,
  medium: 24,
  large: 36,
  'x-large': 52,
  inherit: 0, // refactor: new type without 'inherit'
};

const getSizeStyle = (size: BreakpointCustomizable<TextSize>) => {
  if (size === 'inherit') {
    return { fontSize: 'inherit', lineHeight: 'inheriti' };
  }

  return {
    fontSize: pxToRemWithUnit(fontSizeMapper[size as TextSize]),
    lineHeight: calculateLineHeight(fontSizeMapper[size as TextSize]),
  };
};

export const getComponentCss = (
  align: TextAlign,
  ellipsis: boolean,
  theme: Theme,
  weight: TextWeight,
  color: TextColor,
  size: BreakpointCustomizable<TextSize>
): string => {
  const {
    baseColor,
    brandColor,
    contrastLowColor,
    contrastMediumColor,
    contrastHighColor,
    successColor,
    warningColor,
    errorColor,
    neutralColor,
  } = getThemedColors(theme);

  const getThemedTextColor = {
    default: baseColor,
    brand: brandColor,
    'neutral-contrast-low': contrastLowColor,
    'neutral-contrast-medium': contrastMediumColor,
    'neutral-contrast-high': contrastHighColor,
    'notification-success': successColor,
    'notification-warning': warningColor,
    'notification-error': errorColor,
    'notification-neutral': neutralColor,
    inherit: 'inherit',
  };

  return getCss(
    mergeDeep<Styles>({
      ':host': {
        display: 'block',
      },
      ...addImportantToEachRule({
        '::slotted(p), ::slotted(address), ::slotted(blockquote), ::slotted(figcaption), ::slotted(cite), ::slotted(time), ::slotted(legend)':
          {
            margin: 0,
            padding: 0,
            fontStyle: 'normal',
            fontSize: 'inherit',
            overflowWrap: 'inherit',
            wordWrap: 'inherit',
            hyphens: 'inherit',
            whiteSpace: 'inherit',
          },
      }),
      root: {
        // what is that for?
        // $bem-block: &;
        '-webkit-text-size-adjust': 'none', // correct key?
        fontFamily: font.family, // nowhere in scss defined!?
        textAlign: 'left',
        padding: 0,
        margin: 0,
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        hyphens: 'auto',
        listStyleType: 'none',
        display: 'inherit',
        color: baseColor,
        whiteSpace: 'inherit',
        transition: 'font-size 1ms linear',
        ...(align && { textAlign: align }), // export for headline?
        ...(weight && { fontWeight: weight }),
        ...(size && getSizeStyle(size)),
        ...(color && { color: getThemedTextColor[color] }),
        ...(ellipsis && {
          // export for headline?
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
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
