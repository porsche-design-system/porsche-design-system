import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { Styles } from 'jss';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import { formElementPaddingHorizontal, getUnitCounterJssStyle } from '../../styles/form-styles';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';
import type { TextareaFieldSizing, TextareaResize } from './textarea-utils';

export const cssVarInternalTextareaScaling = '--p-internal-textarea-scaling';
export const getScalingVar = (compact: boolean) => `var(${cssVarInternalTextareaScaling}, ${compact ? 0.5 : 1})`;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  isDisabled: boolean,
  isReadonly: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  counter: boolean,
  resize: TextareaResize,
  fieldSizing: TextareaFieldSizing,
  theme: Theme
): string => {
  const scalingVar = getScalingVar(compact);

  const minPadding = '2px';
  const minCounterPadding = '12px';

  const basePaddingInline = `max(${minPadding}, calc(${formElementPaddingHorizontal} * ${scalingVar}))`;
  const basePaddingBlock = `max(${minPadding}, calc(12px * ${scalingVar}))`;

  const counterPaddingInline = `max(${minCounterPadding}, calc((${formElementPaddingHorizontal} + ${borderWidthBase}) * ${scalingVar}))`;
  const counterPaddingBlock = `max(${minPadding}, calc(6px * ${scalingVar}))`;

  const paddingBottom = `calc(${fontLineHeight} + ${counterPaddingBlock} * 2 - 4px)`;

  const { primaryColor, contrastLowColor, contrastMediumColor, disabledColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastLowColor: contrastLowColorDark,
    contrastMediumColor: contrastMediumColorDark,
    disabledColor: disabledColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      textarea: {
        resize,
        fieldSizing,
        display: 'block',
        width: '100%',
        height: 'auto',
        margin: 0,
        outline: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        boxSizing: 'border-box',
        border: `${borderWidthBase} solid ${formStateColor || contrastMediumColor}`,
        borderRadius: borderRadiusSmall,
        background: 'transparent',
        textIndent: 0,
        color: primaryColor,
        // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
        minWidth: `calc(1rem + ${formElementPaddingHorizontal}*2 + ${borderWidthBase}*2)`,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: formStateColorDark || contrastMediumColorDark,
          color: primaryColorDark,
        }),
        gridArea: '1/1',
        font: textSmallStyle.font, // to override line-height
        padding: counter
          ? `${basePaddingBlock} ${basePaddingInline} ${paddingBottom}`
          : `${basePaddingBlock} ${basePaddingInline}`,
        // TODO: getFocusJssStyle() can't be re-used because focus style differs for form elements
        '&:focus': {
          borderColor: primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: primaryColorDark,
          }),
        },
        '&:disabled': {
          cursor: 'not-allowed',
          color: disabledColor,
          borderColor: disabledColor,
          WebkitTextFillColor: disabledColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: disabledColorDark,
            borderColor: disabledColorDark,
            WebkitTextFillColor: disabledColorDark,
          }),
        },
        '&[readonly]': {
          borderColor: contrastLowColor,
          background: contrastLowColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: contrastLowColorDark,
            background: contrastLowColorDark,
          }),
        },
      },
      ...(hoverMediaQuery({
        // with the media query the selector has higher priority and overrides disabled styles
        'textarea:not(:disabled):not(:focus):not([readonly]):hover,label:hover~.wrapper textarea:not(:disabled):not(:focus):not([readonly])':
          {
            borderColor: formStateHoverColor || primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: formStateHoverColorDark || primaryColorDark,
            }),
          },
      }) as Styles),
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
    },
    ...(counter && {
      counter: {
        ...getUnitCounterJssStyle(isDisabled, isReadonly, theme),
        gridArea: '1/1',
        placeSelf: 'flex-end',
        padding: `${counterPaddingBlock} ${counterPaddingInline}`,
      },
      // TODO: maybe we should extract it as functional component too
      'sr-only': getHiddenTextJssStyle(),
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
