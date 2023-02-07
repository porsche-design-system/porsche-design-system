import {
  addImportantToEachRule,
  getInvertedThemedColors,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  getInsetJssStyle,
} from '../../../styles';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  textSmallStyle,
} from '@porsche-design-system/utilities-v2';
import { getCss } from '../../../utils';
import type { Theme } from '../../../types';
import type { StepperState } from './stepper-horizontal-item-utils';
import type { JssStyle } from 'jss';

// source for svg can be found in sprite.sketch file
// svg is created via Sketch export, then run through ImageOptim and optimized via icons package
const getSvg = (color: string): string =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" fill="${color}" width="90" height="10" viewBox="0 0 90 10"><path d="M5.524 9h.996V.456h-.828L3.16 1.464v.912l2.364-.888zm7.006 0h5.017v-.792H13.49v-.156c0-.804.396-1.224 1.476-1.956l.924-.612c.84-.552 1.74-1.236 1.74-2.724 0-1.548-.84-2.448-2.652-2.448-1.908 0-2.604 1.056-2.664 2.832h.936c.096-1.452.624-1.92 1.728-1.92 1.056 0 1.656.444 1.656 1.536 0 1.164-.768 1.68-1.524 2.184l-.924.612c-.948.636-1.656 1.332-1.656 2.652zm9.689-2.592c.084 1.86.9 2.736 2.808 2.736 1.788 0 2.736-.924 2.736-2.424 0-1.236-.504-1.86-1.32-2.136.756-.348 1.128-1.08 1.128-1.848 0-1.524-.852-2.424-2.664-2.424-1.872 0-2.592 1.092-2.688 2.832h.948c.096-1.44.672-1.92 1.74-1.92 1.056 0 1.68.456 1.68 1.512 0 .948-.528 1.488-1.62 1.488h-.804V5.1h.864c1.26 0 1.752.564 1.752 1.62 0 1.152-.588 1.632-1.752 1.632-1.26 0-1.776-.552-1.872-1.944zm9.736.624h3.876V9h.96V7.032h1.212v-.84H36.79V.456h-1.392l-3.444 5.832zm1.044-.84 2.832-4.848v4.848zm9.411-.648h.889c.204-.732.66-1.14 1.704-1.14 1.332 0 1.8.636 1.8 1.944 0 1.344-.444 2.004-1.8 2.004-1.236 0-1.728-.552-1.788-1.656h-.948c.072 1.632.984 2.448 2.736 2.448 1.776 0 2.784-.828 2.784-2.832 0-1.86-.876-2.736-2.688-2.736-.768 0-1.368.24-1.74.66l.252-2.868h3.792V.456h-4.584L42.41 5.16zm9.809.768c0 2.004.984 2.832 2.796 2.832 1.776 0 2.784-.828 2.784-2.832 0-1.86-.9-2.736-2.688-2.736-.396 0-.744.072-1.068.228L56.25.456h-1.068l-2.16 3.312c-.516.792-.804 1.488-.804 2.544zm.996.048c0-1.332.468-1.956 1.8-1.956s1.788.624 1.788 1.956-.444 1.992-1.788 1.992c-1.356 0-1.8-.66-1.8-1.992zm9.075-4.992h4.369L63.215 9h1.02l3.48-7.824v-.72H62.29zm9.929 5.352c0 1.68.96 2.424 2.784 2.424s2.784-.744 2.784-2.424c0-1.008-.408-1.716-1.308-2.052.66-.324 1.116-.9 1.116-1.956 0-1.488-.804-2.4-2.592-2.4-1.764 0-2.592.912-2.592 2.4 0 1.056.468 1.632 1.104 1.956-.9.336-1.296 1.044-1.296 2.052zm.984-.012c0-1.068.564-1.572 1.8-1.572s1.8.504 1.8 1.572c0 1.152-.564 1.644-1.8 1.644s-1.8-.492-1.8-1.644zm1.8-2.4c-1.164 0-1.608-.588-1.608-1.56 0-1.068.54-1.524 1.608-1.524s1.608.456 1.608 1.524c0 .972-.444 1.56-1.608 1.56zm9.904 1.608c.348 0 .684-.06.984-.192L83.767 9h1.068l2.124-3.348c.504-.792.792-1.488.792-2.568 0-1.98-.996-2.772-2.748-2.772-1.764 0-2.76.804-2.76 2.784 0 1.86.888 2.82 2.664 2.82zm.096-.828c-1.284 0-1.764-.66-1.764-1.992 0-1.2.444-1.872 1.764-1.872 1.308 0 1.764.672 1.764 1.872 0 1.332-.48 1.992-1.764 1.992z"/></svg>`
  )}")`;

const getColors = (
  state: StepperState,
  theme: Theme
): {
  primaryColor: string;
  hoverColor: string;
  iconColor: string;
  iconDisabledColor: string;
  invertedBaseColor: string;
  disabledColor: string;
  focusColor: string;
} => {
  const { primaryColor, hoverColor, disabledColor, focusColor } = getThemedColors(theme);

  const stateToColorMap: { [key in Theme]: Record<StepperState, string> } = {
    light: {
      current: 'inherit',
      complete: 'invert(62%) sepia(61%) saturate(551%) hue-rotate(86deg) brightness(86%) contrast(80%)', // We need tokens for this.
      warning: 'invert(74%) sepia(91%) saturate(343%) hue-rotate(348deg) brightness(92%) contrast(86%)',
    },
    dark: {
      current: 'inherit',
      complete: 'invert(59%) sepia(22%) saturate(1342%) hue-rotate(86deg) brightness(96%) contrast(88%)',
      warning: 'invert(72%) sepia(94%) saturate(303%) hue-rotate(354deg) brightness(89%) contrast(94%)',
    },
  };

  return {
    primaryColor,
    hoverColor,
    iconColor: stateToColorMap[theme][state],
    iconDisabledColor: 'invert(40%) sepia(2%) saturate(686%) hue-rotate(187deg) brightness(80%) contrast(94%)', // Is not defined!
    invertedBaseColor: getInvertedThemedColors(theme).primaryColor,
    disabledColor,
    focusColor,
  };
};

// following constants are defined in em to ensure proportional size based on parents font size
// TODO: to be sure counter sizing and positioning is in sync with icon, then we need to use a svg instead
// TODO: simplify calculation of positioning by using css grid and/or svg
const spriteStepSize = 0.625; // 10px / font size in px
const spriteWidth = `${9 * spriteStepSize}em`; // 9 steps
const spriteHeight = `${spriteStepSize}em`; // height of sprite / font size in px
const counterCirclePosition = '0.171875em'; // 2.75px
const counterCircleSize = `calc(${fontLineHeight} - ${counterCirclePosition} * 2)`;
// const counterValuePosition = `calc((${fontLineHeight} - ${spriteStepSize}em) / 2)`;
// const counterValueSize = spriteHeight;

export const getComponentCss = (state: StepperState, disabled: boolean, theme: Theme): string => {
  const { primaryColor, hoverColor, iconColor, iconDisabledColor, invertedBaseColor, disabledColor, focusColor } =
    getColors(state, theme);
  const isStateCurrentOrUndefined = !state || state === 'current';
  const isDisabled = !state || disabled;

  return getCss({
    '@global': {
      ':host': {
        ...(isStateCurrentOrUndefined &&
          Array.from(Array(9)).reduce(
            (result, _, i) => ({
              ...result,
              [`&(:nth-of-type(${i + 1})) $button::after`]: {
                backgroundPositionX: `${-i * spriteStepSize}em`,
              },
            }),
            {} as JssStyle
          )),
        ...addImportantToEachRule({
          fontSize: 'inherit',
          ...hostHiddenStyles,
          '&(:not(:last-of-type))': {
            marginRight: '16px',
          },
        }),
      },
      button: {
        display: 'grid',
        gridTemplateColumns: `${fontLineHeight} minmax(0, auto)`,
        rowGap: '2px',
        position: 'relative',
        color: isDisabled ? disabledColor : primaryColor,
        transition: getTransition('color'),
        margin: 0,
        padding: '4px',
        background: 0,
        border: 0,
        outline: 0,
        borderRadius: borderRadiusSmall,
        ...textSmallStyle,
        fontSize: 'inherit',
        whiteSpace: 'nowrap',
        width: 'max-content',
        '&:focus::before': {
          content: '""',
          position: 'absolute',
          ...getInsetJssStyle(-4),
          border: `${borderWidthBase} solid ${focusColor}`,
          borderRadius: borderRadiusMedium,
        },
        '&:focus:not(:focus-visible)::before': {
          borderColor: 'transparent',
        },
        ...(isStateCurrentOrUndefined
          ? // counter circle icon via css
            {
              cursor: isDisabled ? 'not-allowed' : 'auto',
              // TODO: combine &::before and &::after element
              '&::after': {
                // circle of counter element
                gridArea: '1 / 1 / 1 / 1',
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: counterCirclePosition,
                height: counterCircleSize,
                width: counterCircleSize,
                borderRadius: '50%',
                background: `${getSvg(
                  isDisabled ? disabledColor : invertedBaseColor
                )} 0 50% / ${spriteWidth} ${spriteHeight} no-repeat`,
                ...(isDisabled
                  ? {
                      boxSizing: 'border-box',
                      border: `1px solid ${disabledColor}`,
                    }
                  : {
                      backgroundColor: primaryColor,
                    }),
              },
              // '&::after': {
              //   // value of counter element
              //   content: '""',
              //   position: 'absolute',
              //   top: '50%',
              //   transform: 'translateY(-50%)',
              //   left: counterValuePosition,
              //   width: counterValueSize,
              //   height: counterValueSize,
              // },
            }
          : // other icons via icon component
          isDisabled
          ? {
              cursor: 'not-allowed',
            }
          : {
              cursor: 'pointer',
              ...hoverMediaQuery({
                transition: getTransition('background-color'),
                '&:hover': {
                  backgroundColor: hoverColor,
                },
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
        left: 0,
        height: fontLineHeight,
        width: fontLineHeight,
        filter: isDisabled ? iconDisabledColor : iconColor,
        transition: getTransition('color'),
      },
    }),
    'sr-only': getScreenReaderOnlyJssStyle(),
  });
};
