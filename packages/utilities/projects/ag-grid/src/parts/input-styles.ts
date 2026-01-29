import { createPart, type Part } from 'ag-grid-community';
import {
  borderRadiusXl,
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
} from '../styles';
import { pdsThemeModeDark } from '../types/theme-mode';

export const inputStyles: Part = createPart({
  feature: 'inputStyles',
  params: {
    inputBorder: `solid ${borderWidthThin} ${colorContrastLowerLight}`,
    inputInvalidBorder: `solid ${borderWidthThin} ${colorErrorLowLight}`,
    inputDisabledBorder: `solid ${borderWidthThin} ${colorDisabledLight}`,
    inputDisabledBackgroundColor: colorCanvasLight,
    inputFocusBorder: `solid ${borderWidthThin} ${colorPrimaryLight}`,
  },
  modeParams: {
    [pdsThemeModeDark]: {
      inputBorder: `solid ${borderWidthThin} ${colorContrastLowerDark}`,
      inputInvalidBorder: `solid ${borderWidthThin} ${colorErrorLowDark}`,
      inputDisabledBorder: `solid ${borderWidthThin} ${colorDisabledDark}`,
      inputDisabledBackgroundColor: colorCanvasDark,
      inputFocusBorder: `solid ${borderWidthThin} ${colorPrimaryDark}`,
    },
  },
  css: `
    .ag-text-field-input {
      border-radius: ${borderRadiusXl};
    }
  `,
});
