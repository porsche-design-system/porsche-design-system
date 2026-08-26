import {
  blurFrosted,
  colorCanvas,
  colorContrastHigh,
  colorError,
  colorErrorMedium,
  colorFrosted,
  colorFrostedStrong,
  colorPrimary,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  radiusLg,
  radiusXl,
  ref,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { Styles } from 'jss';
import type { ButtonVariant } from '../components/button/button-utils';
import type { LinkVariant } from '../components/link/link-utils';
import type { BreakpointCustomizable, LinkButtonIconName } from '../types';
import { buildResponsiveStyles, hasVisibleIcon, mergeDeep } from '../utils';
import {
  addImportantToEachRule,
  addImportantToRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from './';

type Colors = {
  textColor: string;
  textColorHover: string;
  backgroundColor: string;
  backgroundColorHover: string;
};

const getVariantColors = (
  variant: LinkVariant | ButtonVariant,
  cssVariableBackground: string,
  cssVariableForeground: string
): Colors => {
  const colors: {
    [v in LinkVariant | ButtonVariant]: Colors;
  } = {
    primary: {
      textColor: ref(cssVariableForeground, ref(colorCanvas)),
      textColorHover: ref(cssVariableForeground, ref(colorCanvas)),
      backgroundColor: ref(cssVariableBackground, ref(colorPrimary)),
      backgroundColorHover: ref(cssVariableBackground, ref(colorContrastHigh)),
    },
    secondary: {
      textColor: ref(cssVariableForeground, ref(colorPrimary)),
      textColorHover: ref(cssVariableForeground, ref(colorPrimary)),
      backgroundColor: ref(cssVariableBackground, ref(colorFrostedStrong)),
      backgroundColorHover: ref(cssVariableBackground, ref(colorFrosted)),
    },
    destructive: {
      textColor: ref(cssVariableForeground, ref(colorCanvas)),
      textColorHover: ref(cssVariableForeground, ref(colorPrimary)),
      backgroundColor: ref(cssVariableBackground, ref(colorError)),
      backgroundColorHover: ref(cssVariableBackground, ref(colorErrorMedium)),
    },
  };

  return colors[variant];
};

export const getLinkButtonStyles = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkVariant | ButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  hasSlottedAnchor: boolean,
  isCompact: BreakpointCustomizable<boolean>,
  cssVariableInternalScaling: string,
  cssVariableBackground: string,
  cssVariableForeground: string,
  cssVarPaddingInline: string,
  cssVarPaddingBlock: string,
  cssVarGap: string,
  cssVarRadius: string
): Styles => {
  const { textColor, textColorHover, backgroundColor, backgroundColorHover } = getVariantColors(
    variant,
    cssVariableBackground,
    cssVariableForeground
  );

  const hasIcon = hasVisibleIcon(icon, iconSource) || hideLabel;

  const paddingBlock = `calc(28px * (${ref(cssVariableInternalScaling)} - 0.64285714) + 6px)`;
  const paddingInline = `calc(33.6px * (${ref(cssVariableInternalScaling)} - 0.64285714) + 16px)`;
  const gap = `calc(11.2px * (${ref(cssVariableInternalScaling)} - 0.64285714) + 4px)`;
  const iconMarginInlineStart = `calc(-1 * (11.2px * (${ref(cssVariableInternalScaling)} - 0.64285714) + 4px))`;

  return {
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...mergeDeep(
          buildResponsiveStyles(isCompact, (compactValue: boolean) => ({
            [`${cssVariableInternalScaling}`]: compactValue ? 0.64285714 : 1,
            '--_p-link-button-a': compactValue ? ref(radiusLg) : ref(radiusXl),
          })),
          buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
            borderRadius: addImportantToRule(
              ref(cssVarRadius, hideLabelValue ? ref(radiusFull) : ref('--_p-link-button-a'))
            ),
          }))
        ),
        ...addImportantToEachRule({
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    root: {
      all: 'unset',
      display: 'flex',
      justifyContent: 'center',
      width: '100%', // Allows for setting a width on the host
      minWidth: 'min-content', // Do not shrink beyond icon size + padding + border + label
      boxSizing: 'border-box',
      WebkitBackdropFilter: ref(blurFrosted),
      backdropFilter: ref(blurFrosted),
      font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      borderRadius: 'inherit',
      transform: 'translate3d(0,0,0)', // creates new stacking context (for slotted anchor + focus)
      backgroundColor,
      color: textColor,
      cursor: 'pointer',
      transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
      ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
        padding: `${ref(cssVarPaddingBlock, paddingBlock)} ${ref(cssVarPaddingInline, hideLabelValue ? paddingBlock : paddingInline)}`,
        gap: ref(cssVarGap, hideLabelValue ? 0 : gap),
      })),
      ...forcedColorsMediaQuery({
        forcedColorAdjust: 'none',
        background: 'Canvas',
        color: 'LinkText',
        boxShadow: 'inset 0 0 0 2px LinkText',
        '&:is(button)': {
          boxShadow: 'inset 0 0 0 2px ButtonBorder',
          color: 'ButtonText',
        },
      }),
      ...(!hasSlottedAnchor && {
        '&:focus-visible': getFocusBaseStyles(),
      }),
      ...(!isDisabledOrLoading &&
        hoverMediaQuery({
          '&:hover': {
            color: textColorHover,
            backgroundColor: backgroundColorHover,
            ...forcedColorsMediaQuery({
              background: 'Canvas',
            }),
          },
        })),
    },
    label: buildResponsiveStyles(hideLabel, getHiddenTextJssStyle),
    ...(hasIcon && {
      icon: {
        font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`, // needed for correct width/height definition based on ex-unit
        width: ref(leadingNormal), // ensure space is already reserved until icon component is loaded (ssr)
        height: ref(leadingNormal), // ensure space is already reserved until icon component is loaded (ssr)
        ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
          marginInlineStart: hideLabelValue ? 0 : iconMarginInlineStart, // compensate white space of svg icon and optimize visual alignment
        })),
      },
    }),
  };
};
