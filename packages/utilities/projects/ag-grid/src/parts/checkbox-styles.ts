import { createPart, type Part } from 'ag-grid-community';
import {
  borderRadiusLg,
  borderWidthThin,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastMediumLight,
  colorDisabledDark,
  colorDisabledLight,
  colorFrostedSoftDark,
  colorFrostedSoftLight,
  colorPrimaryDark,
  colorPrimaryLight,
} from '../styles';
import { pdsThemeModeDark } from '../types/theme-mode';

export const checkboxCheckedShapeImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>`;
export const checkboxIndeterminateShapeImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20,11v2H4v-2h16Z"/></svg>`;
export const radioCheckedShapeImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>`;

/**
 * Checkbox and radio button styles for AG Grid following v35 standards
 *
 * Provides custom styling for checkboxes and radio buttons with Porsche Design System colors.
 * Supports both light and dark theme modes via data-ag-theme-mode attribute.
 *
 * Includes styling for:
 * - Unchecked state
 * - Checked state
 * - Indeterminate state (checkboxes only)
 * - Disabled state
 * - Hover interactions
 */
export const checkboxStyle: Part = createPart({
  feature: 'checkboxStyle',
  params: {
    // SVG shapes
    checkboxCheckedShapeImage: { svg: checkboxCheckedShapeImage },
    checkboxIndeterminateShapeImage: { svg: checkboxIndeterminateShapeImage },
    radioCheckedShapeImage: { svg: radioCheckedShapeImage },

    // Unchecked state
    checkboxUncheckedBackgroundColor: colorFrostedSoftLight,
    checkboxUncheckedBorderColor: colorContrastLowerLight,
    checkboxUncheckedHoverBorderColor: colorPrimaryLight,

    // Checked state
    checkboxCheckedBackgroundColor: colorFrostedSoftLight,
    checkboxCheckedBorderColor: colorContrastLowerLight,
    checkboxCheckedShapeColor: colorPrimaryLight,
    checkboxCheckedHoverBorderColor: colorPrimaryLight,
    checkboxCheckedHoverBackgroundColor: colorFrostedSoftLight,

    // Indeterminate state
    checkboxIndeterminateBackgroundColor: colorFrostedSoftLight,
    checkboxIndeterminateBorderColor: colorContrastMediumLight,
    checkboxIndeterminateShapeColor: colorPrimaryLight,

    // Disabled state
    checkboxDisabledColor: colorDisabledLight,
  },
  modeParams: {
    [pdsThemeModeDark]: {
      // SVG shapes (same for both modes)
      checkboxCheckedShapeImage: { svg: checkboxCheckedShapeImage },
      checkboxIndeterminateShapeImage: { svg: checkboxIndeterminateShapeImage },
      radioCheckedShapeImage: { svg: radioCheckedShapeImage },

      // Unchecked state
      checkboxUncheckedBackgroundColor: colorFrostedSoftDark,
      checkboxUncheckedBorderColor: colorContrastLowerDark,
      checkboxUncheckedHoverBorderColor: colorPrimaryDark,

      // Checked state
      checkboxCheckedBackgroundColor: colorFrostedSoftDark,
      checkboxCheckedBorderColor: colorContrastLowerDark,
      checkboxCheckedShapeColor: colorPrimaryDark,
      checkboxCheckedHoverBorderColor: colorPrimaryDark,
      checkboxCheckedHoverBackgroundColor: colorFrostedSoftDark,

      // Indeterminate state
      checkboxIndeterminateBackgroundColor: colorFrostedSoftDark,
      checkboxIndeterminateBorderColor: colorContrastLowerDark,
      checkboxIndeterminateShapeColor: colorPrimaryDark,

      // Disabled state
      checkboxDisabledColor: colorDisabledDark,
    },
  },
  css: `
    .ag-checkbox-input-wrapper,
    .ag-radio-button-input-wrapper {
        flex: none;
        position: relative;
        width: var(--ag-icon-size);
        height: var(--ag-icon-size);
        background-color: var(--ag-checkbox-unchecked-background-color);
        border: solid ${borderWidthThin} var(--ag-checkbox-unchecked-border-color);

        /* Hidden input element */
        :where(input) {
            cursor: pointer;
            appearance: none;
            opacity: 0;
            margin: 0;
            display: block;
            width: 100%;
            height: 100%;
        }

        /* Icon/shape container */
        &::after {
            content: '';
            position: absolute;
            inset: 0;
            display: block;
            mask-position: center;
            mask-repeat: no-repeat;
            pointer-events: none;
        }

        /* Checked state */
        &.ag-checked {
            background-color: var(--ag-checkbox-checked-background-color);
            border-color: var(--ag-checkbox-checked-border-color);

            &::after {
                background-color: var(--ag-checkbox-checked-color);
            }
        }

        /* Indeterminate state (checkboxes only) */
        &.ag-indeterminate {
            background-color: var(--ag-checkbox-indeterminate-background-color);
            border-color: var(--ag-checkbox-indeterminate-border-color);

            &::after {
                background-color: var(--ag-checkbox-indeterminate-color);
            }
        }

        /* Hover states */
        &:not(.ag-disabled):hover {
            border-color: var(--ag-checkbox-unchecked-hover-border-color);
        }

        &.ag-checked:not(.ag-disabled):hover {
            background-color: var(--ag-checkbox-checked-hover-background-color);
            border-color: var(--ag-checkbox-checked-hover-border-color);
        }

        /* Disabled state */
        &.ag-disabled {
            opacity: 1 !important;
            background-color: var(--ag-checkbox-disabled-color);
            border-color: var(--ag-checkbox-disabled-color);

            &::after {
                background-color: transparent;
            }

            &:hover input {
                cursor: not-allowed;
            }
        }
    }

    /* Checkbox-specific border radius */
    .ag-checkbox-input-wrapper {
        border-radius: ${borderRadiusLg};
    }

    /* Radio button-specific border radius (circular) */
    .ag-radio-button-input-wrapper {
        border-radius: 50%;

        &::after {
            border-radius: 50%;
        }
    }
  `,
});
