import {
  getFocusJssStyle,
  getHoverJssStyle,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  getTransition,
  pxToRemWithUnit,
} from '../../../../styles';
import { textSmall } from '@porsche-design-system/utilities-v2';
import { getCss, isThemeDark } from '../../../../utils';
import type { Theme } from '../../../../types';
import type { StepperState } from './stepper-horizontal-item-utils';
import { hoverMediaQuery } from '../../../../styles/hover-media-query';

const getSvg = (color: string): string =>
  `url("data:image/svg+xml,${encodeURIComponent(`
<svg width="166" height="10" viewBox="0 0 166 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.5306 9H25.5466V8.208H21.4906V8.052C21.4906 7.248 21.8866 6.828 22.9666 6.096L23.8906 5.484C24.7306 4.932 25.6306 4.248 25.6306 2.76C25.6306 1.212 24.7906 0.312 22.9786 0.312C21.0706 0.312 20.3746 1.368 20.3146 3.144H21.2506C21.3466 1.692 21.8746 1.224 22.9786 1.224C24.0346 1.224 24.6346 1.668 24.6346 2.76C24.6346 3.924 23.8666 4.44 23.1106 4.944L22.1866 5.556C21.2386 6.192 20.5306 6.888 20.5306 8.208V9Z" fill="${color}"/>
<path d="M120.291 1.368H124.659L121.215 9H122.235L125.715 1.176V0.456H120.291V1.368Z" fill="${color}"/>
<path d="M140.219 6.72C140.219 8.4 141.179 9.144 143.003 9.144C144.827 9.144 145.787 8.4 145.787 6.72C145.787 5.712 145.379 5.004 144.479 4.668C145.139 4.344 145.595 3.768 145.595 2.712C145.595 1.224 144.791 0.312 143.003 0.312C141.239 0.312 140.411 1.224 140.411 2.712C140.411 3.768 140.879 4.344 141.515 4.668C140.615 5.004 140.219 5.712 140.219 6.72ZM141.203 6.708C141.203 5.64 141.767 5.136 143.003 5.136C144.239 5.136 144.803 5.64 144.803 6.708C144.803 7.86 144.239 8.352 143.003 8.352C141.767 8.352 141.203 7.86 141.203 6.708ZM143.003 4.308C141.839 4.308 141.395 3.72 141.395 2.748C141.395 1.68 141.935 1.224 143.003 1.224C144.071 1.224 144.611 1.68 144.611 2.748C144.611 3.72 144.167 4.308 143.003 4.308Z" fill="${color}"/>
<path d="M162.907 5.916C163.255 5.916 163.591 5.856 163.891 5.724L161.767 9H162.835L164.959 5.652C165.463 4.86 165.751 4.164 165.751 3.084C165.751 1.104 164.755 0.312 163.003 0.312C161.239 0.312 160.243 1.116 160.243 3.096C160.243 4.956 161.131 5.916 162.907 5.916ZM163.003 5.088C161.719 5.088 161.239 4.428 161.239 3.096C161.239 1.896 161.683 1.224 163.003 1.224C164.311 1.224 164.767 1.896 164.767 3.096C164.767 4.428 164.287 5.088 163.003 5.088Z" fill="${color}"/>
<path d="M59.9546 7.032H63.8306V9H64.7906V7.032H66.0026V6.192H64.7906V0.456H63.3986L59.9546 6.288V7.032ZM60.9986 6.192L63.8306 1.344V6.192H60.9986Z" fill="${color}"/>
<path d="M40.2186 6.408C40.3026 8.268 41.1186 9.144 43.0266 9.144C44.8146 9.144 45.7626 8.22 45.7626 6.72C45.7626 5.484 45.2586 4.86 44.4426 4.584C45.1986 4.236 45.5706 3.504 45.5706 2.736C45.5706 1.212 44.7186 0.312 42.9066 0.312C41.0346 0.312 40.3146 1.404 40.2186 3.144H41.1666C41.2626 1.704 41.8386 1.224 42.9066 1.224C43.9626 1.224 44.5866 1.68 44.5866 2.736C44.5866 3.684 44.0586 4.224 42.9666 4.224H42.1626V5.1H43.0266C44.2866 5.1 44.7786 5.664 44.7786 6.72C44.7786 7.872 44.1906 8.352 43.0266 8.352C41.7666 8.352 41.2506 7.8 41.1546 6.408H40.2186Z" fill="${color}"/>
<path d="M100.219 6.312C100.219 8.316 101.203 9.144 103.015 9.144C104.791 9.144 105.799 8.316 105.799 6.312C105.799 4.452 104.899 3.576 103.111 3.576C102.715 3.576 102.367 3.648 102.043 3.804L104.251 0.456H103.183L101.023 3.768C100.507 4.56 100.219 5.256 100.219 6.312ZM101.215 6.36C101.215 5.028 101.683 4.404 103.015 4.404C104.347 4.404 104.803 5.028 104.803 6.36C104.803 7.692 104.359 8.352 103.015 8.352C101.659 8.352 101.215 7.692 101.215 6.36Z" fill="${color}"/>
<path d="M80.4106 5.544H81.2986C81.5026 4.812 81.9586 4.404 83.0026 4.404C84.3346 4.404 84.8026 5.04 84.8026 6.348C84.8026 7.692 84.3586 8.352 83.0026 8.352C81.7666 8.352 81.2746 7.8 81.2146 6.696H80.2666C80.3386 8.328 81.2506 9.144 83.0026 9.144C84.7786 9.144 85.7866 8.316 85.7866 6.312C85.7866 4.452 84.9106 3.576 83.0986 3.576C82.3306 3.576 81.7306 3.816 81.3586 4.236L81.6106 1.368H85.4026V0.456H80.8186L80.4106 5.16V5.544Z" fill="${color}"/>
<path d="M3.32658 9H4.32258V0.456H3.49458L0.962578 1.464V2.376L3.32658 1.488V9Z" fill="${color}"/>
</svg>
  `)}")`;

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

export const getComponentCss = (state: StepperState, disabled: boolean, theme: Theme): string => {
  const { baseColor, hoverColor, iconColor, invertedBaseColor, disabledColor } = getColor(state, theme);
  const isCurrentOrUndefined = state === 'current' || !state;
  const isDisabled = !state || disabled;
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
            position: 'absolute',
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
          ...Array.from(Array(9)).reduce(
            (result, _, i) => ({
              ...result,
              [`&(:nth-of-type(${i + 1}))`]: {
                '& $button::before': {
                  background: `${getSvg(svgColor)} no-repeat ${pxToRemWithUnit(9 - i * 20)} ${pxToRemWithUnit(7)}`,
                },
              },
            }),
            {}
          ),
        }),
      },
      button: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        height: pxToRemWithUnit(24),
        color: isDisabled ? disabledColor : baseColor,
        transition: getTransition('color'),
        margin: 0,
        padding: `0 0 0 ${pxToRemWithUnit(28)}`,
        background: 0,
        border: 0,
        ...textSmall,
        whiteSpace: 'nowrap',
        cursor: isDisabled ? 'not-allowed' : 'auto',
        ...getFocusJssStyle(),
        ...(isCurrentOrUndefined
          ? {
              '&::before': {
                display: 'block',
                position: 'absolute',
                content: '""',
                top: pxToRemWithUnit(12),
                left: pxToRemWithUnit(12),
                transform: 'translate3d(-50%, -50%, 0)',
                width: pxToRemWithUnit(24),
                height: pxToRemWithUnit(24),
              },
            }
          : {
              padding: 0,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              textDecoration: isDisabled ? 'none' : 'underline',
              ...(!isDisabled && {
                ...hoverMediaQuery({
                  ...hoverJssStyles,
                  '&:hover .icon': {
                    color: hoverColor,
                  },
                }),
              }),
            }),
      },
    },
    ...(!isCurrentOrUndefined && {
      icon: {
        color: isDisabled ? disabledColor : iconColor,
        marginRight: pxToRemWithUnit(4),
        transition: getTransition('color'),
      },
    }),

    'sr-only': {
      ...getScreenReaderOnlyJssStyle(),
    },
  });
};
