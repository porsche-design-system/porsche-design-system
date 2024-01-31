import type { JssStyle, Styles } from 'jss';
import type { GetJssStyleFunction } from '../utils';
import { buildResponsiveStyles, hasVisibleIcon, mergeDeep } from '../utils';
import type { AlignLabel, BreakpointCustomizable, LinkButtonIconName, TextSize, Theme } from '../types';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getFocusJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from './';
import {
  borderRadiusSmall,
  fontLineHeight,
  frostedGlassStyle,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getFontSizeText } from './font-size-text-styles';

// TODO: why not using getHiddenTextJssStyle()?
// Needed for slotted anchor and hidden label, which then enlarges the hidden label to equal host size and indents the text to be visually hidden.
const getVisibilityJssStyle: GetJssStyleFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        position: 'absolute',
        inset: 0,
        whiteSpace: 'nowrap',
        textIndent: '-999999px', // TODO: check if text-indent still works for RTL-mode in this case
      }
    : {
        position: 'relative',
        inset: 'auto',
        whiteSpace: 'inherit',
        textIndent: 0,
        zIndex: 1, // fix Firefox bug on :hover (#2583)
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
  size: BreakpointCustomizable<TextSize>,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  hasSlottedAnchor: boolean,
  theme: Theme
): Styles => {
  const { primaryColor, disabledColor, hoverColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    hoverColor: hoverColorDark,
  } = getThemedColors('dark');
  const hasIcon = hasVisibleIcon(icon, iconSource);

  return {
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          transform: 'translate3d(0,0,0)', // creates new stacking context
          outline: 0, // custom element is able to delegate the focus
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
        ...buildResponsiveStyles(stretch, (responsiveStretch: boolean) => ({
          display: responsiveStretch ? 'block' : 'inline-block',
          width: responsiveStretch ? '100%' : 'auto', // prevents adjusting its size when used as flex or grid child
          ...(!responsiveStretch && { verticalAlign: 'top' }),
        })),
      },
    },
    root: {
      display: 'flex',
      gap: spacingStaticXSmall,
      width: '100%',
      padding: 0,
      margin: 0, // Removes default button margin on safari 15
      color: isDisabledOrLoading ? disabledColor : primaryColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: isDisabledOrLoading ? disabledColorDark : primaryColorDark,
      }),
      ...textSmallStyle,
      ...mergeDeep(
        buildResponsiveStyles(stretch, (stretchValue: boolean) => ({
          justifyContent: stretchValue ? 'space-between' : 'flex-start',
          alignItems: stretchValue ? 'center' : 'flex-start',
        })),
        buildResponsiveStyles(size, (sizeValue: TextSize) => ({
          fontSize: getFontSizeText(sizeValue),
        }))
      ),
      '&::before': {
        content: '""',
        position: 'absolute', // mobile Safari -> prevent lagging active state
        top: offsetVertical,
        bottom: offsetVertical,
        ...buildResponsiveStyles(hideLabel, (hideLabelValue: boolean) => ({
          right: hideLabelValue ? offsetVertical : offsetHorizontal,
          left: hideLabelValue ? offsetVertical : offsetHorizontal,
        })),
        borderRadius: borderRadiusSmall,
        transition: getTransition('background-color'),
        ...(active && {
          ...frostedGlassStyle,
          backgroundColor: hoverColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            backgroundColor: hoverColorDark,
          }),
        }),
      },
      ...(!isDisabledOrLoading &&
        hoverMediaQuery({
          '&:hover::before': {
            ...frostedGlassStyle,
            backgroundColor: hoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundColor: hoverColorDark,
            }),
          },
        })),
      ...(!hasSlottedAnchor && getFocusJssStyle(theme, { pseudo: true, offset: '-2px' })),
    },
    label: {
      transition: getTransition('opacity'),
      position: 'relative', // needed for hover state when icon="none" is set
    },
    ...(hasIcon && {
      icon: {
        position: 'relative',
        flexShrink: '0',
        width: fontLineHeight,
        height: fontLineHeight,
        // workaround for Safari to optimize vertical alignment of icons
        // TODO: check if this is still needed after optimized icons are included
        '@supports (width: round(down, 1px, 1px))': {
          width: `round(down, ${fontLineHeight}, 1px)`,
          height: `round(down, ${fontLineHeight}, 1px)`,
        },
      },
      label: mergeDeep(
        buildResponsiveStyles(hideLabel, getVisibilityJssStyle),
        buildResponsiveStyles(alignLabel, (alignLabelValue: AlignLabel) => ({
          // TODO: we should remove 'left' here and map the value in the component class already to 'start' but might be difficult due to breakpoint customizable prop value
          order: alignLabelValue === 'left' || alignLabelValue === 'start' ? -1 : 0,
        }))
      ),
    }),
  };
};
