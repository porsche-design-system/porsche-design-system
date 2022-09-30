import type { Styles, JssStyle } from 'jss';
import type { GetJssStyleFunction } from '../utils';
import type {
  AlignLabel,
  AlignLabelType,
  BreakpointCustomizable,
  LinkButtonPureIconName,
  TextSize,
  TextWeight,
  ThemeExtendedElectricDark,
} from '../types';
import {
  buildResponsiveStyles,
  generateTypeScale,
  hasVisibleIcon,
  isSizeInherit,
  mergeDeep,
  paramCaseToCamelCase,
} from '../utils';
import {
  addImportantToRule,
  getFocusJssStyle,
  getInsetJssStyle,
  getTransition,
  pxToRemWithUnit,
  getThemedColors,
  getScreenReaderOnlyJssStyle,
} from './';
import { fontSize, textSmall } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from './hover-media-query';
import { getFontWeight } from './font-weight-styles';

const getSizeJssStyle: GetJssStyleFunction = (textSize: TextSize): JssStyle => {
  if (isSizeInherit(textSize)) {
    return {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      '& .icon': {
        width: '1.5em',
        height: '1.5em',
      },
    };
  } else {
    // TODO: We should split this function into 3 separate and use it in root / icon / subline as soon as calculateLineHeight() is performant
    type FontSizeLineHeight = typeof fontSize.small;
    const { fontSize: size, lineHeight }: FontSizeLineHeight = fontSize[paramCaseToCamelCase(textSize)];
    const lineHeightWithUnit = `${lineHeight}em`;
    const sublineSize: { [key in Exclude<TextSize, 'inherit'>]: FontSizeLineHeight } = {
      'x-small': fontSize.xSmall,
      small: fontSize.small,
      medium: { fontSize: '1.25rem', lineHeight: 1.4 },
      large: { fontSize: '1.875rem', lineHeight: 1.3333333333 },
      'x-large': fontSize.large,
    };

    return {
      ...generateTypeScale(size),
      '& .icon': {
        // TODO: should be referenced
        width: lineHeightWithUnit,
        height: lineHeightWithUnit,
      },
      '& ~ .subline': {
        // TODO: should be referenced
        ...sublineSize[textSize],
        '&::before': {
          fontSize: size,
          marginLeft: lineHeightWithUnit,
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

const getLabelAlignmentJssStyle: GetJssStyleFunction = (alignLabel: AlignLabelType): JssStyle => {
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
  alignLabel: AlignLabel,
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
          display: addImportantToRule(responsiveStretch ? 'block' : 'inline-block'),
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
      transition: `${getTransition('color')}, font-size 1ms linear`, // used for transitionend event listener
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
        width: '1.5em',
        height: '1.5em',
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
