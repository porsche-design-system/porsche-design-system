import type { JssStyle } from 'jss';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import type { FormState } from '../../utils/form/form-state';
import { isDisabledOrLoading, isHighContrastMode, supportsChromiumMediaQuery, type Theme } from '../../utils';
import { getThemedFormStateColors } from '../form-state-color-styles';
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';
import { borderWidthBase, fontLineHeight } from '@porsche-design-system/styles';
import { prefersColorSchemeDarkMediaQuery } from '../prefers-color-scheme-dark-media-query';
import { getSchemedHighContrastMediaQuery } from '../schemed-high-contrast-media-query';
import { hoverMediaQuery } from '../hover-media-query';
import { getCheckboxCheckedBaseStyles } from './checkbox-checked-base-styles';
import { getHighContrastColors, getThemedColors } from '../colors';

export const getIndeterminateSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20,11v2H4v-2h16Z"/>`);
};

export const cssVarInternalCheckboxScaling = '--p-internal-checkbox-scaling';

export const getCheckboxStyles = (
  theme: Theme,
  isDisabled: boolean,
  isLoading?: boolean,
  state?: FormState
): JssStyle => {
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

  return {
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
  };
};
