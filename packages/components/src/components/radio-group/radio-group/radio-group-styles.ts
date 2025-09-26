import {
  borderWidthBase,
  fontLineHeight,
  spacingStaticMedium,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import {
  getHiddenTextJssStyle,
  getThemedColors,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
} from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { formElementPaddingHorizontal, getCalculatedFormElementPaddingHorizontal } from '../../../styles/form-styles';
import { type GroupDirection, getGroupDirectionJssStyles } from '../../../styles/group-direction-styles';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { buildResponsiveStyles, getCss } from '../../../utils';
import type { FormState } from '../../../utils/form/form-state';
import { getFunctionalComponentLabelStyles } from '../../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../../common/state-message/state-message-styles';
import { cssVarInternalRadioGroupOptionScaling } from '../radio-group-option/radio-group-option-styles';

export const cssVarInternalRadioGroupScaling = '--p-internal-radio-group-scaling';

// CSS Variables defined in base input
/**
 * @css-variable {"name": "--ref-p-input-slotted-padding", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `padding` in oder to adjust the alignment correctly."}
 */
/**
 * @css-variable {"name": "--ref-p-input-slotted-margin", "description": "When slotting a `p-button-pure` or `p-link-pure` this variable needs to be set as `margin` in oder to adjust the spacings correctly."}
 */

export const getComponentCss = (
  disabled: boolean,
  loading: boolean,
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  compact: boolean,
  direction: BreakpointCustomizable<GroupDirection>,
  theme: Theme
): string => {
  const scalingVar = `var(${cssVarInternalRadioGroupScaling}, ${compact ? 0.5 : 1})`;

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

  const hoverStyles = {
    borderColor: formStateHoverColor || primaryColor,
    ...prefersColorSchemeDarkMediaQuery(theme, {
      borderColor: formStateHoverColorDark || primaryColorDark,
    }),
  };
  const dimension = `max(${fontLineHeight}, ${scalingVar} * (${fontLineHeight} + 10px))`;
  const gap = `max(${spacingStaticXSmall}, ${scalingVar} * ${spacingStaticSmall})`;

  return getCss({
    '@global': {
      ':host': {
        [`${cssVarInternalRadioGroupOptionScaling}`]: scalingVar,
      },
    },
    root: {
      display: 'grid',
      // gap: `max(2px, ${scalingVar} * ${spacingStaticXSmall})`,
      // min width is needed for showing at least 1 character in very narrow containers. The "1rem" value is the minimum safe zone to show at least 1 character plus the ellipsis dots.
      // minWidth: `calc(1rem + ${formElementPaddingHorizontal} + ${borderWidthBase} * 2 + ${getCalculatedFormElementPaddingHorizontal(1)})`,
      justifySelf: 'flex-start',
    },
    wrapper: {
      position: 'relative',
      display: 'flex',
      ...buildResponsiveStyles(direction, getGroupDirectionJssStyles),
      columnGap: spacingStaticMedium,
      rowGap: spacingStaticSmall,
    },
    ...(loading && {
      spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: dimension,
        height: dimension,
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      disabled,
      hideLabel,
      theme,
      !disabled && {
        ...hoverMediaQuery({
          '&:hover~.wrapper': hoverStyles,
        }),
        cursor: 'inherit', // label is not clickable
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
    'sr-only': getHiddenTextJssStyle(),
  });
};
