import { createPart, type Part } from 'ag-grid-community';
import {
  borderWidthThin,
  colorCanvas,
  colorContrastLower,
  colorDisabled,
  colorErrorLow,
  colorPrimary,
  radiusXl,
} from '../styles';

/**
 * Input field styles for AG Grid following v35 standards
 *
 * Provides custom styling for input elements with Porsche Design System colors.
 * Supports both light and dark theme via CSS `color-scheme`.
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
    inputBorder: `solid ${borderWidthThin} ${colorContrastLower}`,
    inputDisabledBackgroundColor: colorCanvas,

    // Focus state
    inputFocusBorder: `solid ${borderWidthThin} ${colorPrimary}`,

    // Invalid state
    inputInvalidBorder: `solid ${borderWidthThin} ${colorErrorLow}`,

    // Disabled state
    inputDisabledBorder: `solid ${borderWidthThin} ${colorDisabled}`,
  },
  css: `
    /* Custom border radius for input fields */
    .ag-text-field-input {
        border-radius: ${radiusXl};
    }
  `,
});
