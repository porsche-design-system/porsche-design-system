import {
  blurFrosted,
  colorFrosted,
  colorFrostedStrong,
  fontPorscheNext,
  fontWeightNormal,
  leadingNormal,
  radiusFull,
  radiusLg,
  ref,
  spacingStaticXs,
  typescaleSm,
} from '@porsche-design-system/stylesheets';
import type { JssStyle, Styles } from 'jss';
import type { ButtonPureColor, ButtonPureSize } from '../components/button-pure/button-pure-utils';
import type { LinkPureColor, LinkPureSize } from '../components/link-pure/link-pure-utils';
import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName } from '../types';
import {
  buildResponsiveBooleanStyles,
  buildResponsiveStyles,
  type GetJssStyleFunction,
  hasVisibleIcon,
  mergeDeep,
} from '../utils';
import {
  addImportantToEachRule,
  forcedColorsMediaQuery,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from './';
import { colorMap, sizeMap } from './maps';

// Needed for slotted anchor and hidden label, which then enlarges the hidden label to equal host size and indents the text to be visually hidden.
const getVisibilityJssStyle: GetJssStyleFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        whiteSpace: 'nowrap',
        textIndent: '-999999px', // Needed because standard sr-only classes don't work here due that we need a bounding box for the focus style
        overflow: 'hidden',
      }
    : {
        whiteSpace: 'inherit',
        textIndent: 0,
        overflow: 'visible',
      };
};

export const offsetVertical = '-2px';
export const offsetHorizontal = '-4px';

export const getLinkButtonPureStyles = (
  icon: LinkButtonIconName,
  iconSource: string,
  active: boolean,
  isDisabledOrLoading: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<ButtonPureSize | LinkPureSize>,
  color: ButtonPureColor | LinkPureColor,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  underline: boolean,
  hasSlottedAnchor: boolean,
  cssVarPaddingInline: string,
  cssVarPaddingBlock: string,
  cssVarHoverInsetInline: string,
  cssVarHoverInsetBlock: string
): Styles => {
  const hasIcon = hasVisibleIcon(icon, iconSource);
  const hoverInsetBlock = ref(cssVarHoverInsetBlock, offsetVertical);
  const hoverInsetInline = ref(cssVarHoverInsetInline, offsetHorizontal);

  return {
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          transform: 'translate3d(0,0,0)', // creates new stacking context
          ...hostHiddenStyles,
        }),
        ...buildResponsiveBooleanStyles(stretch, (responsiveStretch: boolean) => ({
          display: responsiveStretch ? 'block' : 'inline-block',
          width: responsiveStretch ? '100%' : 'auto', // prevents adjusting its size when used as flex or grid child
          ...(!responsiveStretch && { verticalAlign: 'top' }),
        })),
      },
      ...preventFoucOfNestedElementsStyles,
    },
    root: {
      all: 'unset',
      boxSizing: 'border-box',
      paddingInline: ref(cssVarPaddingInline, '0'),
      paddingBlock: ref(cssVarPaddingBlock, '0'),
      display: 'flex',
      width: '100%',
      cursor: 'pointer',
      color: colorMap[color],
      textDecoration: underline ? 'underline' : 'none',
      font: `${ref(fontWeightNormal)} ${ref(typescaleSm)}/${ref(leadingNormal)} ${ref(fontPorscheNext)}`,
      ...mergeDeep(
        buildResponsiveBooleanStyles(hideLabel, (hidelabelValue: boolean) => ({
          gap: hidelabelValue ? 0 : ref(spacingStaticXs),
        })),
        buildResponsiveBooleanStyles(stretch, (stretchValue: boolean) => ({
          justifyContent: stretchValue ? 'space-between' : 'flex-start',
          alignItems: stretchValue ? 'center' : 'flex-start',
        })),
        buildResponsiveStyles(size, (v: ButtonPureSize | LinkPureSize) => ({
          fontSize: sizeMap[v],
        }))
      ),
      ...forcedColorsMediaQuery({
        forcedColorAdjust: 'none',
        color: 'LinkText',
        '&:is(button)': {
          color: 'ButtonText',
        },
      }),
      '&::before': {
        content: '""',
        position: 'absolute', // mobile Safari -> prevent lagging active state
        top: hoverInsetBlock,
        bottom: hoverInsetBlock,
        ...buildResponsiveBooleanStyles(hideLabel, (hideLabelValue: boolean) => ({
          right: hideLabelValue ? ref(cssVarHoverInsetInline, hoverInsetBlock) : hoverInsetInline,
          left: hideLabelValue ? ref(cssVarHoverInsetInline, hoverInsetBlock) : hoverInsetInline,
          borderRadius: hideLabelValue ? ref(radiusFull) : ref(radiusLg),
        })),
        transition: getTransition('background-color'),
        ...(active && {
          WebkitBackdropFilter: ref(blurFrosted),
          backdropFilter: ref(blurFrosted),
          backgroundColor: ref(colorFrosted),
          ...forcedColorsMediaQuery({
            boxShadow: 'inset 0 0 0 2px Highlight',
          }),
        }),
      },
      ...(!isDisabledOrLoading &&
        hoverMediaQuery({
          '&:hover::before': {
            WebkitBackdropFilter: ref(blurFrosted),
            backdropFilter: ref(blurFrosted),
            backgroundColor: ref(colorFrostedStrong),
          },
        })),
      ...(!hasSlottedAnchor && {
        '&:focus-visible::before': getFocusBaseStyles(),
      }),
    },
    ...(hasIcon
      ? {
          icon: {
            position: 'relative',
            flexShrink: '0',
          },
          label: mergeDeep(
            { zIndex: '1' }, // fix Firefox bug on :hover (#2583) & pure-link with nested anchor & hidden label (#3349)
            buildResponsiveBooleanStyles(hideLabel, getVisibilityJssStyle),
            buildResponsiveStyles(alignLabel, (alignLabelValue: AlignLabel) => ({
              order: alignLabelValue === 'start' ? -1 : 0,
            }))
          ),
        }
      : {
          label: {
            position: 'relative', // needed for hover state when icon="none" is set
          },
        }),
  };
};
