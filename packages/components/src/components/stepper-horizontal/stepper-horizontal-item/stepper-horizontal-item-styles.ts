import {
  addImportantToEachRule,
  getInsetJssStyle,
  getInvertedThemedColors,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
} from '../../../styles';
import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  frostedGlassStyle,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getCss, mergeDeep } from '../../../utils';
import type { Theme } from '../../../types';
import type { StepperState } from './stepper-horizontal-item-utils';
import type { JssStyle } from 'jss';
import { getInlineSVGBackgroundImage } from '../../../utils/svg/getInlineSVGBackgroundImage';

const getSVGPath = (count: number, colors: GetColors, isCurrent: boolean): string => {
  colors = Object.entries(colors).reduce(
    (result, [key, value]) => ({ ...result, [key]: value.replace(/#/g, '%23') }),
    {} as GetColors
  );

  const { disabledColor, invertedBaseColor, primaryColor } = colors;
  const fillColor = isCurrent ? invertedBaseColor : disabledColor;

  const svgCirclePath = `<circle fill="${isCurrent ? primaryColor : 'none'}"${
    isCurrent ? '' : ` stroke="${fillColor}"`
  } stroke-width="1px" cx="12" cy="12" r="9"/>`;

  const svgNumberedCirclePaths = {
    1: `${svgCirclePath}<path fill="${fillColor}" d="m12.33,8.67l-2.43.91v-.94l2.6-1.03h.85v8.78h-1.02v-7.72Z"/>`,
    2: `${svgCirclePath}<path fill="${fillColor}" d="m9.46,15.58c0-1.35.73-2.07,1.7-2.72l.95-.63c.78-.52,1.57-1.05,1.57-2.24,0-1.12-.62-1.58-1.7-1.58s-1.68.48-1.78,1.97h-.96c.06-1.82.78-2.91,2.74-2.91s2.72.92,2.72,2.52-.92,2.23-1.79,2.8l-.95.63c-1.11.75-1.52,1.18-1.52,2.01v.16h4.17v.81h-5.15v-.81Z"/>`,
    3: `${svgCirclePath}<path fill="${fillColor}" d="m10.1,13.73c.1,1.43.63,2,1.92,2,1.2,0,1.8-.49,1.8-1.68,0-1.08-.51-1.66-1.8-1.66h-.89v-.9h.83c1.12,0,1.66-.56,1.66-1.53,0-1.08-.64-1.55-1.73-1.55s-1.69.49-1.79,1.97h-.97c.1-1.79.84-2.91,2.76-2.91s2.74.92,2.74,2.49c0,.79-.38,1.54-1.16,1.9.84.28,1.36.92,1.36,2.19,0,1.54-.97,2.49-2.81,2.49-1.96,0-2.8-.9-2.88-2.81h.96Z"/>`,
    4: `${svgCirclePath}<path fill="${fillColor}" d="m8.87,13.6l3.54-5.99h1.43v5.89h1.25v.86h-1.25v2.02h-.99v-2.02h-3.98v-.76Zm3.98-.1v-4.98l-2.91,4.98h2.91Z"/>`,
    5: `${svgCirclePath}<path fill="${fillColor}" d="m9.34,12.45l.42-4.83h4.71v.94h-3.9l-.26,2.95c.38-.43,1-.68,1.79-.68,1.86,0,2.76.9,2.76,2.81,0,2.06-1.03,2.91-2.86,2.91s-2.74-.84-2.81-2.51h.97c.06,1.13.57,1.7,1.84,1.7,1.39,0,1.85-.68,1.85-2.06s-.48-2-1.85-2c-1.07,0-1.54.42-1.75,1.17h-.91v-.39Z"/>`,
    6: `${svgCirclePath}<path fill="${fillColor}" d="m9.97,11.02l2.22-3.4h1.1l-2.27,3.44c.33-.16.69-.23,1.1-.23,1.84,0,2.76.9,2.76,2.81,0,2.06-1.04,2.91-2.86,2.91s-2.87-.85-2.87-2.91c0-1.08.3-1.8.83-2.61Zm2.05,4.71c1.38,0,1.84-.68,1.84-2.05s-.47-2.01-1.84-2.01-1.85.64-1.85,2.01.46,2.05,1.85,2.05Z"/>`,
    7: `${svgCirclePath}<path fill="${fillColor}" d="m9.21,7.61h5.57v.74l-3.58,8.04h-1.05l3.54-7.84h-4.49v-.94Z"/>`,
    8: `${svgCirclePath}<path fill="${fillColor}" d="m10.47,11.94c-.65-.33-1.13-.92-1.13-2.01,0-1.53.85-2.47,2.66-2.47s2.66.94,2.66,2.47c0,1.08-.47,1.68-1.15,2.01.92.35,1.34,1.07,1.34,2.11,0,1.73-.99,2.49-2.86,2.49s-2.86-.76-2.86-2.49c0-1.04.41-1.76,1.33-2.11Zm1.53,3.78c1.27,0,1.85-.51,1.85-1.69,0-1.1-.58-1.61-1.85-1.61s-1.85.52-1.85,1.61c0,1.18.58,1.69,1.85,1.69Zm1.65-5.76c0-1.1-.56-1.56-1.65-1.56s-1.65.47-1.65,1.56c0,1,.46,1.6,1.65,1.6s1.65-.6,1.65-1.6Z"/>`,
    9: `${svgCirclePath}<path fill="${fillColor}" d="m9.16,10.33c0-2.03,1.02-2.86,2.83-2.86s2.82.81,2.82,2.85c0,1.11-.3,1.82-.81,2.64l-2.18,3.44h-1.1l2.18-3.37c-.31.14-.65.2-1.01.2-1.82,0-2.74-.99-2.74-2.9Zm4.65,0c0-1.23-.47-1.92-1.81-1.92s-1.81.69-1.81,1.92c0,1.37.49,2.05,1.81,2.05s1.81-.68,1.81-2.05Z"/>`,
  };

  return svgNumberedCirclePaths[count];
};

type GetColors = {
  primaryColor: string;
  hoverColor: string;
  invertedBaseColor: string;
  disabledColor: string;
  focusColor: string;
};

const getColors = (theme: Theme): GetColors => {
  const { primaryColor, hoverColor, disabledColor, focusColor } = getThemedColors(theme);

  return {
    primaryColor,
    hoverColor,
    invertedBaseColor: getInvertedThemedColors(theme).primaryColor,
    disabledColor,
    focusColor,
  };
};

export const getComponentCss = (state: StepperState, disabled: boolean, theme: Theme): string => {
  const colors = getColors(theme);
  const { primaryColor, hoverColor, disabledColor, focusColor } = colors;

  const isStateCurrent = state === 'current';
  const isStateCurrentOrUndefined = !state || isStateCurrent;
  const isDisabled = !state || disabled;

  return getCss({
    '@global': {
      ':host': {
        ...(isStateCurrentOrUndefined &&
          Array.from(Array(9)).reduce(
            (result, _, i) => ({
              ...result,
              [`&(:nth-of-type(${i + 1})) $button::after`]: {
                backgroundImage: getInlineSVGBackgroundImage(getSVGPath(i + 1, colors, isStateCurrent)),
              },
            }),
            {} as JssStyle
          )),
        ...addImportantToEachRule({
          fontSize: 'inherit',
          transform: 'translate3d(0,0,0)', // creates new stacking context
          ...hostHiddenStyles,
          '&(:not(:last-of-type))': {
            margin: '0 16px 0 0',
          },
        }),
      },
      button: {
        display: 'grid',
        position: 'relative',
        gridTemplateColumns: `${fontLineHeight} minmax(0, auto)`,
        gap: '3px',
        color: isDisabled ? disabledColor : primaryColor,
        transition: getTransition('color'),
        margin: 0,
        padding: '4px 4px 4px 2px',
        background: 0,
        border: 0,
        outline: 0,
        ...textSmallStyle,
        fontSize: 'inherit',
        whiteSpace: 'nowrap',
        width: 'max-content',
        ...mergeDeep({
          '&::before': {
            content: '""',
            position: 'fixed',
            ...getInsetJssStyle(0),
            borderRadius: borderRadiusSmall,
            zIndex: '-1',
            ...(isStateCurrent && {
              ...frostedGlassStyle,
              background: hoverColor,
            }),
          },
          '&:focus::before': {
            border: `${borderWidthBase} solid ${focusColor}`,
            borderRadius: borderRadiusSmall,
          },
          '&:focus:not(:focus-visible)::before': {
            borderColor: 'transparent',
          },
          ...(isStateCurrentOrUndefined
            ? {
                // counter circle icon
                cursor: isDisabled ? 'not-allowed' : 'auto',
                '&::after': {
                  // circle of counter element
                  gridArea: '1 / 1 / 1 / 1',
                  content: '""',
                  position: 'absolute',
                  height: fontLineHeight,
                  width: fontLineHeight,
                },
              }
            : isDisabled
            ? {
                cursor: 'not-allowed',
              }
            : {
                cursor: 'pointer',
                ...hoverMediaQuery({
                  '&::before': {
                    transition: getTransition('background'),
                  },
                  '&:hover::before': {
                    ...frostedGlassStyle,
                    background: hoverColor,
                  },
                }),
              }),
        }),
      },
    },
    label: {
      gridArea: '1 / 2 / 1 / 2',
    },
    ...(!isStateCurrentOrUndefined && {
      // other icons via icon component
      icon: {
        gridArea: '1 / 1 / 1 / 1',
        position: 'absolute',
        height: fontLineHeight,
        width: fontLineHeight,
        transition: getTransition('color'),
      },
    }),
    'sr-only': getScreenReaderOnlyJssStyle(),
  });
};
