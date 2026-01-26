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
  getSchemedHighContrastMediaQuery,
  getThemedColors,
  hostHiddenStyles,
  hoverMediaQuery,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
  SCALING_BASE_VALUE,
} from '../../styles';
import { cssVarInternalCheckboxScaling, getCheckboxBaseStyles } from '../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../styles/checkbox/checkbox-checked-base-styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss, isDisabledOrLoading, isHighContrastMode, supportsChromiumMediaQuery } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import {
  getFunctionalComponentLabelAfterStyles,
  getFunctionalComponentLabelStyles,
} from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';

const getIndeterminateSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20,11v2H4v-2h16Z"/>`);
};

// CSS Variable defined in fontHyphenationStyle
/**
 * @css-variable {"name": "--p-hyphens", "description": "Sets the CSS `hyphens` property for text elements, controlling whether words can break and hyphenate automatically.", "defaultValue": "auto"}
 */
export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  compact: boolean,
  theme: Theme
): string => {
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
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

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

  const indeterminateIconColor = escapeHashCharacter(
    disabledOrLoading ? disabledColorDark : formStateColor || primaryColor
  );
  const indeterminateIconColorDark = escapeHashCharacter(formStateColorDark || primaryColorDark);
  const indeterminateIconHoverColor = escapeHashCharacter(formStateHoverColor || primaryColor);
  const indeterminateIconHoverColorDark = escapeHashCharacter(formStateHoverColorDark || primaryColorDark);
  const background = `transparent 0% 0% / ${fontLineHeight}`;
  const minimumTouchTargetSize = '24px'; // Minimum touch target size to comply with accessibility guidelines.
  const scalingVar = `var(${cssVarInternalCheckboxScaling}, ${compact ? 0.6668 : 1})`;
  const dimension = `calc(max(${SCALING_BASE_VALUE} * 0.75, ${scalingVar} * ${fontLineHeight}))`;
  const dimensionFull = `calc(${dimension} + ${borderWidthBase} * 2)`; // Calculates the total size of the checkbox including its borders.
  const touchTargetSizeDiff = `calc(${minimumTouchTargetSize} - ${dimensionFull})`; // Difference between the minimum touch target size and the checkbox full size.
  const paddingInlineStart = `calc(${spacingStaticSmall} - (max(0px, ${touchTargetSizeDiff})))`;
  const paddingTop = `calc((${dimensionFull} - ${fontLineHeight}) / 2)`; // Vertically centers the checkbox label relative to the checkbox size.
  const height = `calc(max(${fontLineHeight}, ${dimensionFull}))`; // Ensures the wrapper height matches either the font's line height or the full size of the checkbox, whichever is larger.

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...getFunctionalComponentLabelAfterStyles(disabledOrLoading),
      ...preventFoucOfNestedElementsStyles,
      input: getCheckboxBaseStyles(theme, isDisabled, isLoading, state, compact),
      ...(isLoading
        ? {
            'input:checked': {
              // background-image is merged in later
              borderColor: checkedColor,
              backgroundColor: checkedColor,
              ...prefersColorSchemeDarkMediaQuery(theme, {
                borderColor: checkedColorDark,
                backgroundColor: checkedColorDark,
              }),
            },
          }
        : {
            'input:checked': getCheckboxCheckedBaseStyles(theme, isDisabled, isLoading, state),
            'input:indeterminate': {
              background, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
              borderColor: uncheckedColor, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
              backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColor),
              ...prefersColorSchemeDarkMediaQuery(theme, {
                backgroundImage: getIndeterminateSVGBackgroundImage(
                  disabledOrLoading ? indeterminateIconColor : indeterminateIconColorDark
                ),
                borderColor: uncheckedColorDark, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
                backgroundColor: 'transparent', // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
              }),
              // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
              ...(isHighContrastMode &&
                getSchemedHighContrastMediaQuery(
                  {
                    backgroundImage: getIndeterminateSVGBackgroundImage('black'),
                  },
                  {
                    backgroundImage: getIndeterminateSVGBackgroundImage('white'),
                  }
                )),
            },
          }),
      ...(!disabledOrLoading &&
        !isHighContrastMode &&
        hoverMediaQuery({
          'input:hover,label:hover~.wrapper input': {
            borderColor: uncheckedHoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: uncheckedHoverColorDark,
            }),
          },
          'input:checked:hover,label:hover~.wrapper input:checked': {
            borderColor: checkedHoverColor,
            backgroundColor: checkedHoverColor,
            ...prefersColorSchemeDarkMediaQuery(theme, {
              borderColor: checkedHoverColorDark,
              backgroundColor: checkedHoverColorDark,
            }),
          },
          'input:indeterminate:hover,label:hover~.wrapper input:indeterminate': {
            background, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
            borderColor: uncheckedHoverColor, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
            backgroundImage: getIndeterminateSVGBackgroundImage(escapeHashCharacter(indeterminateIconHoverColor)),
            ...prefersColorSchemeDarkMediaQuery(theme, {
              backgroundImage: getIndeterminateSVGBackgroundImage(escapeHashCharacter(indeterminateIconHoverColorDark)),
              borderColor: uncheckedHoverColorDark, // Safari fix: ensures proper rendering of 'indeterminate' mode
              backgroundColor: 'transparent',
            }),
          },
          'label:hover~.wrapper input': supportsChromiumMediaQuery({
            transition: 'unset', // Fixes chrome bug where transition properties are stuck on hover
          }),
        })),
      ...(!isDisabled && {
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
    },
    root: {
      display: 'grid',
      rowGap: spacingStaticXSmall,
      ...(disabledOrLoading && {
        cursor: 'not-allowed',
      }),
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
    },
    'input-wrapper': {
      ...textSmallStyle,
      minWidth: minimumTouchTargetSize,
      minHeight: minimumTouchTargetSize,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start', // in case label becomes multiline
      display: 'grid',
      gridArea: '1/1',
      height,
    },
    ...(isLoading && {
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
    ...getFunctionalComponentLabelStyles(
      isDisabled || isLoading,
      hideLabel,
      theme,
      {
        ...(isLoading && { pointerEvents: 'none' }), // prevent default htmlFor behavior. TODO: Remove as soon as label component for custom form components exists.
      },
      {
        paddingTop,
        paddingInlineStart,
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state, {}),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
