import {
  borderWidthBase,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  spacingStaticSmall,
  spacingStaticXSmall,
  textSmallStyle,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getHighContrastColors,
  getInvertedThemedColors,
  getSchemedHighContrastMediaQuery,
  getThemedColors,
  getTransition,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
  SCALING_BASE_VALUE,
} from '../../../styles';
import { getThemedFormStateColors } from '../../../styles/form-state-color-styles';
import type { Theme } from '../../../types';
import { getCss, isDisabledOrLoading, isHighContrastMode, supportsChromiumMediaQuery } from '../../../utils';
import { escapeHashCharacter } from '../../../utils/svg/escapeHashCharacter';
import { getInlineSVGBackgroundImage } from '../../../utils/svg/getInlineSVGBackgroundImage';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../../common/loading-message/loading-message-styles';
import type { RadioGroupState } from '../radio-group/radio-group-utils';

export const cssVarInternalRadioGroupOptionScaling = '--p-internal-radio-group-option-scaling';

const getCheckedSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(`<circle fill="${fill}" cx="12" cy="12" r="6"/>`);
};

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (disabled: boolean, loading: boolean, state: RadioGroupState, theme: Theme): string => {
  const { primaryColor, contrastMediumColor, contrastHighColor, disabledColor, focusColor } = getThemedColors(theme);
  const {
    primaryColor: primaryColorDark,
    contrastMediumColor: contrastMediumColorDark,
    contrastHighColor: contrastHighColorDark,
    disabledColor: disabledColorDark,
    focusColor: focusColorDark,
  } = getThemedColors('dark');
  const { formStateColor, formStateHoverColor } = getThemedFormStateColors(theme, state);
  const { formStateColor: formStateColorDark, formStateHoverColor: formStateHoverColorDark } = getThemedFormStateColors(
    'dark',
    state
  );
  const { canvasTextColor } = getHighContrastColors();
  const disabledOrLoading = isDisabledOrLoading(disabled, loading);

  // TODO: needs to be extracted into a color function
  const uncheckedColor = disabledOrLoading ? disabledColor : formStateColor || contrastMediumColor;
  const uncheckedColorDark = disabledOrLoading ? disabledColorDark : formStateColorDark || contrastMediumColorDark;
  const uncheckedHoverColor = formStateHoverColor || primaryColor;
  const uncheckedHoverColorDark = formStateHoverColorDark || primaryColorDark;
  const checkedColor = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
      ? disabledColor
      : formStateColor || primaryColor;
  const checkedColorDark = isHighContrastMode
    ? canvasTextColor
    : disabledOrLoading
      ? disabledColorDark
      : formStateColorDark || primaryColorDark;
  const checkedHoverColor = formStateHoverColor || contrastHighColor;
  const checkedHoverColorDark = formStateHoverColorDark || contrastHighColorDark;

  const minDimension = `calc(${SCALING_BASE_VALUE} * 0.75)`;
  const scalingVar = `var(${cssVarInternalRadioGroupOptionScaling}, 1)`;
  const dimension = `max(${minDimension}, ${scalingVar} * (${fontLineHeight}))`;
  const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.

  const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.
  const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the radio button full size.
  const inset = `calc(-${borderWidthBase} - max(0px, ${touchTargetSizeDiff} / 2))`; // Positions the radio button '::before' pseudo-element with a negative offset to align it with the touch target.
  const paddingInlineStart = `calc(${spacingStaticSmall} - (max(0px, ${touchTargetSizeDiff})))`;

  const checkedIconColor = escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
  const checkedIconColorDark = escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);

  const paddingTop = `calc((${dimensionFull} - ${fontLineHeight}) / 2)`; // Vertically centers the radio button label relative to the radio button size.
  const height = `calc(max(${fontLineHeight}, ${dimensionFull}))`; // Ensures the wrapper height matches either the font's line height or the full size of the radio-group, whichever is larger.

  return getCss({
    '@global': {
      ':host': {
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
        display: 'block',
      },
      ...getFunctionalComponentLabelAfterStyles(disabledOrLoading),
      input: {
        gridArea: '1/1',
        borderRadius: '50%',
        position: 'relative',
        width: dimension,
        height: dimension,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        display: 'block',
        margin: 0,
        padding: 0,
        WebkitAppearance: 'none', // iOS safari
        appearance: 'none',
        boxSizing: 'content-box',
        background: `transparent 0% 0% / ${fontLineHeight}`,
        transition: `${getTransition('background-color')}, ${getTransition('border-color')}`,
        border: `${borderWidthBase} solid ${uncheckedColor}`,
        outline: 0, // TODO: only relevant for VRT testing with forced states - prevents :focus style (in case getFocusJssStyle() condition is not matching)
        ...(disabledOrLoading
          ? {
              pointerEvents: 'none', // to prevent form element becomes clickable/toggleable
            }
          : {
              cursor: 'pointer',
            }),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: uncheckedColorDark,
        }),
        '&::before': {
          // Ensures the touch target is at least '24px', even if the radio button is smaller than the minimum touch target size.
          // This pseudo-element expands the clickable area without affecting the visual size of the radio button itself.
          content: '""',
          position: 'absolute',
          inset,
        },
      },
      'input:checked': {
        borderColor: checkedColor,
        backgroundColor: checkedColor,
        backgroundSize: dimension,
        backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
        ...prefersColorSchemeDarkMediaQuery(theme, {
          borderColor: checkedColorDark,
          backgroundColor: checkedColorDark,
          backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
        }),
        // This is a workaround for Blink-based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
        ...(isHighContrastMode &&
          getSchemedHighContrastMediaQuery(
            {
              backgroundImage: getCheckedSVGBackgroundImage('white'),
            },
            {
              backgroundImage: getCheckedSVGBackgroundImage('black'),
            }
          )),
      },
      ...(!disabledOrLoading &&
        !isHighContrastMode &&
        hoverMediaQuery({
          'input:hover,.label-wrapper:hover~.wrapper input': {
            borderColor: uncheckedHoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: uncheckedHoverColorDark,
            }),
          },
          'input:checked:hover,.label-wrapper:hover~.wrapper input:checked': {
            borderColor: checkedHoverColor,
            backgroundColor: checkedHoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: checkedHoverColorDark,
              backgroundColor: checkedHoverColorDark,
            }),
          },
          '.label-wrapper:hover~.wrapper input': supportsChromiumMediaQuery({
            transition: 'unset', // Fixes a chrome bug where transition properties are stuck on hover
          }),
        })),
      ...(!disabled && {
        'input::-moz-focus-inner': {
          border: 0, // reset ua-style (for FF)
        },
        'input:focus': {
          outline: 0, // reset ua-style (for older browsers)
        },
        'input:focus-visible': {
          outline: `${borderWidthBase} solid ${focusColor}`,
          outlineOffset: '2px',
          ...prefersColorSchemeDarkMediaQuery(theme, {
            outlineColor: focusColorDark,
          }),
        },
      }),
      ...preventFoucOfNestedElementsStyles,
    },
    root: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
      rowGap: spacingStaticXSmall,
    },
    wrapper: {
      ...textSmallStyle,
      display: 'grid',
      minWidth: minimumTouchTargetSize,
      minHeight: minimumTouchTargetSize,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start', // in case label becomes multiline
      ...(isDisabledOrLoading(disabled, loading) && {
        cursor: 'not-allowed',
      }),
      height,
    },
    ...(loading && {
      spinner: {
        position: 'relative', // ensure correct stacking, can be removed as soon as focus for input is handled with outline
        gridArea: '1/1',
        placeSelf: 'center',
        width: dimension,
        height: dimension,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(disabled || loading, false, theme, null, null, {
      paddingTop,
      paddingInlineStart,
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
