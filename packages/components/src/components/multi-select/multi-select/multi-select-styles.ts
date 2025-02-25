import {
  borderRadiusSmall,
  borderWidthBase,
  fontLineHeight,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
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
} from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import {
  formButtonOrIconPadding,
  formElementLayeredSafeZone,
  formElementPaddingHorizontal,
  formElementPaddingVertical,
  getCalculatedFormElementPaddingHorizontal,
} from '../../../styles/form-styles';
import { getNoResultsOptionJssStyle } from '../../../styles/option-styles';
import { getPlaceholderJssStyle } from '../../../styles/placeholder';
import { getPopoverJssStyle, getPopoverKeyframesStyles } from '../../../styles/select';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import type { SelectDropdownDirection } from '../../select/select/select-utils';

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
  const { primaryColor, disabledColor, contrastHighColor, contrastMediumColor, backgroundColor } =
    getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    disabledColor: disabledColorDark,
    contrastMediumColor: contrastMediumColorDark,
    contrastHighColor: contrastHighColorDark,
    backgroundColor: backgroundColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );

  return getCss({
    '@global': {
      // @keyframes fade-in
      ...getPopoverKeyframesStyles,
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
      '[popover]': getPopoverJssStyle(isOpen, direction, anchorName, 1, 44, theme),
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
