import type { Styles } from 'jss';
import type { BreakpointCustomizable, LinkButtonIconName, LinkButtonVariant } from '../types';
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
import {
  blurFrosted,
  colorCanvas,
  colorContrastHigh,
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

type Colors = {
  textColor: string;
  backgroundColor: string;
  backgroundColorHover: string;
};

const getVariantColors = (variant: LinkButtonVariant): Colors => {
  const colors: {
    [v in LinkButtonVariant]: Colors;
  } = {
    primary: {
      textColor: ref(colorCanvas),
      backgroundColor: ref(colorPrimary),
      backgroundColorHover: ref(colorContrastHigh),
    },
    secondary: {
      textColor: ref(colorPrimary),
      backgroundColor: ref(colorFrostedStrong),
      backgroundColorHover: ref(colorFrosted),
    },
  };

  return colors[variant];
};

export const getLinkButtonStyles = (
  icon: LinkButtonIconName,
  iconSource: string,
  variant: LinkButtonVariant,
  hideLabel: BreakpointCustomizable<boolean>,
  isDisabledOrLoading: boolean,
  hasSlottedAnchor: boolean,
  isCompact: BreakpointCustomizable<boolean>,
  cssVariableInternalScaling: string
): Styles => {
  const { textColor, backgroundColor, backgroundColorHover } = getVariantColors(variant);

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
            borderRadius: addImportantToRule(hideLabelValue ? ref(radiusFull) : ref('--_p-link-button-a')),
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
        padding: hideLabelValue ? paddingBlock : `${paddingBlock} ${paddingInline}`,
        gap: hideLabelValue ? 0 : gap,
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
