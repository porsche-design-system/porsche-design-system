import { fontLineHeight, frostedGlassStyle, spacingFluidXSmall, textSmallStyle } from '@porsche-design-system/styles';
import { spacingStaticSm, spacingStaticXs } from '@porsche-design-system/tokens';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  colors,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  getHiddenTextJssStyle,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { legacyRadiusSmall, radiusFull } from '../../../styles/css-variables';
import { getCss } from '../../../utils';
import { getInlineSVGBackgroundImage } from '../../../utils/svg/getInlineSVGBackgroundImage';
import type { StepperHorizontalItemState } from './stepper-horizontal-item-utils';

const svgNumber = [
  '<path d="m12.33 8.67-2.43.91v-.94l2.6-1.03h.85v8.78h-1.02z"/>',
  '<path d="m9.46 15.58c0-1.35.73-2.07 1.7-2.72l.95-.63c.78-.52 1.57-1.05 1.57-2.24 0-1.12-.62-1.58-1.7-1.58s-1.68.48-1.78 1.97h-.96c.06-1.82.78-2.91 2.74-2.91s2.72.92 2.72 2.52-.92 2.23-1.79 2.8l-.95.63c-1.11.75-1.52 1.18-1.52 2.01v.16h4.17v.81h-5.15v-.81z"/>',
  '<path d="m10.1 13.73c.1 1.43.63 2 1.92 2 1.2 0 1.8-.49 1.8-1.68 0-1.08-.51-1.66-1.8-1.66h-.89v-.9h.83c1.12 0 1.66-.56 1.66-1.53 0-1.08-.64-1.55-1.73-1.55s-1.69.49-1.79 1.97h-.97c.1-1.79.84-2.91 2.76-2.91s2.74.92 2.74 2.49c0 .79-.38 1.54-1.16 1.9.84.28 1.36.92 1.36 2.19 0 1.54-.97 2.49-2.81 2.49-1.96 0-2.8-.9-2.88-2.81z"/>',
  '<path d="m8.87 13.6 3.54-5.99h1.43v5.89h1.25v.86h-1.25v2.02h-.99v-2.02h-3.98zm3.98-.1v-4.98l-2.91 4.98z"/>',
  '<path d="m9.34 12.45.42-4.83h4.71v.94h-3.9l-.26 2.95c.38-.43 1-.68 1.79-.68 1.86 0 2.76.9 2.76 2.81 0 2.06-1.03 2.91-2.86 2.91s-2.74-.84-2.81-2.51h.97c.06 1.13.57 1.7 1.84 1.7 1.39 0 1.85-.68 1.85-2.06s-.48-2-1.85-2c-1.07 0-1.54.42-1.75 1.17h-.91v-.39z"/>',
  '<path d="m9.97 11.02 2.22-3.4h1.1l-2.27 3.44c.33-.16.69-.23 1.1-.23 1.84 0 2.76.9 2.76 2.81 0 2.06-1.04 2.91-2.86 2.91s-2.87-.85-2.87-2.91c0-1.08.3-1.8.83-2.61zm2.05 4.71c1.38 0 1.84-.68 1.84-2.05s-.47-2.01-1.84-2.01-1.85.64-1.85 2.01.46 2.05 1.85 2.05z"/>',
  '<path d="m9.21 7.61h5.57v.74l-3.58 8.04h-1.05l3.54-7.84h-4.49v-.94z"/>',
  '<path d="m10.47 11.94c-.65-.33-1.13-.92-1.13-2.01 0-1.53.85-2.47 2.66-2.47s2.66.94 2.66 2.47c0 1.08-.47 1.68-1.15 2.01.92.35 1.34 1.07 1.34 2.11 0 1.73-.99 2.49-2.86 2.49s-2.86-.76-2.86-2.49c0-1.04.41-1.76 1.33-2.11zm1.53 3.78c1.27 0 1.85-.51 1.85-1.69 0-1.1-.58-1.61-1.85-1.61s-1.85.52-1.85 1.61c0 1.18.58 1.69 1.85 1.69zm1.65-5.76c0-1.1-.56-1.56-1.65-1.56s-1.65.47-1.65 1.56c0 1 .46 1.6 1.65 1.6s1.65-.6 1.65-1.6z"/>',
  '<path d="m9.16 10.33c0-2.03 1.02-2.86 2.83-2.86s2.82.81 2.82 2.85c0 1.11-.3 1.82-.81 2.64l-2.18 3.44h-1.1l2.18-3.37c-.31.14-.65.2-1.01.2-1.82 0-2.74-.99-2.74-2.9zm4.65 0c0-1.23-.47-1.92-1.81-1.92s-1.81.69-1.81 1.92c0 1.37.49 2.05 1.81 2.05s1.81-.68 1.81-2.05z"/>',
];

const { primaryColor, canvasColor, frostedColor } = colors;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (state: StepperHorizontalItemState, disabled: boolean): string => {
  const isStateCurrent = state === 'current';
  const isStateCurrentOrUndefined = !state || isStateCurrent;
  const isDisabled = !state || disabled;

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          fontSize: 'inherit',
          ...hostHiddenStyles,
          ...(isDisabled && getDisabledBaseStyles()),
          '&(:not(:last-of-type))': {
            marginInlineEnd: spacingFluidXSmall,
          },
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      button: {
        all: 'unset',
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0,1fr)',
        gap: spacingStaticXs,
        color: primaryColor,
        paddingInline: `${spacingStaticSm} 12px`,
        paddingBlock: '6px',
        width: 'max-content',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        font: textSmallStyle.font,
        fontSize: 'inherit', // necessary because of all: unset
        borderRadius: `var(${legacyRadiusSmall}, ${radiusFull})`,
        ...(isStateCurrent && {
          ...frostedGlassStyle,
          background: frostedColor,
        }),
        ...(!isDisabled &&
          hoverMediaQuery({
            transition: getTransition('background-color'),
            '&:hover': {
              ...frostedGlassStyle,
              background: frostedColor,
            },
          })),
        '&:focus-visible': getFocusBaseStyles(),
      },
    },
    icon: {
      font: textSmallStyle.font,
      fontSize: 'inherit', // necessary because of all: unset
      width: fontLineHeight,
      height: fontLineHeight,
      ...(isStateCurrentOrUndefined && {
        display: 'grid',
        backgroundImage: `radial-gradient(circle, ${primaryColor} 60%, transparent 62%)`,
        '&::before': {
          content: '""',
          ...Array.from(new Array(9)).reduce(
            (result, _, i) => ({
              ...result,
              [`:host(:nth-of-type(${i + 1})) &`]: {
                WebkitMask: `${getInlineSVGBackgroundImage(svgNumber[i])} center/contain no-repeat`, // necessary for Sogou browser support :-)
                mask: `${getInlineSVGBackgroundImage(svgNumber[i])} center/contain no-repeat`,
                backgroundColor: canvasColor,
              },
            }),
            {} as JssStyle
          ),
        },
      }),
    },
    'sr-only': getHiddenTextJssStyle(),
  });
};
