import type { Styles, JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../utils';
import type {
  AlignLabel,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  ThemeExtendedElectricDark,
} from '../types';
import { buildResponsiveStyles, hasVisibleIcon, isSizeInherit, mergeDeep, paramCaseToCamelCase } from '../utils';
import {
  addImportantToRule,
  getFocusJssStyle,
  getInsetJssStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
  getScreenReaderOnlyJssStyle,
} from './';
import { fontLineHeight, fontSize, textSmall } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from './hover-media-query';
import { getFontWeight } from './font-weight-styles';

const getSizeJssStyle: GetJssStyleFunction = (textSize: TextSize): JssStyle => {
  if (isSizeInherit(textSize)) {
    return {
      fontSize: 'inherit',
    };
  } else {
    // TODO: We should split this function into 3 separate and use it in root / icon / subline as soon as calculateLineHeight() is performant
    type FontSizeLineHeight = typeof fontSize.small;
    const { fontSize: size }: FontSizeLineHeight = fontSize[paramCaseToCamelCase(textSize)];
    const sublineSize: { [key in Exclude<TextSize, 'inherit'>]: FontSizeLineHeight } = {
      'x-small': fontSize.xSmall,
      small: fontSize.small,
      medium: { fontSize: '1.25rem', lineHeight: fontLineHeight },
      large: { fontSize: '1.875rem', lineHeight: fontLineHeight },
      'x-large': fontSize.large,
    };

    return {
      fontSize: size,
      '& ~ .subline': {
        // TODO: should be referenced
        ...sublineSize[textSize],
        '&::before': {
          fontSize: size,
          marginLeft: fontLineHeight,
        },
      },
    };
  }
};

const getVisibilityJssStyle: GetJssStyleFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? getScreenReaderOnlyJssStyle()
    : {
        position: 'static',
        width: 'auto',
        height: 'auto',
        border: 'medium none color',
        margin: 0,
        whiteSpace: 'inherit',
        overflow: 'visible',
        clip: 'auto',
        clipPath: 'none',
      };
};

const getLabelAlignmentJssStyle: GetJssStyleFunction = (alignLabel: AlignLabel): JssStyle => {
  return alignLabel === 'left'
    ? {
        padding: `0 ${pxToRemWithUnit(4)} 0 0`,
        order: -1,
      }
    : {
        padding: `0 0 0 ${pxToRemWithUnit(4)}`,
        order: 0,
      };
};

/* Needed for slotted anchor and hidden label, which then enlarges the hidden label to equal host size and indents the text to be visually hidden. */
const getSlottedAnchorVisibilityJssStyle: GetJssStyleFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        position: 'absolute',
        ...getInsetJssStyle(),
        whiteSpace: 'nowrap',
        textIndent: '-999999px',
      }
    : {
        position: 'static',
        ...getInsetJssStyle('auto'),
        whiteSpace: 'inherit',
        textIndent: 0,
      };
};

export const getLinkButtonPureStyles = (
  icon: LinkButtonPureIconName,
  active: boolean,
  isDisabledOrLoading: boolean,
  stretch: BreakpointCustomizable<boolean>,
  size: BreakpointCustomizable<TextSize>,
  weight: TextWeight,
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: BreakpointCustomizable<AlignLabel>,
  hasSubline: boolean,
  hasSlottedAnchor: boolean,
  theme: ThemeExtendedElectricDark
): Styles => {
  const { baseColor, hoverColor, activeColor, disabledColor } = getThemedColors(theme);
  const hasIcon = hasVisibleIcon(icon);

  return {
    '@global': {
      ':host': {
        position: 'relative',
        outline: addImportantToRule(0),
        ...buildResponsiveStyles(hasSubline ? false : stretch, (responsiveStretch: boolean) => ({
          display: responsiveStretch ? 'block' : 'inline-block',
          ...(!responsiveStretch && { verticalAlign: 'top' }),
        })),
      },
    },
    // TODO: reduce to only necessary styles (e.g. why boxSizing?)
    // TODO: overhead in link styles when slotted anchor is used
    // TODO: overhead due that link does not need same "reset" styles as button
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      outline: 'transparent none',
      appearance: 'none',
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      textAlign: 'left',
      border: 'none',
      background: 'transparent',
      color: isDisabledOrLoading ? disabledColor : active ? activeColor : baseColor,
      transition: getTransition('color'),
      ...(!hasSlottedAnchor && getFocusJssStyle({ offset: 1, pseudo: '::before' })),
      ...(!isDisabledOrLoading && {
        ...hoverMediaQuery({
          '&:hover': {
            color: hoverColor,
            ...(hasSubline && {
              '& + $subline': {
                color: hoverColor,
              },
            }),
          },
        }),
        '&:active': {
          color: activeColor,
          ...(hasSubline && {
            '& + $subline': {
              color: activeColor,
            },
          }),
        },
      }),
      ...textSmall,
      fontWeight: getFontWeight(weight),
      ...mergeDeep(
        !hasSubline &&
          buildResponsiveStyles(stretch, (stretched: boolean) => ({
            justifyContent: stretched ? 'space-between' : 'flex-start',
          })),
        buildResponsiveStyles(size, getSizeJssStyle)
      ),
    },
    ...(hasIcon && {
      icon: {
        flexShrink: '0',
        width: fontLineHeight,
        height: fontLineHeight,
      },
      label: mergeDeep(
        buildResponsiveStyles(
          hideLabel,
          !hasSlottedAnchor ? getVisibilityJssStyle : getSlottedAnchorVisibilityJssStyle
        ),
        hasSubline ? { paddingLeft: pxToRemWithUnit(4) } : buildResponsiveStyles(alignLabel, getLabelAlignmentJssStyle)
      ),
    }),
    ...(hasSubline && {
      subline: {
        display: 'flex',
        marginTop: addImportantToRule('4px'), // override due to reset of getScreenReaderOnlyJssStyle() in getVisibilityJssStyle
        ...textSmall,
        color: isDisabledOrLoading ? disabledColor : active ? activeColor : baseColor,
        transition: getTransition('color'),
        ...(hasIcon && {
          ...buildResponsiveStyles(hideLabel, getVisibilityJssStyle),
          paddingLeft: pxToRemWithUnit(4),
          '&::before': {
            content: '""',
          },
        }),
      },
    }),
  };
};
