import { createPart, type Part } from 'ag-grid-community';
import {
  borderWidthThin,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorDisabledDark,
  colorDisabledLight,
  colorFrostedSoftDark,
  colorFrostedSoftLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccessDark,
  colorSuccessFrostedSoftDark,
  colorSuccessFrostedSoftLight,
  colorSuccessLight,
  colorSuccessLowDark,
  colorSuccessLowLight,
  spacingStaticXs,
} from '../styles';
import { pdsThemeModeDark } from '../types/theme-mode';

/**
 * Toggle button styles for AG Grid following v35 standards
 *
 * Provides custom styling for toggle buttons with Porsche Design System colors.
 * Supports both light and dark theme modes via data-ag-theme-mode attribute.
 *
 * Color behavior:
 * - OFF state: Inner circle uses colorPrimary (Light/Dark)
 * - ON state: Inner circle uses colorSuccess (Light/Dark)
 */

export const toggleButtonStyle: Part = createPart({
  feature: 'toggleButtonStyle',
  params: {
    // On state (when toggle is checked)
    toggleButtonOnBackgroundColor: colorSuccessFrostedSoftLight,
    toggleButtonOnBorderColor: colorSuccessLowLight,
    toggleButtonOnHoverBackgroundColor: colorSuccessFrostedSoftLight,
    toggleButtonOnHoverBorderColor: colorSuccessLight,

    // Off state (when toggle is unchecked)
    toggleButtonOffBackgroundColor: colorFrostedSoftLight,
    toggleButtonOffBorderColor: colorContrastLowerLight,
    toggleButtonOffHoverBorderColor: colorPrimaryLight,
    toggleButtonSwitchBackgroundColor: colorPrimaryLight, // Inner circle color when OFF

    // Disabled state
    toggleButtonDisabledColor: colorDisabledLight,
  },
  modeParams: {
    [pdsThemeModeDark]: {
      // On state (when toggle is checked)
      toggleButtonOnBackgroundColor: colorSuccessFrostedSoftDark,
      toggleButtonOnBorderColor: colorSuccessLowDark,
      toggleButtonOnHoverBackgroundColor: colorSuccessFrostedSoftDark,
      toggleButtonOnHoverBorderColor: colorSuccessDark,

      // Off state (when toggle is unchecked)
      toggleButtonOffBackgroundColor: colorFrostedSoftDark,
      toggleButtonOffBorderColor: colorContrastLowerDark,
      toggleButtonOffHoverBorderColor: colorPrimaryDark,
      toggleButtonSwitchBackgroundColor: colorPrimaryDark, // Inner circle color when OFF

      // Disabled state
      toggleButtonDisabledColor: colorDisabledDark,
    },
  },
  css: `
    .ag-toggle-button-input-wrapper {
        border: ${borderWidthThin} solid var(--ag-toggle-button-off-border-color);
        position: relative;

        /* Inner circle (switch) - default OFF state */
        &::before {
            height: calc(var(--ag-toggle-button-height) - ${spacingStaticXs} * 2) !important;
            width: calc(var(--ag-toggle-button-height) - ${spacingStaticXs} * 2) !important;
            top: calc(${spacingStaticXs} - ${borderWidthThin}) !important;
            left: calc(${spacingStaticXs} - ${borderWidthThin}) !important;
            background-color: var(--ag-toggle-button-switch-background-color);
        }

        /* ON state - inner circle becomes success color and moves to the right */
        &.ag-checked {
            border-color: var(--ag-toggle-button-on-border-color);

            &::before {
                background-color: ${colorSuccessLight};
                left: calc(100% - var(--ag-toggle-button-height) + 6px) !important;
            }
        }

        /* Dark mode ON state - inner circle becomes dark success color */
        [data-ag-theme-mode="dark"] &.ag-checked {
            &::before {
                background-color: ${colorSuccessDark};
            }
        }

        /* Hover state (unchecked) */
        &:not(.ag-disabled):hover {
            border-color: var(--ag-toggle-button-off-hover-border-color);
        }

        /* Hover state (checked) */
        &.ag-checked:not(.ag-disabled):hover {
            border-color: var(--ag-toggle-button-on-hover-border-color);
            background-color: var(--ag-toggle-button-on-hover-background-color);
        }

        /* Disabled state styling */
        &.ag-disabled {
            opacity: 1 !important;
            border-color: var(--ag-toggle-button-disabled-color);

            &:hover input {
                cursor: not-allowed;
            }

            &:not(.ag-checked)::before {
                background-color: var(--ag-toggle-button-disabled-color);
            }

            &.ag-checked {
                background-color: var(--ag-toggle-button-disabled-color);
            }
        }
    }
  `,
});
