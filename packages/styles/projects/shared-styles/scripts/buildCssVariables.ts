import fs from 'node:fs';
import {
  colorBackdropDark,
  colorBackdropLight,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastHighDark,
  colorContrastHigherDark,
  colorContrastHigherLight,
  colorContrastHighLight,
  colorContrastLowDark,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorContrastMediumDark,
  colorContrastMediumLight,
  colorDisabledDark,
  colorDisabledLight,
  colorErrorDark,
  colorErrorFrostedDark,
  colorErrorFrostedLight,
  colorErrorFrostedSoftDark,
  colorErrorFrostedSoftLight,
  colorErrorLight,
  colorErrorLowDark,
  colorErrorLowLight,
  colorErrorMediumDark,
  colorErrorMediumLight,
  colorFocusDark,
  colorFocusLight,
  colorFrostedDark,
  colorFrostedLight,
  colorFrostedSoftDark,
  colorFrostedSoftLight,
  colorInfoDark,
  colorInfoFrostedDark,
  colorInfoFrostedLight,
  colorInfoFrostedSoftDark,
  colorInfoFrostedSoftLight,
  colorInfoLight,
  colorInfoLowDark,
  colorInfoLowLight,
  colorInfoMediumDark,
  colorInfoMediumLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccessDark,
  colorSuccessFrostedDark,
  colorSuccessFrostedLight,
  colorSuccessFrostedSoftDark,
  colorSuccessFrostedSoftLight,
  colorSuccessLight,
  colorSuccessLowDark,
  colorSuccessLowLight,
  colorSuccessMediumDark,
  colorSuccessMediumLight,
  colorSurfaceDark,
  colorSurfaceLight,
  colorWarningDark,
  colorWarningFrostedDark,
  colorWarningFrostedLight,
  colorWarningFrostedSoftDark,
  colorWarningFrostedSoftLight,
  colorWarningLight,
  colorWarningLowDark,
  colorWarningLowLight,
  colorWarningMediumDark,
  colorWarningMediumLight,
} from '@porsche-design-system/tokens';
import { camelCase } from 'change-case';

type ThemeVariant = 'light' | 'dark';
type ColorMap = Record<string, Record<ThemeVariant, string>>;

const cssVariablesColorMap: ColorMap = {
  /* a11y */
  focus: { light: colorFocusLight, dark: colorFocusDark },
  disabled: { light: colorDisabledLight, dark: colorDisabledDark },
  /* background */
  canvas: { light: colorCanvasLight, dark: colorCanvasDark },
  surface: { light: colorSurfaceLight, dark: colorSurfaceDark },
  frosted: { light: colorFrostedLight, dark: colorFrostedDark },
  'frosted-soft': { light: colorFrostedSoftLight, dark: colorFrostedSoftDark },
  backdrop: { light: colorBackdropLight, dark: colorBackdropDark },
  /* foreground */
  'contrast-lower': { light: colorContrastLowerLight, dark: colorContrastLowerDark },
  'contrast-low': { light: colorContrastLowLight, dark: colorContrastLowDark },
  'contrast-medium': { light: colorContrastMediumLight, dark: colorContrastMediumDark },
  'contrast-high': { light: colorContrastHighLight, dark: colorContrastHighDark },
  'contrast-higher': { light: colorContrastHigherLight, dark: colorContrastHigherDark },
  primary: { light: colorPrimaryLight, dark: colorPrimaryDark },
  /* semantic */
  success: { light: colorSuccessLight, dark: colorSuccessDark },
  'success-low': { light: colorSuccessLowLight, dark: colorSuccessLowDark },
  'success-medium': { light: colorSuccessMediumLight, dark: colorSuccessMediumDark },
  'success-frosted': { light: colorSuccessFrostedLight, dark: colorSuccessFrostedDark },
  'success-frosted-soft': {
    light: colorSuccessFrostedSoftLight,
    dark: colorSuccessFrostedSoftDark,
  },
  warning: { light: colorWarningLight, dark: colorWarningDark },
  'warning-low': { light: colorWarningLowLight, dark: colorWarningLowDark },
  'warning-medium': { light: colorWarningMediumLight, dark: colorWarningMediumDark },
  'warning-frosted': { light: colorWarningFrostedLight, dark: colorWarningFrostedDark },
  'warning-frosted-soft': {
    light: colorWarningFrostedSoftLight,
    dark: colorWarningFrostedSoftDark,
  },
  error: { light: colorErrorLight, dark: colorErrorDark },
  'error-low': { light: colorErrorLowLight, dark: colorErrorLowDark },
  'error-medium': { light: colorErrorMediumLight, dark: colorErrorMediumDark },
  'error-frosted': { light: colorErrorFrostedLight, dark: colorErrorFrostedDark },
  'error-frosted-soft': { light: colorErrorFrostedSoftLight, dark: colorErrorFrostedSoftDark },
  info: { light: colorInfoLight, dark: colorInfoDark },
  'info-low': { light: colorInfoLowLight, dark: colorInfoLowDark },
  'info-medium': { light: colorInfoMediumLight, dark: colorInfoMediumDark },
  'info-frosted': { light: colorInfoFrostedLight, dark: colorInfoFrostedDark },
  'info-frosted-soft': { light: colorInfoFrostedSoftLight, dark: colorInfoFrostedSoftDark },
  /* special */
  skeleton: { light: '#f7f7f7', dark: '#1a1b1e' },
};

// Generates map: { '--color-primary': { value: '#...', name: 'colorPrimary' }, ... }
const getColorVariablesMap = (theme: ThemeVariant, prefix: string = '') =>
  Object.fromEntries(
    Object.entries(cssVariablesColorMap).map(([key, value]) => [
      `--${prefix ? `${prefix}-` : ''}color-${key}`,
      { value: value[theme], name: camelCase(`${key}-color`) },
    ])
  );

// Generates CSS string: "--color-primary: #...; --color-success: #...; ..."
const generateCssDefinition = (theme: ThemeVariant, prefix?: string) =>
  Object.entries(getColorVariablesMap(theme, prefix))
    .map(([key, { value }]) => `${key}: ${value};`)
    .join('\n');

// Shared prefix constant
const CSS_VAR_PREFIX = 'p';

// CSS variable definitions for :root or CSS classes
// Output: "--color-primary: #...; --color-success: #...; ..."
const cssVariableDefinitionLight = generateCssDefinition('light');
const cssVariableDefinitionDark = generateCssDefinition('dark');
const prefixedCssVariableDefinitionLight = generateCssDefinition('light', CSS_VAR_PREFIX);
const prefixedCssVariableDefinitionDark = generateCssDefinition('dark', CSS_VAR_PREFIX);

// JavaScript object for CSS-in-JS usage with var()
// Output: { colorPrimary: 'var(--p-color-primary)', colorSuccess: 'var(--p-color-success)', ... }
const cssVariables = Object.fromEntries(
  Object.entries(getColorVariablesMap('light', CSS_VAR_PREFIX)).map(([key, { name }]) => [name, `var(${key})`])
);

export const buildCssVariables = () => {
  const targetPath = './src/generated';
  fs.mkdirSync(targetPath, { recursive: true });

  // Build cssVariableDefinitionLight.ts
  fs.writeFileSync(
    `./${targetPath}/cssVariableDefinitionLight.ts`,
    `export const cssVariableDefinitionLight = \`\n${cssVariableDefinitionLight}\n\`;\n`
  );

  // Build cssVariableDefinitionDark.ts
  fs.writeFileSync(
    `./${targetPath}/cssVariableDefinitionDark.ts`,
    `export const cssVariableDefinitionDark = \`\n${cssVariableDefinitionDark}\n\`;\n`
  );

  // Build prefixedCssVariableDefinitionLight.ts
  fs.writeFileSync(
    `./${targetPath}/prefixedCssVariableDefinitionLight.ts`,
    `export const prefixedCssVariableDefinitionLight = \`\n${prefixedCssVariableDefinitionLight}\n\`;\n`
  );

  // Build prefixedCssVariableDefinitionDark.ts
  fs.writeFileSync(
    `./${targetPath}/prefixedCssVariableDefinitionDark.ts`,
    `export const prefixedCssVariableDefinitionDark = \`\n${prefixedCssVariableDefinitionDark}\n\`;\n`
  );

  // Build cssVariables.ts
  fs.writeFileSync(
    `./${targetPath}/cssVariables.ts`,
    `export const cssVariables = ${JSON.stringify(cssVariables)} as const;\n`
  );

  console.log('✓ Built CSS variable definition files');
};

buildCssVariables();
