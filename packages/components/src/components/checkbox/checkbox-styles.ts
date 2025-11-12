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
  colors,
  getSchemedHighContrastMediaQuery,
  hostHiddenStyles,
  hoverMediaQuery,
  preventFoucOfNestedElementsStyles,
  SCALING_BASE_VALUE,
} from '../../styles';
import { cssVarInternalCheckboxScaling, getCheckboxBaseStyles } from '../../styles/checkbox/checkbox-base-styles';
import { getCheckboxCheckedBaseStyles } from '../../styles/checkbox/checkbox-checked-base-styles';
import { getThemedFormStateColors } from '../../styles/form-state-color-styles';
import type { BreakpointCustomizable } from '../../types';
import { getCss, isDisabledOrLoading, isHighContrastMode, supportsChromiumMediaQuery } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';

const getIndeterminateSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20,11v2H4v-2h16Z"/>`);
};

const { primaryColor, contrastMediumColor, disabledColor, focusColor } = colors;

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  compact: boolean
): string => {
  const { formStateColor, formStateHoverColor, formStateBackgroundColor } = getThemedFormStateColors(state);
  const disabledOrLoading = isDisabledOrLoading(isDisabled, isLoading);

  // TODO: needs to be extracted into a color function
  const uncheckedColor = disabledOrLoading ? disabledColor : formStateColor || contrastMediumColor;
  const uncheckedHoverColor = formStateHoverColor || primaryColor;
  const checkedColor = disabledOrLoading ? disabledColor : formStateColor || primaryColor;
  const checkedHoverColor = formStateBackgroundColor;

  const indeterminateIconColor = escapeHashCharacter(
    disabledOrLoading ? disabledColor : formStateColor || primaryColor
  );
  const indeterminateIconHoverColor = escapeHashCharacter(formStateHoverColor || primaryColor);
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
      ...preventFoucOfNestedElementsStyles,
      input: getCheckboxBaseStyles(isDisabled, isLoading, state, compact),
      ...(isLoading
        ? {
            'input:checked': {
              // background-image is merged in later
              borderColor: checkedColor,
              backgroundColor: checkedColor,
            },
          }
        : {
            'input:checked': getCheckboxCheckedBaseStyles(isDisabled, isLoading, state),
            'input:indeterminate': {
              background, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
              borderColor: uncheckedColor, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
              backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColor),
              // This is a workaround for Blink based browsers, which do not reflect the high semantic system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
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
          },
          'input:checked:hover,label:hover~.wrapper input:checked': {
            borderColor: checkedHoverColor,
            backgroundColor: checkedHoverColor,
            '&::before': {
              backgroundColor: primaryColor,
            },
          },
          'input:indeterminate:hover,label:hover~.wrapper input:indeterminate': {
            background, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
            borderColor: uncheckedHoverColor, // Safari fix: ensures proper rendering of 'indeterminate' mode with 'checked' state.
            backgroundImage: getIndeterminateSVGBackgroundImage(escapeHashCharacter(indeterminateIconHoverColor)),
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
        },
      }),
    },
    root: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
      rowGap: spacingStaticXSmall,
      ...(disabledOrLoading && {
        cursor: 'not-allowed',
      }),
    },
    wrapper: {
      ...textSmallStyle,
      minWidth: minimumTouchTargetSize,
      minHeight: minimumTouchTargetSize,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'grid',
      gridArea: '1/1',
      alignSelf: 'flex-start', // in case label becomes multiline
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
      {
        gridArea: '1/2',
        ...(isLoading && { pointerEvents: 'none' }), // prevent default htmlFor behavior. TODO: Remove as soon as label component for custom form components exists.
      },
      {
        paddingTop,
        paddingInlineStart,
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(state, {
      gridColumn: '1/3',
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
