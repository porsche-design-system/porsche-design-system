import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import type { JssStyle } from 'jss';
import {
  addImportantToEachRule,
  addImportantToRule,
  colorSchemeStyles,
  getHiddenTextJssStyle,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import {
  formButtonOrIconPadding,
  formElementLayeredGap,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
} from '../../../styles/form-styles';
import { OPTION_HEIGHT } from '../../../styles/option-styles';
import { getPlaceholderJssStyle } from '../../../styles/placeholder';
import { getPopoverResetJssStyle } from '../../../styles/popover-reset-styles';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { type SelectDropdownDirectionInternal, getCss, isHighContrastMode } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';

/**
 * @css-variable {"name": "--p-select-background-color", "description": "Background color of select.", "defaultValue": "backgroundColor"}
 */
const cssVarBackgroundColor = '--p-select-background-color';
/**
 * @css-variable {"name": "--p-select-text-color", "description": "Text color of select", "defaultValue": "primaryColor"}
 */
const cssVarTextColor = '--p-select-text-color';
/**
 * @css-variable {"name": "--p-select-border-color", "description": "Border color of select", "defaultValue": "primaryColor"}
 */
const cssVarBorderColor = '--p-select-border-color';
/**
 * @css-variable {"name": "--p-select-icon-filter", "description": "Position top of banner", "defaultValue": "56px"}
 */
const cssVarIconFilter = '--p-select-icon-filter';
/**
 * @css-variable {"name": "--p-select-focus-background-color", "description": "Background color to be applied when focused.", "defaultValue": "backgroundColor"}
 */
const cssVarBackgroundColorFocus = '--p-select-focus-background-color';
/**
 * @css-variable {"name": "--p-select-focus-border-color", "description": "Border color to be applied when focused.", "defaultValue": "primaryColor"}
 */
const cssVarBorderColorFocus = '--p-select-focus-border-color';

export const cssVarInternalSelectScaling = '--p-internal-select-scaling';

export const getComponentCss = (
  direction: SelectDropdownDirectionInternal,
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isNativePopoverCase: boolean,
  compact: boolean,
  theme: Theme,
  hasSlottedImage: boolean
): string => {
  // Determines the scaling factor for the select size. In "compact" mode, it uses 0.5 to achieve a 36px select (compact size).
  // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalSelectScaling`.
  const scalingVar = `var(${cssVarInternalSelectScaling}, ${compact ? 0.5 : 1})`;

  const gap = `max(2px, ${scalingVar} * ${spacingStaticXSmall})`;
  const gridTemplateColumns = `minmax(0, 1fr) auto auto calc(max(2px, ${scalingVar} * ${formElementLayeredGap}) + ${borderWidthBase})`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      '::slotted(*)': addImportantToEachRule({
        '--p-internal-select-option-scaling': scalingVar,
        '--p-internal-optgroup-scaling': scalingVar,
      }),
      ...preventFoucOfNestedElementsStyles,
      button: getButtonStyles(isDisabled, direction, isOpen, state, compact, theme, hasSlottedImage),
    },
    root: {
      display: 'grid',
      gap,
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(1)})`,
    },
    wrapper: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns,
    },
    icon: {
      gridArea: '1/3',
      placeSelf: 'center',
      padding: formButtonOrIconPadding,
      pointerEvents: 'none',
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
      transition: getTransition('transform'),
      ...(!isHighContrastMode && {
        filter: `var(${cssVarIconFilter})`,
      }),
      '&--rotate': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
    listbox: getListStyles(isOpen, direction, compact, theme),
    'sr-only': getHiddenTextJssStyle(),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
    ...(isNativePopoverCase && {
      popover: {
        ...getPopoverResetJssStyle(),
      },
    }),
  });
};

// TODO: Rename to JSSStyles
// TODO: use getSlottedTextFieldTextareaSelectStyles() instead an manipulate selectors like done with PIN Code or even better make it configurable as parameter
const getButtonStyles = (
  isDisabled: boolean,
  direction: SelectDropdownDirectionInternal,
  isOpen: boolean,
  state: FormState,
  compact: boolean,
  theme: Theme,
  hasSlottedImage: boolean
): JssStyle => {
  const isDirectionDown = direction === 'down';
  const { primaryColor, disabledColor, backgroundColor, contrastMediumColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    backgroundColor: backgroundColorDark,
    contrastMediumColor: contrastMediumColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

  const scalingVar = `var(${cssVarInternalSelectScaling}, ${compact ? 0.5 : 1})`;

  const height = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;
  const paddingBlock = `max(2px, ${scalingVar} * ${formElementPaddingVertical})`;
  const paddingInline = `max(4px, ${scalingVar} * ${formElementPaddingHorizontal}) ${getCalculatedFormElementPaddingHorizontal(1)}`;

  const gap = `max(4px, ${scalingVar} * 12px)`;

  return {
    textAlign: 'start', // TODO: Newly added (rest is copied from select-wrapper-dropdown), share rest for both components
    overflowX: 'hidden', // TODO: Newly added (rest is copied from select-wrapper-dropdown), share rest for both components
    whiteSpace: 'nowrap', // TODO: Newly added (rest is copied from select-wrapper-dropdown), share rest for both components
    gridArea: '1/1/1/-1',
    minWidth: 0,
    // TODO: abstract and re-use for multi-select, select-wrapper and text-field-wrapper
    height,
    font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
    margin: 0, // necessary reset for iOS Safari 15 (and maybe other browsers)
    paddingBlock,
    paddingInline,
    boxSizing: 'content-box',
    outline: 0,
    WebkitAppearance: 'none', // iOS safari
    appearance: 'none',
    ...textSmallStyle,
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'not-allowed',
    },
    transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
    color: `var(${cssVarTextColor}, ${primaryColor})`,
    background: `var(${cssVarBackgroundColor}, ${backgroundColor})`,
    border: `${borderWidthBase} solid var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateColor || contrastMediumColor})`,
    borderRadius: borderRadiusSmall,
    '&:not(:focus-visible)': {
      ...getPlaceholderJssStyle({
        color: `var(${cssVarTextColor}, ${primaryColor})`,
        opacity: 1,
      }),
      ...prefersColorSchemeDarkMediaQuery(
        theme,
        getPlaceholderJssStyle({
          color: `var(${cssVarTextColor}, ${primaryColorDark})`,
          opacity: 1, // Opacity fixes placeholder being shown lighter in firefox
        })
      ),
    },
    ...(hasSlottedImage && {
      '& > span': {
        display: 'flex',
        gap,
        alignItems: 'center',
      },
      '& > span > span': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      '& img': {
        height: fontLineHeight,
        borderRadius: borderRadiusSmall,
        width: 'auto',
      },
    }),
    ...hoverMediaQuery({
      '&:hover:not(:disabled):not(:focus-visible),label:hover~.wrapper &:not(:disabled):not(:focus-visible)': {
        borderColor: `var(${cssVarBorderColor}, ${isOpen ? primaryColor : formStateHoverColor || primaryColor})`,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: `var(${cssVarBorderColor}, ${isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark})`,
        }),
      },
    }),
    ...(!isDisabled && {
      '&:focus-visible': {
        borderColor: `var(${cssVarBorderColorFocus}, ${primaryColor})`,
        background: `var(${cssVarBackgroundColorFocus}, ${backgroundColor})`,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: `var(${cssVarBorderColorFocus}, ${primaryColorDark})`,
          background: `var(${cssVarBackgroundColorFocus}, ${backgroundColorDark})`,
        }),
      },
    }),
    ...(isOpen && {
      [isDirectionDown ? 'paddingBottom' : 'paddingTop']: `calc(${paddingBlock} + 1px)`, // Add padding to keep same height when border changes
      [isDirectionDown ? 'borderBottom' : 'borderTop']: addImportantToRule(`1px solid ${contrastMediumColor}`),
      [isDirectionDown ? 'borderBottomLeftRadius' : 'borderTopLeftRadius']: 0,
      [isDirectionDown ? 'borderBottomRightRadius' : 'borderTopRightRadius']: 0,
    }),
    ...(isDisabled && {
      ...getPlaceholderJssStyle({
        color: disabledColor,
      }),
      cursor: 'not-allowed',
      color: disabledColor,
      borderColor: disabledColor,
      WebkitTextFillColor: disabledColor,
    }),
    ...prefersColorSchemeDarkMediaQuery(theme, {
      color: `var(${cssVarTextColor}, ${primaryColorDark})`,
      background: `var(${cssVarBackgroundColor}, ${backgroundColorDark})`,
      border: `${borderWidthBase} solid var(${cssVarBorderColor}, ${isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark})`,
      ...(isOpen && {
        [isDirectionDown ? 'borderBottom' : 'borderTop']: addImportantToRule(`1px solid ${contrastMediumColorDark}`),
      }),
      ...(isDisabled && {
        ...getPlaceholderJssStyle({ color: disabledColorDark }),
        color: disabledColorDark,
        borderColor: disabledColorDark,
        WebkitTextFillColor: disabledColorDark,
      }),
    }),
  };
};

// TODO: Rename to JSSStyles
// TODO: Copied from multi-select, extract and use in select and multi-select
const getListStyles = (
  isOpen: boolean,
  direction: SelectDropdownDirectionInternal,
  compact: boolean,
  theme: Theme
): JssStyle => {
  const isDirectionDown = direction === 'down';
  const { primaryColor, backgroundColor } = getThemedColors(theme);
  const { primaryColor: primaryColorDark, backgroundColor: backgroundColorDark } = getThemedColors('dark');

  const scalingVar = `var(${cssVarInternalSelectScaling}, ${compact ? 0.5 : 1})`;

  const gap = `max(2px, ${scalingVar} * ${spacingStaticSmall})`;
  const padding = `max(2px, ${scalingVar} * 6px)`;

  return {
    position: 'absolute',
    margin: 0,
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap,
    padding,
    ...textSmallStyle,
    zIndex: 10,
    // TODO: Inset inline 0
    left: 0,
    right: 0,
    [isDirectionDown ? 'top' : 'bottom']: '100%',
    boxSizing: 'border-box',
    maxHeight: `${8.5 * (OPTION_HEIGHT + 8) + 6 + 2}px`, // 8.5 options * option height + 8px gap + additional spacing (6px = padding, 2px = border)
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    background: backgroundColor,
    border: `2px solid var(${cssVarBorderColor}, ${primaryColor})`,
    [isDirectionDown ? 'borderTop' : 'borderBottom']: 'none',
    borderRadius: borderRadiusSmall,
    [isDirectionDown ? 'borderTopLeftRadius' : 'borderBottomLeftRadius']: 0,
    [isDirectionDown ? 'borderTopRightRadius' : 'borderBottomRightRadius']: 0,
    scrollbarWidth: 'thin', // firefox
    scrollbarColor: 'auto', // firefox
    transition: getTransition('border-color'),
    transform: 'translate3d(0,0,0)', // fix iOS bug if less than 5 items are displayed
    ...prefersColorSchemeDarkMediaQuery(theme, {
      background: backgroundColorDark,
      borderColor: `var(${cssVarBorderColor}, ${primaryColorDark})`,
    }),
  };
};
