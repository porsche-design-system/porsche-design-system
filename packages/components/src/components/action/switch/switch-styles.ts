import type { JssStyle } from 'jss';
import type { BreakpointCustomizable, GetJssStyleFunction } from '../../../utils';
import type { AlignLabel, AlignLabelType, ThemeExtendedElectric } from '../../../types';
import { buildResponsiveStyles, getCss, mergeDeep } from '../../../utils';
import { addImportantToEachRule, getTextHiddenJssStyle, getTransition, pxToRemWithUnit } from '../../../styles';
import { spacing } from '@porsche-design-system/utilities-v2';
import { hoverMediaQuery } from '../../../styles/hover-media-query';
import * as tokens from '../../../../../style-dictionary/build/web/dist/tokens.json';
import * as tokensDark from '../../../../../style-dictionary/build/web/dist/tokens-dark.json';

const { small: spacingSmall } = spacing;

const getColors = (
  checked: boolean,
  isDisabledOrLoading: boolean,
  theme: ThemeExtendedElectric
): {
  backgroundColor: string;
  buttonBorderColor: string;
  buttonBorderColorHover: string;
  buttonBackgroundColor: string;
  buttonBackgroundColorHover: string;
  toggleBackgroundColor: string;
  toggleBackgroundColorHover: string;
  textColor: string;
  borderColor: string;
  borderColorHover: string;
} => {
  const {
    component: { switchCmp },
  } = theme === 'light' ? tokens : tokensDark;

  const switchColors = switchCmp[checked ? 'checked' : 'unchecked'];
  // @ts-ignore
  const { background, buttonBorder, buttonBackground, toggleBackground, text, border } =
    switchColors[isDisabledOrLoading ? 'disabled' : 'standard'];

  const {
    buttonBorder: buttonBorderHover,
    buttonBackground: buttonBackgroundHover,
    toggleBackground: toggleBackgroundHover,
    border: borderHover,
  } = switchColors.hover;

  return {
    backgroundColor: background,
    buttonBorderColor: buttonBorder,
    buttonBackgroundColor: buttonBackground,
    toggleBackgroundColor: toggleBackground,
    textColor: text,
    buttonBorderColorHover: buttonBorderHover,
    buttonBackgroundColorHover: buttonBackgroundHover,
    toggleBackgroundColorHover: toggleBackgroundHover,
    borderColor: border,
    borderColorHover: borderHover,
  };
};

const getAlignLabelJssStyle: GetJssStyleFunction = (alignLabel: AlignLabelType): JssStyle => {
  const styles: { [key in AlignLabelType]: JssStyle } = {
    left: {
      order: 0,
      paddingLeft: 0,
      paddingRight: spacingSmall,
    },
    right: {
      order: 1,
      paddingLeft: spacingSmall,
      paddingRight: 0,
    },
  };
  return styles[alignLabel];
};

const getStretchJssStyle: GetJssStyleFunction = (stretch: boolean): JssStyle => {
  return stretch
    ? {
        width: '100%',
        justifyContent: 'space-between',
      }
    : {
        width: 'auto',
        justifyContent: 'flex-start',
      };
};

export const getComponentCss = (
  alignLabel: AlignLabel,
  hideLabel: BreakpointCustomizable<boolean>,
  stretch: BreakpointCustomizable<boolean>,
  checked: boolean,
  loading: boolean,
  isDisabledOrLoading: boolean,
  theme: ThemeExtendedElectric
): string => {
  const {
    backgroundColor,
    buttonBorderColor,
    buttonBorderColorHover,
    buttonBackgroundColor,
    buttonBackgroundColorHover,
    toggleBackgroundColor,
    toggleBackgroundColorHover,
    textColor,
    borderColor,
    borderColorHover,
  } = getColors(checked, isDisabledOrLoading, theme);

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'flex',
        outline: 0,
      }),
      button: {
        position: 'relative',
        width: pxToRemWithUnit(48),
        height: pxToRemWithUnit(24),
        flexShrink: 0,
        display: 'block',
        margin: 0,
        padding: 0,
        appearance: 'none',
        boxSizing: 'border-box',
        color: buttonBorderColor,
        border: `1px solid ${borderColor}`,
        borderRadius: pxToRemWithUnit(12),
        backgroundColor: buttonBackgroundColor,
        outline: 'none',
        cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
        transition: `${getTransition('background-color')},${getTransition('border-color')},${getTransition('color')}`,
        ...(!isDisabledOrLoading &&
          hoverMediaQuery({
            '&:hover': {
              color: buttonBorderColorHover,
              backgroundColor: buttonBackgroundColorHover,
              borderColor: borderColorHover,
              '& .toggle': {
                backgroundColor: toggleBackgroundColorHover,
              },
              '&:focus': {
                boxShadow: `0 0 0 2px ${backgroundColor}, 0 0 0 3px ${borderColorHover}`,
              },
            },
          })),
        '&:focus': {
          boxShadow: `0 0 0 2px ${backgroundColor}, 0 0 0 3px ${borderColor}`,
        },
        '&:not(:focus-visible)': {
          boxShadow: 'none',
        },
      },
    },
    root: {
      display: 'flex',
      minWidth: 0, // prevents flex child to overflow max available parent size
      minHeight: 0, // prevents flex child to overflow max available parent size
      cursor: isDisabledOrLoading ? 'auto' : 'pointer',
      ...buildResponsiveStyles(stretch, getStretchJssStyle),
    },
    text: {
      minWidth: 0, // prevents flex child to overflow max available parent size
      minHeight: 0, // prevents flex child to overflow max available parent size
      color: textColor,
      ...mergeDeep(
        buildResponsiveStyles(alignLabel, getAlignLabelJssStyle),
        buildResponsiveStyles(hideLabel, getTextHiddenJssStyle)
      ),
    },
    toggle: {
      position: 'absolute',
      top: pxToRemWithUnit(2),
      left: pxToRemWithUnit(2),
      width: pxToRemWithUnit(18),
      height: pxToRemWithUnit(18),
      display: 'block',
      borderRadius: '50%',
      backgroundColor: toggleBackgroundColor,
      transform: `translate3d(${checked ? pxToRemWithUnit(24) : '0'}, 0, 0)`,
      transition: `${getTransition('background-color')},${getTransition('transform')}`,
    },
    ...(loading && {
      spinner: {
        position: 'absolute',
        top: pxToRemWithUnit(-3),
        left: pxToRemWithUnit(-3),
        width: pxToRemWithUnit(24),
        height: pxToRemWithUnit(24),
      },
    }),
  });
};
