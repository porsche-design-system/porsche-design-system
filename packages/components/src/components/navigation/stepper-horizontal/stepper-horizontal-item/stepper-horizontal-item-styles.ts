import {
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

const getSvg = (step: number, color: string) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='100%25' height='100%25'  font-family='Arial'%3E%3Ctext line-height='1.125rem' font-size='0.75rem' font-weight='400' style='fill: %23${color};' x='12' y='16' text-anchor='middle'%3E${step}%3C/text%3E%3C/svg%3E")`;

const getColor = (
  state: StepperState,
  theme: Theme
): { baseColor: string; hoverColor: string; iconColor: string; invertedBaseColor: string; disabledColor: string } => {
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

  const svgColor = isDisabled ? disabledColor : invertedBaseColor;

  return getCss({
    '@global': {
      ':host': {
        display: 'flex',
        position: 'relative',
        ...(isCurrentOrUndefined && {
          '&::before': {
            display: 'block',
            content: '""',
            backgroundColor: isDisabled ? 'none' : baseColor,
            width: pxToRemWithUnit(18),
            height: pxToRemWithUnit(18),
            margin: `${pxToRemWithUnit(3)} ${pxToRemWithUnit(7)} ${pxToRemWithUnit(3)} ${pxToRemWithUnit(3)}`,
            borderRadius: '50%',
            boxSizing: 'border-box',
            ...(isDisabled && {
              border: `1px solid ${disabledColor}`,
            }),
          },
          '&::after': {
            display: 'block',
            position: 'absolute',
            top: pxToRemWithUnit(12),
            left: pxToRemWithUnit(12),
            transform: 'translate3d(-50%, -50%, 0)',
            width: pxToRemWithUnit(24),
            height: pxToRemWithUnit(24),
            color: svgColor,
            font: textXSmall.font,
          },
          ...Array.from(Array(9)).reduce(
            (result, _, i) => ({
              ...result,
              [`&(:nth-of-type(${i + 1}))::after`]: {
                content: getSvg(i + 1, svgColor.slice(1)),
              },
            }),
            {}
          ),
        }),
      },
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
          textDecoration: isDisabled ? 'none' : 'underline',
          ...(!isDisabled && {
            ...hoverJssStyles,
            '&:hover .icon': {
              color: hoverColor,
            },
          }),
        }),
      },
      // text: {
      //   font: textXSmall.font,
      //   fill: isDisabled ? disabledColor : invertedBaseColor,
      // },
    },
    // ...(isCurrentOrUndefined
    //   ? {
    //       circle:
    //         state === 'current'
    //           ? {
    //               fill: baseColor,
    //             }
    //           : {
    //               fill: 'none',
    //               stroke: disabledColor,
    //             },
    //       'step-count-svg-wrapper': {
    //         marginRight: pxToRemWithUnit(4),
    //         width: pxToRemWithUnit(24),
    //         height: pxToRemWithUnit(24),
    //       },
    //     }
    //   : {
    icon: {
      color: isDisabled ? disabledColor : iconColor,
      marginRight: pxToRemWithUnit(4),
      transition: getTransition('color'),
    },
    // }),
    'sr-only': {
      ...getScreenReaderOnlyJssStyle(),
    },
  });
};
