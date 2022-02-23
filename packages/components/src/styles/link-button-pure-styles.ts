import type { Styles, JssStyle } from 'jss';
import type { BreakpointCustomizable, GetStyleFunction } from '../utils';
import type { AlignLabel, AlignLabelType, LinkButtonPureIconName, TextSize, ThemeExtendedElectricDark } from '../types';
import type { FontSizeLineHeight } from '@porsche-design-system/utilities-v2';
import { buildResponsiveStyle, generateTypeScale, hasVisibleIcon, mergeDeep, paramCaseToCamelCase } from '../utils';
import { addImportantToRule, getFocusStyle, getInsetStyle, getTransition, pxToRemWithUnit, getThemedColors } from './';
import { fontSize, getScreenReaderOnlyJssStyle } from '@porsche-design-system/utilities-v2';
import { isSizeInherit } from '../components/basic/typography/text/text-utils';

const getHostStyle: GetStyleFunction = (stretch: boolean): JssStyle => ({
  display: addImportantToRule(stretch ? 'block' : 'inline-block'),
  ...(!stretch && { verticalAlign: 'top' }),
});

const getSizeStyle: GetStyleFunction = (textSize: TextSize): JssStyle => {
  if (isSizeInherit(textSize)) {
    return {
      fontSize: 'inherit',
      lineHeight: 'inherit',
      '& $icon': {
        width: '1.5em',
        height: '1.5em',
      },
    };
  } else {
    // TODO: We should split this function into 3 separate and use it in root / icon / subline as soon as calculateLineHeight() is performant
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

const getVisibilityStyle: GetStyleFunction = (hideLabel: boolean): JssStyle => {
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

const getLabelAlignmentStyle: GetStyleFunction = (alignLabel: AlignLabelType): JssStyle => {
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
const getSlottedAnchorVisibilityStyle: GetStyleFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        position: 'absolute',
        ...getInsetStyle(),
        whiteSpace: 'nowrap',
        textIndent: -999999,
      }
    : {
        position: 'static',
        ...getInsetStyle('auto'),
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
  hideLabel: BreakpointCustomizable<boolean>,
  alignLabel: AlignLabel,
  hasSubline: boolean,
  hasSlottedAnchor: boolean,
  theme: ThemeExtendedElectricDark
): Styles => {
  const { baseColor, hoverColor, activeColor, disabledColor } = getThemedColors(theme);
  const hasIcon = hasVisibleIcon(icon);

  return {
    ':host': {
      position: 'relative',
      outline: addImportantToRule(0),
      ...buildResponsiveStyle(hasSubline ? false : stretch, getHostStyle),
    },
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
      ...(!hasSlottedAnchor && getFocusStyle({ offset: 1, pseudo: '::before' })),
      ...(!isDisabledOrLoading && {
        '&:hover': {
          color: hoverColor,
          ...(hasSubline && {
            '& + $subline': {
              color: hoverColor,
            },
          }),
        },
        '&:active': {
          color: activeColor,
          ...(hasSubline && {
            '& + $subline': {
              color: activeColor,
            },
          }),
        },
      }),
      ...mergeDeep(
        !hasSubline &&
          buildResponsiveStyle(
            stretch,
            (stretched: boolean): JssStyle => ({
              justifyContent: stretched ? 'space-between' : 'flex-start',
            })
          ),
        buildResponsiveStyle(size, getSizeStyle)
      ),
    },
    ...(hasIcon && {
      icon: {
        flexShrink: '0',
        width: '1.5em',
        height: '1.5em',
      },
      label: {
        ...mergeDeep(
          buildResponsiveStyle(hideLabel, !hasSlottedAnchor ? getVisibilityStyle : getSlottedAnchorVisibilityStyle),
          !hasSubline && buildResponsiveStyle(alignLabel, getLabelAlignmentStyle)
        ),
        ...(hasSubline && {
          paddingLeft: pxToRemWithUnit(4),
        }),
      },
    }),
    ...(hasSubline && {
      subline: {
        display: 'flex',
        transition: getTransition('color'),
        marginTop: addImportantToRule('4px'), // override due to reset of getScreenReaderOnlyJssStyle() in getVisibilityStyles
        color: isDisabledOrLoading ? disabledColor : active ? activeColor : baseColor,
        ...(hasIcon && {
          ...buildResponsiveStyle(hideLabel, getVisibilityStyle),
          paddingLeft: pxToRemWithUnit(4),
          '&::before': {
            content: '""',
          },
        }),
      },
    }),
  };
};
