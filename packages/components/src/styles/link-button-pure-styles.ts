import type { BreakpointCustomizable, GetStylesFunction, JssStyle, Styles } from '../utils';
import {
  addImportantToRule,
  buildResponsiveStyles,
  generateTypeScale,
  getFocusStyles,
  getInset,
  getThemedColors,
  getTransition,
  hasVisibleIcon,
  mergeDeep,
  paramCaseToCamelCase,
  pxToRemWithUnit,
} from '../utils';
import { fontSize, FontSizeLineHeight, srOnly } from '@porsche-design-system/utilities';
import type { AlignLabel, AlignLabelType, LinkButtonPureIconName, TextSize, ThemeExtendedElectricDark } from '../types';
import { isSizeInherit } from '../components/basic/typography/text/text-utils';

const getHostStyles: GetStylesFunction = (stretch: boolean): JssStyle => ({
  display: addImportantToRule(stretch ? 'block' : 'inline-block'),
  ...(!stretch && { verticalAlign: 'top' }),
});

const getSizeStyles: GetStylesFunction = (textSize: TextSize): JssStyle => {
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
    const { fontSize: size, lineHeight } = fontSize[paramCaseToCamelCase(textSize)];
    const lineHeightWithUnit = `${lineHeight}em`;
    const sublineSize: { [key in Exclude<TextSize, 'inherit'>]: FontSizeLineHeight } = {
      'x-small': fontSize.xSmall,
      small: fontSize.small,
      medium: fontSize['20'],
      large: fontSize['30'],
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

const getVisibilityStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? (srOnly() as JssStyle)
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

const getLabelAlignmentStyles: GetStylesFunction = (alignLabel: AlignLabelType): JssStyle => {
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
const getSlottedAnchorVisibilityStyles: GetStylesFunction = (hideLabel: boolean): JssStyle => {
  return hideLabel
    ? {
        position: 'absolute',
        ...getInset(),
        whiteSpace: 'nowrap',
        textIndent: -999999,
      }
    : {
        position: 'static',
        ...getInset('auto'),
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
      ...buildResponsiveStyles(hasSubline ? false : stretch, getHostStyles),
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
      ...(!hasSlottedAnchor && getFocusStyles({ offset: 1, pseudo: '::before' })),
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
          buildResponsiveStyles(
            stretch,
            (stretched: boolean): JssStyle => ({
              justifyContent: stretched ? 'space-between' : 'flex-start',
            })
          ),
        buildResponsiveStyles(size, getSizeStyles)
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
          buildResponsiveStyles(hideLabel, !hasSlottedAnchor ? getVisibilityStyles : getSlottedAnchorVisibilityStyles),
          !hasSubline && buildResponsiveStyles(alignLabel, getLabelAlignmentStyles)
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
        marginTop: addImportantToRule('4px'), // override due to reset of srOnly in getVisibilityStyles
        color: isDisabledOrLoading ? disabledColor : active ? activeColor : baseColor,
        ...(hasIcon && {
          ...buildResponsiveStyles(hideLabel, getVisibilityStyles),
          paddingLeft: pxToRemWithUnit(4),
          '&::before': {
            content: '""',
          },
        }),
      },
    }),
  };
};
