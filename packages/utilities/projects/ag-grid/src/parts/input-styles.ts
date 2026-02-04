import { createPart, type Part } from 'ag-grid-community';
import {
  borderWidthThin,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorDisabledDark,
  colorDisabledLight,
  colorErrorLowDark,
  colorErrorLowLight,
  colorPrimaryDark,
  colorPrimaryLight,
  radiusXl,
} from '../styles';
import { pdsThemeModeDark } from '../types/theme-mode';

/**
 * Input field styles for AG Grid following v35 standards
 *
 * Provides custom styling for input elements with Porsche Design System colors.
 * Supports both light and dark theme modes via data-ag-theme-mode attribute.
 *
 * Includes styling for:
 * - Normal state
 * - Focus state
 * - Invalid state
 * - Disabled state
 */
export const inputStyles: Part = createPart({
  feature: 'inputStyles',
  params: {
    // Normal state
    inputBorder: `solid ${borderWidthThin} ${colorContrastLowerLight}`,
    inputDisabledBackgroundColor: colorCanvasLight,

    // Focus state
    inputFocusBorder: `solid ${borderWidthThin} ${colorPrimaryLight}`,

    // Invalid state
    inputInvalidBorder: `solid ${borderWidthThin} ${colorErrorLowLight}`,

    // Disabled state
    inputDisabledBorder: `solid ${borderWidthThin} ${colorDisabledLight}`,
  },
  modeParams: {
    [pdsThemeModeDark]: {
      // Normal state
      inputBorder: `solid ${borderWidthThin} ${colorContrastLowerDark}`,
      inputDisabledBackgroundColor: colorCanvasDark,

      // Focus state
      inputFocusBorder: `solid ${borderWidthThin} ${colorPrimaryDark}`,

      // Invalid state
      inputInvalidBorder: `solid ${borderWidthThin} ${colorErrorLowDark}`,

      // Disabled state
      inputDisabledBorder: `solid ${borderWidthThin} ${colorDisabledDark}`,
    },
  },
  css: `
    /* Custom border radius for input fields */
    .ag-text-field-input {
        border-radius: ${radiusXl};
    }
  `,
});
