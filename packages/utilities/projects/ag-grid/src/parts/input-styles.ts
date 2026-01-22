import { createPart, type Part } from 'ag-grid-community';
import {
  themeDarkBackgroundBase,
  themeDarkContrastMedium,
  themeDarkNotificationError,
  themeDarkPrimary,
  themeDarkStateDisabled,
  themeLightBackgroundBase,
  themeLightContrastMedium,
  themeLightNotificationError,
  themeLightPrimary,
  themeLightStateDisabled,
} from '../styles';
import { pdsThemeModeDark } from '../types/theme-mode';

export const inputStyles: Part = createPart({
  feature: 'inputStyles',
  params: {
    inputBorder: `1px solid ${themeLightContrastMedium}`,
    inputInvalidBorder: `1px solid ${themeLightNotificationError}`,
    inputDisabledBorder: `1px solid ${themeLightStateDisabled}`,
    inputDisabledBackgroundColor: themeLightBackgroundBase,
    inputFocusBorder: `1px solid ${themeLightPrimary}`,
  },
  modeParams: {
    [pdsThemeModeDark]: {
      inputBorder: `1px solid ${themeDarkContrastMedium}`,
      inputInvalidBorder: `1px solid ${themeDarkNotificationError}`,
      inputDisabledBorder: `1px solid ${themeDarkStateDisabled}`,
      inputDisabledBackgroundColor: themeDarkBackgroundBase,
      inputFocusBorder: `1px solid ${themeDarkPrimary}`,
    },
  },
  css: `
    .ag-text-field-input {
      border-radius: 12px;
    }
  `,
});
