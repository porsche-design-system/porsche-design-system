import {
  addImportantToEachRule,
  getFocusJssStyle,
  getHoverJssStyle,
  getScreenReaderOnlyJssStyle,
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
  const isCurrent = state === 'current';
  const hoverJssStyles = getHoverJssStyle();

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'inline-flex',
        verticalAlign: 'top',
        position: 'relative',
        '&::before': {
          ...(isCurrent
            ? {
                position: 'absolute',
                color: isDisabled ? disabledColor : invertedBaseColor,
                backgroundColor: isDisabled ? 'none' : baseColor,
                width: '20px',
                height: '20px',
                textAlign: 'center',
                borderRadius: '50%',
                content: 'counter(count)',
                counterIncrement: 'count',
                top: 0,
                left: 0,
                transform: 'translate3d(4px, 4px, 0)',
                font: textXSmall.font,
                ...(isDisabled && {
                  boxSizing: 'border-box',
                  border: `1px solid ${disabledColor}`,
                }),
              }
            : {
                content: 'counter(count)',
                counterIncrement: 'count',
                ...getScreenReaderOnlyJssStyle(),
              }),
        },
      }),
      button: {
        position: 'relative',
        height: pxToRemWithUnit(28),
        color: isDisabled ? disabledColor : baseColor,
        transition: getTransition('color'),
        padding: `0 0 0 ${pxToRemWithUnit(28)}`,
        background: 0,
        border: 0,
        textAlign: 'left',
        ...textSmall,
        whiteSpace: 'nowrap',
        cursor: isDisabled ? 'not-allowed' : 'auto',
        ...getFocusJssStyle(),
        ...(!isCurrent && {
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
    },
    icon: {
      position: 'absolute',
      color: iconColor,
      top: '50%',
      left: 0,
      transform: 'translate3d(0, -50%, 0)',
      transition: getTransition('color'),
    },
  });
};
