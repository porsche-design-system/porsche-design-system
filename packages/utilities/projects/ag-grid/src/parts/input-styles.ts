import { createPart, type Part } from 'ag-grid-community';
import {
  borderRadiusXl,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastMedium,
  colorContrastMediumDark,
  colorDisabledDark,
  colorDisabledLight,
  colorErrorDark,
  colorErrorLight,
  colorPrimaryDark,
  colorPrimaryLight,
} from '../styles';
import { pdsThemeModeDark } from '../types/theme-mode';

export const inputStyles: Part = createPart({
  feature: 'inputStyles',
  params: {
    inputBorder: `1px solid ${colorContrastMedium}`,
    inputInvalidBorder: `1px solid ${colorErrorLight}`,
    inputDisabledBorder: `1px solid ${colorDisabledLight}`,
    inputDisabledBackgroundColor: colorCanvasLight,
    inputFocusBorder: `1px solid ${colorPrimaryLight}`,
  },
  modeParams: {
    [pdsThemeModeDark]: {
      inputBorder: `1px solid ${colorContrastMediumDark}`,
      inputInvalidBorder: `1px solid ${colorErrorDark}`,
      inputDisabledBorder: `1px solid ${colorDisabledDark}`,
      inputDisabledBackgroundColor: colorCanvasDark,
      inputFocusBorder: `1px solid ${colorPrimaryDark}`,
    },
  },
  css: `
    .ag-text-field-input {
      border-radius: ${borderRadiusXl};
    }
  `,
});
