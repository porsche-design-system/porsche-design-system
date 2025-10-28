import {
  borderRadiusSmall,
  borderWidthBase,
  spacingStaticLarge,
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
import type { TextareaResize } from './textarea-utils';

export const getComponentCss = (
  isDisabled: boolean,
  isReadonly: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  counter: boolean,
  resize: TextareaResize,
  theme: Theme
): string => {
  const { primaryColor, contrast20Color, contrast50Color, contrast40Color } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrast20Color: contrast20ColorDark,
    contrast50Color: contrast50ColorDark,
    contrast40Color: contrast40ColorDark,
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
        display: 'block',
        width: '100%',
        height: 'auto',
        margin: 0,
        outline: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        boxSizing: 'border-box',
        border: `${borderWidthBase} solid ${formStateColor || contrast50Color}`,
        borderRadius: borderRadiusSmall,
        background: 'transparent',
        textIndent: 0,
        color: primaryColor,
        // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character.
        minWidth: `calc(1rem + ${formElementPaddingHorizontal}*2 + ${borderWidthBase}*2)`,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: formStateColorDark || contrast50ColorDark,
          color: primaryColorDark,
        }),
        gridArea: '1/1',
        font: textSmallStyle.font, // to override line-height
        padding: counter
          ? `12px ${formElementPaddingHorizontal} ${spacingStaticLarge}`
          : `12px ${formElementPaddingHorizontal}`,
        // TODO: getFocusJssStyle() can't be re-used because focus style differs for form elements
        '&:focus': {
          borderColor: primaryColor,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: primaryColorDark,
          }),
        },
        '&:disabled': {
          cursor: 'not-allowed',
          color: contrast40Color,
          borderColor: contrast40Color,
          WebkitTextFillColor: contrast40Color,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            color: contrast40ColorDark,
            borderColor: contrast40ColorDark,
            WebkitTextFillColor: contrast40ColorDark,
          }),
        },
        '&[readonly]': {
          borderColor: contrast20Color,
          background: contrast20Color,
          ...prefersColorSchemeDarkMediaQuery(theme, {
            borderColor: contrast20ColorDark,
            background: contrast20ColorDark,
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
        padding: `6px calc(${formElementPaddingHorizontal} + ${borderWidthBase})`,
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
