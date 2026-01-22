import { createPart, type Part } from 'ag-grid-community';
import {
  borderWidthRegular,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastMediumDark,
  colorContrastMediumLight,
  colorDisabledDark,
  colorDisabledLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccessDark,
  colorSuccessLight,
  spacingStaticXs,
} from '../styles';
import { pdsThemeModeDark } from '../types/theme-mode';

export const toggleButtonStyle: Part = createPart({
  feature: 'toggleButtonStyle',
  params: {
    toggleButtonOnBackgroundColor: colorSuccessLight,
    toggleButtonOffBackgroundColor: colorCanvasLight,
    toggleButtonSwitchBackgroundColor: colorPrimaryLight,
    toggleButtonOnHoverBackgroundColor: colorSuccessLight,
    toggleButtonOnBorderColor: colorSuccessLight,
    toggleButtonOnHoverBorderColor: colorSuccessLight,
    toggleButtonOffHoverBorderColor: colorPrimaryLight,
    toggleButtonOffBorderColor: colorContrastMediumLight,
    toggleButtonDisabledColor: colorDisabledLight,
  },
  modeParams: {
    [pdsThemeModeDark]: {
      toggleButtonOnBackgroundColor: colorSuccessDark,
      toggleButtonOffBackgroundColor: colorCanvasDark,
      toggleButtonSwitchBackgroundColor: colorPrimaryDark,
      toggleButtonOnHoverBackgroundColor: colorSuccessDark,
      toggleButtonOnBorderColor: colorSuccessDark,
      toggleButtonOnHoverBorderColor: colorSuccessDark,
      toggleButtonOffHoverBorderColor: colorPrimaryDark,
      toggleButtonOffBorderColor: colorContrastMediumDark,
      toggleButtonDisabledColor: colorDisabledDark,
    },
  },
  css: `
    .ag-toggle-button-input-wrapper {
        border: ${borderWidthRegular} solid var(--ag-toggle-button-off-border-color);
        position: relative;

        &::before {
            height: calc(var(--ag-toggle-button-height) - ${spacingStaticXs} * 2) !important;
            width: calc(var(--ag-toggle-button-height) - ${spacingStaticXs} * 2) !important;
            top: calc(${spacingStaticXs} - ${borderWidthRegular}) !important;
            left: calc(${spacingStaticXs} - ${borderWidthRegular}) !important;
        }

        &.ag-checked {
            border-color: var(--ag-toggle-button-on-border-color);

            &::before {
                --ag-toggle-button-switch-background-color: ${colorCanvasLight};
                --ag-toggle-button-on-border-color: ${colorCanvasLight};
                left: calc(100% - var(--ag-toggle-button-height) + 6px) !important;
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
