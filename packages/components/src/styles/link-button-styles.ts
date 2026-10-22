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
import type { JssStyle, Styles } from 'jss';
import type { ButtonVariant } from '../components/button/button-utils';
import type { LinkVariant } from '../components/link/link-utils';
import type { BreakpointCustomizable, LinkButtonIconName } from '../types';
import { buildResponsiveBooleanStyles, hasVisibleIcon, isTruthyForAnyBreakpoint, mergeDeep } from '../utils';
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

/**
 * Lets the anchor cover its nearest positioned ancestor. Its radius is set via the given CSS variable, e.g. to the one of
 * the card it covers, and otherwise follows a surrounding `p-tile`.
 */
export const getCoverStyles = (cssVarCoverRadius: string): JssStyle => ({
  content: '""',
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  borderRadius: ref(cssVarCoverRadius, ref('--ref-p-tile-radius', '0')),
});

/**
 * Same as `getHiddenTextJssStyle()`, but without positioning, since the label would otherwise be the containing block
 * of the covering area of a slotted anchor.
 */
const getCoverHiddenTextJssStyle = (isHidden: boolean): JssStyle =>
  isHidden
    ? { ...getHiddenTextJssStyle(true), position: 'static', clip: 'auto', color: 'transparent' }
    : getHiddenTextJssStyle(false, { color: 'inherit' });

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
  cssVarRadius: string,
  isCover = false,
  cssVarCoverRadius = ''
): Styles => {
  const { textColor, textColorHover, backgroundColor, backgroundColorHover } = getVariantColors(
    variant,
    cssVariableBackground,
    cssVariableForeground
  );

  const hasIcon = hasVisibleIcon(icon, iconSource) || isTruthyForAnyBreakpoint(hideLabel);

  const paddingBlock = `calc(28px * (${ref(cssVariableInternalScaling)} - 0.64285714) + 6px)`;
  const paddingInline = `calc(33.6px * (${ref(cssVariableInternalScaling)} - 0.64285714) + 16px)`;
  const gap = `calc(11.2px * (${ref(cssVariableInternalScaling)} - 0.64285714) + 4px)`;
  const iconMarginInlineStart = `calc(-1 * (11.2px * (${ref(cssVariableInternalScaling)} - 0.64285714) + 4px))`;

  const spacingStyles: JssStyle = buildResponsiveBooleanStyles(hideLabel, (hideLabelValue: boolean) => ({
    padding: `${ref(cssVarPaddingBlock, paddingBlock)} ${ref(cssVarPaddingInline, hideLabelValue ? paddingBlock : paddingInline)}`,
    gap: ref(cssVarGap, hideLabelValue ? 0 : gap),
  }));

  return {
    '@global': {
      ':host': {
        display: 'inline-block',
        verticalAlign: 'top',
        ...mergeDeep(
          buildResponsiveBooleanStyles(isCompact, (compactValue: boolean) => ({
            [`${cssVariableInternalScaling}`]: compactValue ? 0.64285714 : 1,
            '--_p-link-button-a': compactValue ? ref(radiusLg) : ref(radiusXl),
          })),
          buildResponsiveBooleanStyles(hideLabel, (hideLabelValue: boolean) => ({
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
      display: isCover ? 'grid' : 'flex',
      ...(!isCover && { justifyContent: 'center' }),
      width: '100%', // Allows for setting a width on the host
      minWidth: 'min-content', // Do not shrink beyond icon size + padding + border + label
      boxSizing: 'border-box',
      ...(!isCover && {
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
      }),
      font: `${ref(fontWeightNormal)} ${ref(typescaleSm)} / ${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      borderRadius: 'inherit',
      // creates new stacking context (for slotted anchor + focus), omitted when covering, since it would be the
      // containing block of the covering area
      ...(!isCover && {
        transform: 'translate3d(0,0,0)',
        backgroundColor,
      }),
      color: textColor,
      cursor: 'pointer',
      transition: isCover
        ? getTransition('color')
        : `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`,
      ...(!isCover && spacingStyles),
      ...forcedColorsMediaQuery({
        forcedColorAdjust: 'none',
        boxShadow: 'inset 0 0 0 2px LinkText',
        ...addImportantToEachRule({
          // Overwrites brand hover colors
          background: 'Canvas',
          color: 'LinkText',
        }),
        '&:is(button)': {
          boxShadow: 'inset 0 0 0 2px ButtonBorder',
          ...addImportantToEachRule({
            // Overwrites brand hover colors
            background: 'ButtonFace',
            color: 'ButtonText',
          }),
        },
      }),
      ...(!hasSlottedAnchor &&
        (isCover
          ? {
              // the anchor covers its nearest positioned ancestor, which also renders the focus ring around it
              '&::before': getCoverStyles(cssVarCoverRadius),
              '&:focus-visible': { outline: 'none' },
              '&:focus-visible::before': getFocusBaseStyles(),
            }
          : {
              '&:focus-visible': getFocusBaseStyles(),
            })),
      ...(!isDisabledOrLoading &&
        hoverMediaQuery({
          '&:hover': {
            color: textColorHover,
            ...(!isCover && { backgroundColor: backgroundColorHover }),
          },
          ...(isCover && {
            '&:hover .backdrop': {
              backgroundColor: backgroundColorHover,
            },
          }),
        })),
    },
    ...(isCover && {
      // without `transform` and `backdrop-filter` on the root, it is no containing block of the covering area, so
      // background and content are stacked in the same grid cell instead of being positioned
      backdrop: {
        gridArea: '1/1',
        borderRadius: 'inherit',
        WebkitBackdropFilter: ref(blurFrosted),
        backdropFilter: ref(blurFrosted),
        backgroundColor,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        ...forcedColorsMediaQuery({
          boxShadow: 'inset 0 0 0 2px LinkText',
          ...addImportantToEachRule({
            background: 'Canvas',
          }),
        }),
      },
      content: {
        gridArea: '1/1',
        zIndex: 1, // above the backdrop, since `backdrop-filter` creates a stacking context
        display: 'flex',
        justifyContent: 'center',
        ...spacingStyles,
      },
    }),
    label: buildResponsiveBooleanStyles(hideLabel, isCover ? getCoverHiddenTextJssStyle : getHiddenTextJssStyle),
    ...(hasIcon && {
      icon: {
        font: `${ref(typescaleSm)} ${ref(fontPorscheNext)}`, // needed for correct width/height definition based on ex-unit
        width: ref(leadingNormal), // ensure space is already reserved until icon component is loaded (ssr)
        height: ref(leadingNormal), // ensure space is already reserved until icon component is loaded (ssr)
        ...buildResponsiveBooleanStyles(hideLabel, (hideLabelValue: boolean) => ({
          marginInlineStart: hideLabelValue ? 0 : iconMarginInlineStart, // compensate white space of svg icon and optimize visual alignment
        })),
        ...forcedColorsMediaQuery({
          forcedColorAdjust: 'preserve-parent-color',
          '--_p-icon-a': 'currentColor',
        }),
      },
    }),
  };
};
