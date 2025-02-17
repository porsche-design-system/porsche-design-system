import {
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  motionDurationShort,
  motionEasingBase,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableAnimationDuration,
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
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss, isHighContrastMode } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { OPTIONS_LIST_SAFE_ZONE, type SelectDropdownDirection } from './select-utils';

const cssVarBackgroundColor = '--p-select-background-color';
const cssVarTextColor = '--p-select-text-color';
const cssVarBorderColor = '--p-select-border-color';
const cssVarIconFilter = '--p-select-icon-filter';
const cssVarBackgroundColorFocus = '--p-select-focus-background-color';
const cssVarBorderColorFocus = '--p-select-focus-border-color';

export const cssVarInternalSelectScaling = '--p-internal-select-scaling';

const anchorName = '--anchor-select';

export const getComponentCss = (
  direction: SelectDropdownDirection,
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasNativeCSSAnchorPositioningSupport: boolean,
  compact: boolean,
  theme: Theme,
  hasSlottedImage: boolean
): string => {
  const { contrastLowColor, backgroundColor, primaryColor, disabledColor, contrastMediumColor } =
    getThemedColors(theme);
  const {
    contrastLowColor: contrastLowColorDark,
    backgroundColor: backgroundColorDark,
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastMediumColor: contrastMediumColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

  // Determines the scaling factor for the select size. In "compact" mode, it uses 0.5 to achieve a 36px select (compact size).
  // Defaults to 1 for the standard size and can be overridden by the CSS variable `cssVarInternalSelectScaling`.
  const scalingVar = `var(${cssVarInternalSelectScaling}, ${compact ? 0.5 : 1})`;

  const gap = `max(2px, ${scalingVar} * ${spacingStaticXSmall})`;
  const gridTemplateColumns = `minmax(0, 1fr) auto auto calc(max(2px, ${scalingVar} * ${formElementLayeredGap}) + ${borderWidthBase})`;

  const buttonHeight = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;
  const buttonPaddingBlock = `max(2px, ${scalingVar} * ${formElementPaddingVertical})`;
  const buttonPaddingInline = `max(4px, ${scalingVar} * ${formElementPaddingHorizontal}) ${getCalculatedFormElementPaddingHorizontal(1)}`;
  const buttonGap = `max(4px, ${scalingVar} * 12px)`;

  const popoverPadding = `max(2px, ${scalingVar} * 6px)`;
  const popoverGap = `max(2px, ${scalingVar} * ${spacingStaticSmall})`;

  return getCss({
    '@global': {
      '@keyframes fade-in': {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
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
      button: {
        gridArea: '1/1/1/-1',
        minWidth: 0,
        // TODO: abstract and re-use for multi-select, select-wrapper and text-field-wrapper
        height: buttonHeight,
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
        margin: 0, // necessary reset for iOS Safari 15 (and maybe other browsers)
        paddingBlock: buttonPaddingBlock,
        paddingInline: buttonPaddingInline,
        boxSizing: 'content-box',
        outline: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        ...textSmallStyle,
        textOverflow: 'ellipsis',
        cursor: 'pointer',
        textAlign: 'start',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
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
            gap: buttonGap,
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
          ...(isDisabled && {
            ...getPlaceholderJssStyle({ color: disabledColorDark }),
            color: disabledColorDark,
            borderColor: disabledColorDark,
            WebkitTextFillColor: disabledColorDark,
          }),
        }),
        ...(hasNativeCSSAnchorPositioningSupport && {
          anchorName,
        }),
      },
      // TODO: can be shared with multi-select
      '[popover]': {
        all: 'unset',
        position: 'absolute',
        padding: popoverPadding,
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        gap: popoverGap,
        maxHeight: `${8.5 * (OPTION_HEIGHT + 8) + 6 + 2}px`, // 8.5 options * option height + 8px gap + additional spacing (6px = padding, 2px = border)
        boxSizing: 'border-box',
        // TODO: extract to shared scroll wrapper styles, to be re-used in e.g. Flyout, Modal, etc.
        overflow: 'hidden auto',
        // scrollBehavior: 'smooth', // when defined, `.scrollTo()` isn't applied immediately
        // overscrollBehaviorY: 'none', // when defined, rubber band scroll effect is getting lost on iOS Safari
        // WebkitOverflowScrolling: 'touch', // not necessary anymore for iOS Safari
        scrollbarWidth: 'thin', // firefox
        scrollbarColor: 'auto', // firefox
        animation: `var(${cssVariableAnimationDuration}, ${motionDurationShort}) fade-in ${motionEasingBase} forwards`,
        // TODO: extract to shared colors
        filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.15))',
        background: backgroundColor,
        border: `1px solid ${contrastLowColor}`,
        borderRadius: borderRadiusMedium,
        ...prefersColorSchemeDarkMediaQuery(theme, {
          background: backgroundColorDark,
          borderColor: contrastLowColorDark,
        }),
        '&:not(:popover-open)': {
          display: 'none',
        },
        ...(hasNativeCSSAnchorPositioningSupport && {
          positionAnchor: anchorName,
          positionVisibility: 'always',
          positionTryOrder: 'normal',
          positionArea: direction === 'up' ? 'top' : 'bottom',
          positionTryFallbacks: 'flip-block',
          width: 'anchor-size(width)',
          margin: `${OPTIONS_LIST_SAFE_ZONE}px 0`,
        }),
      },
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
    'sr-only': getHiddenTextJssStyle(),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
