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
  const { baseColor, hoverColor, warningColor, successColor } = getThemedColors(theme);
  const { baseColor: invertedBaseColor } = getThemedColors(isThemeDark(theme) ? 'light' : 'dark');
  const colorMap: { [key in StepperState]: string } = {
    current: 'inherit',
    complete: successColor,
    warning: warningColor,
  };

  return { baseColor, hoverColor, iconColor: colorMap[state], invertedBaseColor };
};

export const getComponentCss = (state: StepperState, theme: Theme): string => {
  const { baseColor, hoverColor, iconColor, invertedBaseColor } = getColor(state, theme);
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
                color: invertedBaseColor,
                backgroundColor: baseColor,
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
        color: baseColor,
        transition: getTransition('color'),
        padding: `0 0 0 ${pxToRemWithUnit(28)}`,
        background: 0,
        border: 0,
        textAlign: 'left',
        ...textSmall,
        whiteSpace: 'nowrap',
        ...getFocusJssStyle(),
        ...(!isCurrent && {
          cursor: 'pointer',
          textDecoration: 'underline',
          ...hoverJssStyles,
          '&:hover .icon': {
            color: hoverColor,
          },
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
