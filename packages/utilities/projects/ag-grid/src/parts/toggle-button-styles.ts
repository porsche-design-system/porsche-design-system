import {
  borderWidthBase,
  spacingStaticXSmall,
  themeDarkBackgroundBase,
  themeDarkContrastMedium,
  themeDarkNotificationSuccess,
  themeDarkPrimary,
  themeDarkStateDisabled,
  themeLightBackgroundBase,
  themeLightContrastMedium,
  themeLightNotificationSuccess,
  themeLightPrimary,
  themeLightStateDisabled,
} from '@porsche-design-system/components-js/styles';

import { type Part, createPart } from 'ag-grid-community';
import { themeDark, themeLight } from '../colors';
import { PdsThemeMode } from '../types/theme-mode';

export const toggleButtonStyle: Part = createPart({
  feature: 'toggleButtonStyle',
  params: {
    toggleButtonOnBackgroundColor: themeLightNotificationSuccess,
    toggleButtonOffBackgroundColor: themeLightBackgroundBase,
    toggleButtonSwitchBackgroundColor: themeLightPrimary,
    toggleButtonOnHoverBackgroundColor: themeLight.successColorDarken,
    toggleButtonOnBorderColor: themeLightNotificationSuccess,
    toggleButtonOnHoverBorderColor: themeLight.successColorDarken,
    toggleButtonOffHoverBorderColor: themeLightPrimary,
    toggleButtonOffBorderColor: themeLightContrastMedium,
    toggleButtonDisabledColor: themeLightStateDisabled,
  },
  modeParams: {
    [PdsThemeMode.DARK]: {
      toggleButtonOnBackgroundColor: themeDarkNotificationSuccess,
      toggleButtonOffBackgroundColor: themeDarkBackgroundBase,
      toggleButtonSwitchBackgroundColor: themeDarkPrimary,
      toggleButtonOnHoverBackgroundColor: themeDark.successColorDarken,
      toggleButtonOnBorderColor: themeDarkNotificationSuccess,
      toggleButtonOnHoverBorderColor: themeDark.successColorDarken,
      toggleButtonOffHoverBorderColor: themeDarkPrimary,
      toggleButtonOffBorderColor: themeDarkContrastMedium,
      toggleButtonDisabledColor: themeDarkStateDisabled,
    },
  },
  css: `
    .ag-toggle-button-input-wrapper {
        border: ${borderWidthBase} solid var(--ag-toggle-button-off-border-color);
        position: relative;

        &::before {
            height: calc(var(--ag-toggle-button-height) - ${spacingStaticXSmall} * 2) !important;
            width: calc(var(--ag-toggle-button-height) - ${spacingStaticXSmall} * 2) !important;
            top: calc(${spacingStaticXSmall} - ${borderWidthBase}) !important;
            left: calc(${spacingStaticXSmall} - ${borderWidthBase}) !important;
        }

        &.ag-checked {
            border-color: var(--ag-toggle-button-on-border-color);

            &::before {
                --ag-toggle-button-switch-background-color: ${themeLightBackgroundBase};
                --ag-toggle-button-on-border-color: ${themeLightBackgroundBase};
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
