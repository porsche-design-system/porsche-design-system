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
  formElementLayeredSafeZone,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
} from '../../../styles/form-styles';
import { MULTI_SELECT_OPTION_HEIGHT, getNoResultsOptionJssStyle } from '../../../styles/option-styles';
import { getPlaceholderJssStyle } from '../../../styles/placeholder';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import type { SelectDropdownDirection } from '../../select/select/select-utils';
import { MULTI_SELECT_OPTION_LIST_SAFE_ZONE } from './multi-select-utils';

const anchorName = '--anchor-multi-select';

export const getComponentCss = (
  direction: SelectDropdownDirection,
  isOpen: boolean,
  isDisabled: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  hasNativeCSSAnchorPositioningSupport: boolean,
  theme: Theme
): string => {
  const { primaryColor, disabledColor, contrastHighColor, contrastLowColor, contrastMediumColor, backgroundColor } =
    getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastMediumColor: contrastMediumColorDark,
    contrastHighColor: contrastHighColorDark,
    contrastLowColor: contrastLowColorDark,
    backgroundColor: backgroundColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

  const scalingVar = 1;

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
      ...preventFoucOfNestedElementsStyles,
      input: {
        gridArea: '1/1/1/-1',
        flex: 1,
        minWidth: 0,
        height: `calc(${fontLineHeight} + 10px + ${borderWidthBase} * 2 + ${spacingStaticSmall} * 2)`, // we need 10px additionally so input height becomes 54px, // we need 6px additionally so input height becomes 50px
        font: textSmallStyle.font.replace('ex', 'ex + 6px'), // a minimum line-height is needed for input, otherwise value is scrollable in Chrome, +6px is alig
        margin: 0, // necessary reset for iOS Safari 15 (and maybe other browsers)
        padding: `${formElementPaddingVertical} ${formElementPaddingHorizontal}`,
        paddingInlineEnd: getCalculatedFormElementPaddingHorizontal(2),
        boxSizing: 'border-box',
        outline: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        ...textSmallStyle,
        textOverflow: 'ellipsis',
        '&:disabled': {
          cursor: 'not-allowed',
        },
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}, ${getTransition('color')}`, // for smooth transitions between e.g. disabled states
        color: primaryColor,
        '&:not(:focus)': {
          ...getPlaceholderJssStyle({ color: primaryColor, opacity: 1 }),
          ...prefersColorSchemeDarkMediaQuery(theme, getPlaceholderJssStyle({ color: primaryColorDark, opacity: 1 })),
        }, // Opacity fixes placeholder being shown lighter in firefox

        ...hoverMediaQuery({
          '&:hover:not(:disabled):not(:focus),label:hover~.wrapper &:not(:disabled):not(:focus)': {
            borderColor: isOpen ? primaryColor : formStateHoverColor || primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: isOpen ? primaryColorDark : formStateHoverColorDark || primaryColorDark,
            }),
          },
        }),
        ...(!isDisabled && {
          '&:focus': {
            borderColor: primaryColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: primaryColorDark,
            }),
          },
        }),
        background: backgroundColor,
        border: `${borderWidthBase} solid ${isOpen ? primaryColor : formStateColor || contrastMediumColor}`,
        borderRadius: borderRadiusSmall,
        ...(isDisabled && {
          ...getPlaceholderJssStyle({ color: disabledColor }),
          cursor: 'not-allowed',
          color: disabledColor,
          borderColor: disabledColor,
          WebkitTextFillColor: disabledColor,
        }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          color: primaryColorDark,
          background: backgroundColorDark,
          border: `${borderWidthBase} solid ${isOpen ? primaryColorDark : formStateColorDark || contrastMediumColorDark}`,
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
      // TODO: can be shared with select
      '[popover]': {
        all: 'unset',
        position: 'absolute',
        padding: popoverPadding,
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        gap: popoverGap,
        maxHeight: `${8.5 * (MULTI_SELECT_OPTION_HEIGHT + 8) + 6 + 2}px`, // 8.5 options * option height + 8px gap + additional spacing (6px = padding, 2px = border)
        boxSizing: 'border-box',
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
        zIndex: 99, // ensures option list is rendered on top for browsers not supporting #top-layer
        ...(hasNativeCSSAnchorPositioningSupport && {
          positionAnchor: anchorName,
          positionVisibility: 'always',
          positionTryOrder: 'normal',
          positionArea: direction === 'up' ? 'top' : 'bottom',
          positionTryFallbacks: 'flip-block',
          width: 'anchor-size(width)',
          margin: `${MULTI_SELECT_OPTION_LIST_SAFE_ZONE}px 0`,
        }),
      },
    },
    root: {
      display: 'grid',
      gap: spacingStaticXSmall,
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(2)})`,
    },
    wrapper: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: `minmax(0, 1fr) auto auto ${formElementLayeredSafeZone}`,
    },
    // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf)
    icon: {
      gridArea: '1/3',
      placeSelf: 'center',
      padding: formButtonOrIconPadding,
      pointerEvents: 'none',
      transform: 'rotate3d(0,0,1,0.0001deg)', // needs to be a little more than 0 for correct direction in safari
      transition: getTransition('transform'),
      '&--rotate': {
        transform: 'rotate3d(0,0,1,180deg)',
      },
    },
    // TODO: extract for multi-select, select-wrapper and text-field (not gridArea and placeSelf)
    button: {
      gridArea: '1/2',
      placeSelf: 'center',
      padding: formButtonOrIconPadding,
    },
    // TODO: extract (maybe even as functional component) and re-use in multi-select and select-wrapper
    'no-results': {
      padding: `${spacingStaticSmall} 12px`,
      boxSizing: 'border-box',
      color: contrastHighColor,
      ...prefersColorSchemeDarkMediaQuery(theme, {
        color: contrastHighColorDark,
      }),
      ...getNoResultsOptionJssStyle(),
    },
    // TODO: maybe we should extract it as functional component too
    'sr-only': getHiddenTextJssStyle(),
    // .label / .required
    ...getFunctionalComponentLabelStyles(isDisabled, hideLabel, theme),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
  });
};
