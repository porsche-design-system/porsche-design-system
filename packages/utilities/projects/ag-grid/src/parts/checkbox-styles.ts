import { createPart, type Part } from 'ag-grid-community';
import {
  borderWidthThin,
  colorContrastLower,
  colorDisabled,
  colorFrostedSoft,
  colorPrimary,
  radiusLg,
} from '../styles';

export const checkboxCheckedShapeImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/></svg>`;
export const checkboxIndeterminateShapeImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m20,11v2H4v-2h16Z"/></svg>`;
export const radioCheckedShapeImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"/></svg>`;

/**
 * Checkbox and radio button styles for AG Grid following v35 standards
 *
 * Provides custom styling for checkboxes and radio buttons with Porsche Design System colors.
 * Supports both light and dark theme via CSS `color-scheme`.
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
    checkboxUncheckedBackgroundColor: colorFrostedSoft,
    checkboxUncheckedBorderColor: colorContrastLower,
    checkboxUncheckedHoverBorderColor: colorPrimary,

    // Checked state
    checkboxCheckedBackgroundColor: colorFrostedSoft,
    checkboxCheckedBorderColor: colorContrastLower,
    checkboxCheckedShapeColor: colorPrimary,
    checkboxCheckedHoverBorderColor: colorPrimary,
    checkboxCheckedHoverBackgroundColor: colorFrostedSoft,

    // Indeterminate state
    checkboxIndeterminateBackgroundColor: colorFrostedSoft,
    checkboxIndeterminateBorderColor: colorPrimary,
    checkboxIndeterminateShapeColor: colorPrimary,

    // Disabled state
    checkboxDisabledColor: colorDisabled,
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

        :where(input) {
            cursor: pointer;
            appearance: none;
            opacity: 0;
            margin: 0;
            display: block;
            width: 100%;
            height: 100%;
        }

        &::after {
            content: '';
            position: absolute;
            inset: 0;
            display: block;
            mask-position: center;
            mask-repeat: no-repeat;
            pointer-events: none;
        }

        &.ag-checked {
            background-color: var(--ag-checkbox-checked-background-color);
            border-color: var(--ag-checkbox-checked-border-color);

            &::after {
                background-color: var(--ag-checkbox-checked-shape-color);
            }
        }

        &:focus-within,
        &:active {
            box-shadow: var(--ag-focus-shadow);
        }

        &.ag-disabled {
            opacity: 1;
            filter: unset;
            border-color: var(--ag-checkbox-disabled-color);

            &.ag-checked {
                background-color: var(--ag-checkbox-disabled-color);
            }

            &:hover input {
                cursor: not-allowed;
            }
        }

        /* Hover styling for enabled items */
        &:not(.ag-disabled):hover {
            border-color: var(--ag-checkbox-unchecked-hover-border-color) !important;
        }

        &.ag-checked:not(.ag-disabled):hover {
            border-color: var(--ag-checkbox-checked-hover-border-color) !important;
            background-color: var(--ag-checkbox-checked-hover-background-color) !important;
        }
    }

    .ag-checkbox-input-wrapper {
        border-radius: ${radiusLg};

        &.ag-checked::after {
            mask-image: var(--ag-checkbox-checked-shape-image);
        }

        &.ag-indeterminate {
            background-color: var(--ag-checkbox-indeterminate-background-color);
            border-color: var(--ag-checkbox-indeterminate-border-color);

            &::after {
                background-color: var(--ag-checkbox-indeterminate-shape-color);
                mask-image: var(--ag-checkbox-indeterminate-shape-image);
            }
        }
    }

    .ag-radio-button-input-wrapper {
        border-radius: 50%;

        &.ag-checked::after {
            mask-image: var(--ag-radio-checked-shape-image);
        }
    }
  `,
});
