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
        '&::before': {
          ...(isCurrent
            ? {
                color: isDisabled ? disabledColor : invertedBaseColor,
                backgroundColor: isDisabled ? 'none' : baseColor,
                width: pxToRemWithUnit(18),
                height: pxToRemWithUnit(18),
                margin: `${pxToRemWithUnit(3)} ${pxToRemWithUnit(7)} ${pxToRemWithUnit(3)} ${pxToRemWithUnit(3)}`,
                font: textXSmall.font,
                textAlign: 'center',
                alignSelf: 'center',
                borderRadius: '50%',
                content: 'counter(count)',
                counterIncrement: 'count',
                ...(isDisabled && {
                  outline: `1px solid ${disabledColor}`,
                  outlineOffset: '-1px',
                }),
              }
            : {
                content: 'counter(count)',
                counterIncrement: 'count',
                ...getScreenReaderOnlyJssStyle(),
              }),
        },
      }),
      // Display for button?
      button: {
        display: 'inline-block',
        height: pxToRemWithUnit(24),
        color: isDisabled ? disabledColor : baseColor,
        transition: getTransition('color'),
        padding: 0,
        background: 0,
        border: 0,
        alignItems: 'center',
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
      color: iconColor,
      marginRight: pxToRemWithUnit(4),
      transition: getTransition('color'),
    },
  });
};
