import {
  getFocusJssStyle,
  getHoverJssStyle,
  // getScreenReaderOnlyJssStyle,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
} from '../../../../styles';
import { textXSmall, textSmall } from '@porsche-design-system/utilities-v2';
import { getCss, isThemeDark } from '../../../../utils';
import type { Theme } from '../../../../types';
import type { StepperState } from './stepper-horizontal-item-utils';

const getColor = (state: StepperState, theme: Theme) => {
  const { baseColor, hoverColor, warningColor, successColor, disabledColor } = getThemedColors(theme);
  const { baseColor: invertedBaseColor } = getThemedColors(isThemeDark(theme) ? 'light' : 'dark');

  const colorMap: { [key in StepperState]: string } = {
    current: 'inherit',
    complete: successColor,
    warning: warningColor,
  };

  return { baseColor, hoverColor, iconColor: colorMap[state], invertedBaseColor, disabledColor };
};

export const getComponentCss = (state: StepperState, isDisabled: boolean, theme: Theme): string => {
  const { baseColor, hoverColor, iconColor, invertedBaseColor, disabledColor } = getColor(state, theme);
  const isCurrentOrUndefined = state === 'current' || state === undefined;
  const hoverJssStyles = getHoverJssStyle();

  return getCss({
    '@global': {
      button: {
        display: 'flex',
        alignItems: 'center',
        height: pxToRemWithUnit(24),
        color: isDisabled ? disabledColor : baseColor,
        transition: getTransition('color'),
        padding: 0,
        background: 0,
        border: 0,
        ...textSmall,
        whiteSpace: 'nowrap',
        cursor: isDisabled ? 'not-allowed' : 'auto',
        ...getFocusJssStyle(),
        ...(!isCurrentOrUndefined && {
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          textDecoration: 'underline',
          ...(!isDisabled && {
            ...hoverJssStyles,
            '&:hover .icon': {
              color: hoverColor,
            },
          }),
        }),
      },
      svg: {
        fill: isDisabled ? 'none' : baseColor,
      },
      ...(isDisabled && {
        circle: {
          borderRadius: '50%',
          outline: `1px solid ${disabledColor}`,
          outlineOffset: '-1px',
        },
      }),
      text: {
        font: textXSmall.font,
        fill: isDisabled ? disabledColor : invertedBaseColor,
      },
    },
    icon: {
      color: iconColor,
      marginRight: pxToRemWithUnit(4),
      transition: getTransition('color'),
    },
    'step-count-svg-wrapper': {
      marginRight: pxToRemWithUnit(4),
      width: pxToRemWithUnit(24),
      height: pxToRemWithUnit(24),
    },
  });
};
