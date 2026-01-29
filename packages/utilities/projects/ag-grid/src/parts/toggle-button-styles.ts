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

export const toggleButtonStyle: Part = createPart({
  feature: 'toggleButtonStyle',
  params: {
    // On state
    toggleButtonOnBackgroundColor: colorSuccessFrostedSoftLight,
    toggleButtonOnBorderColor: colorSuccessLowLight,
    toggleButtonOnHoverBackgroundColor: colorSuccessFrostedSoftLight,
    toggleButtonOnHoverBorderColor: colorSuccessLight,
    // Off state
    toggleButtonOffBackgroundColor: colorFrostedSoftLight,
    toggleButtonOffBorderColor: colorContrastLowerLight,
    toggleButtonOffHoverBorderColor: colorPrimaryLight,
    toggleButtonSwitchBackgroundColor: colorPrimaryLight,
    // Disabled state
    toggleButtonDisabledColor: colorDisabledLight,
  },
  modeParams: {
    [pdsThemeModeDark]: {
      // On state
      toggleButtonOnBackgroundColor: colorSuccessFrostedSoftDark,
      toggleButtonOnBorderColor: colorSuccessLowDark,
      toggleButtonOnHoverBackgroundColor: colorSuccessFrostedSoftDark,
      toggleButtonOnHoverBorderColor: colorSuccessDark,
      // Off state
      toggleButtonOffBackgroundColor: colorFrostedSoftDark,
      toggleButtonOffBorderColor: colorContrastLowerDark,
      toggleButtonOffHoverBorderColor: colorPrimaryDark,
      toggleButtonSwitchBackgroundColor: colorPrimaryDark,
      // Disabled state
      toggleButtonDisabledColor: colorDisabledDark,
    },
  },
  css: `
    .ag-toggle-button-input-wrapper {
        border: ${borderWidthThin} solid var(--ag-toggle-button-off-border-color);
        position: relative;

        &::before {
            height: calc(var(--ag-toggle-button-height) - ${spacingStaticXs} * 2) !important;
            width: calc(var(--ag-toggle-button-height) - ${spacingStaticXs} * 2) !important;
            top: calc(${spacingStaticXs} - ${borderWidthThin}) !important;
            left: calc(${spacingStaticXs} - ${borderWidthThin}) !important;
            background-color: var(--ag-toggle-button-switch-background-color);
        }

        &.ag-checked {
            border-color: var(--ag-toggle-button-on-border-color);

            &::before {
                background-color: ${colorSuccessLight};
                left: calc(100% - var(--ag-toggle-button-height) + 6px) !important;
            }
        }

        [data-ag-theme-mode="dark"] &.ag-checked {
            &::before {
                background-color: ${colorSuccessDark};
            }
        }

        &:not(.ag-disabled):hover {
            border-color: var(--ag-toggle-button-off-hover-border-color);
        }

        &.ag-checked:not(.ag-disabled):hover {
            border-color: var(--ag-toggle-button-on-hover-border-color);
            background-color: var(--ag-toggle-button-on-hover-background-color);
        }

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
