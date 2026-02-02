import {
  borderWidthThin,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/emotion';
import {
  addImportantToEachRule,
  colors,
  getDisabledBaseStyles,
  getFocusBaseStyles,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../../styles';
import { radiusFull } from '../../../styles/css-variables';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import { getCss, isDisabledOrLoading } from '../../../utils';
import { getInlineSVGBackgroundImage } from '../../../utils/svg/getInlineSVGBackgroundImage';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../../common/loading-message/loading-message-styles';
import type { RadioGroupState } from '../radio-group/radio-group-utils';

export const cssVarInternalRadioGroupOptionScaling = '--p-internal-radio-group-option-scaling';

const checkedIcon = getInlineSVGBackgroundImage(`<circle cx="12" cy="12" r="6"/>`);

const { primaryColor } = colors;

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */

export const getComponentCss = (disabled: boolean, loading: boolean, state: RadioGroupState): string => {
  const { formStateBackgroundColor, formStateBorderColor, formStateBorderHoverColor } = getThemedFormStateColors(state);
  const disabledOrLoading = isDisabledOrLoading(disabled, loading);

  const radioBorderWidth = borderWidthThin;
  const radioDimension = `calc(var(${cssVarInternalRadioGroupOptionScaling}) * 1.75rem)`;
  const radioMarginBlock = `max(0px, calc((${fontLineHeight} - ${radioDimension}) / 2))`;
  const radioTouchInset = `calc(-${radioBorderWidth} - max(0px, calc(24px - ${radioDimension}) / 2))`;
  const labelPaddingTop = `max(0px, calc((${radioDimension} - ${fontLineHeight}) / 2))`;
  const labelPaddingInlineStart = `calc(11.2px * (var(${cssVarInternalRadioGroupOptionScaling}) - 0.64285714) + 4px)`;

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...hostHiddenStyles,
          ...(disabledOrLoading && getDisabledBaseStyles()),
        }),
      },
      ...getFunctionalComponentLabelAfterStyles(disabledOrLoading),
      ...preventFoucOfNestedElementsStyles,
      input: {
        all: 'unset',
        display: 'grid', // ensures the pseudo-element can be positioned correctly
        width: radioDimension,
        height: radioDimension,
        marginBlock: radioMarginBlock,
        boxSizing: 'border-box',
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        background: formStateBackgroundColor,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        border: `${radioBorderWidth} solid ${formStateBorderColor}`,
        borderRadius: radiusFull,
        ...(disabledOrLoading && {
          pointerEvents: 'none', // to prevent form element becomes clickable/toggleable
        }),
        '&:focus-visible': getFocusBaseStyles(),
        ...(!disabledOrLoading &&
          hoverMediaQuery({
            '&:hover': {
              borderColor: formStateBorderHoverColor,
            },
          })),
        '&::before': {
          // This pseudo-element is used to render the checked icon.
          content: '""',
          gridArea: '1/1',
        },
        '&:checked::before': {
          WebkitMask: `${checkedIcon} center/contain no-repeat`, // necessary for Sogou browser support :-)
          mask: `${checkedIcon} center/contain no-repeat`,
          backgroundColor: primaryColor,
        },
        '&::after': {
          // Ensures the touch target is at least 24px, even if the checkbox is smaller than the minimum touch target size.
          // This pseudo-element expands the clickable area without affecting the visual size of the checkbox itself.
          content: '""',
          margin: radioTouchInset,
          gridArea: '1/1',
        },
      },
    },
    root: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
      rowGap: spacingStaticXSmall,
    },
    wrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'flex-start',
      minHeight: fontLineHeight, // necessary for compact mode
      cursor: disabledOrLoading ? 'not-allowed' : 'pointer',
    },
    ...(loading && {
      spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: radioDimension,
        height: radioDimension,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(disabled || loading, false, null, {
      paddingTop: labelPaddingTop,
      paddingInlineStart: labelPaddingInlineStart,
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
