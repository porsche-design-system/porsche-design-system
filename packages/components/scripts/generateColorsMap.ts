import type { Theme } from '@porsche-design-system/utilities-v2';
import type { ThemedColors } from '../src/styles';
import * as path from 'path';
import * as fs from 'fs';
import { color } from '@porsche-design-system/utilities-v2';

type ThemedColorsDarken = {
  [K in keyof Pick<
    ThemedColors,
    'baseColor' | 'contrastHighColor' | 'successColor' | 'errorColor' | 'hoverColor'
  > as `${K}Darken`]: string;
};

const themeLightDarken: ThemedColorsDarken = {
  baseColorDarken: '#000',
  contrastHighColorDarken: '#151718',
  successColorDarken: '#014d0c',
  errorColorDarken: '#a30000',
  hoverColorDarken: '#980014',
};

const themeDarkDarken: ThemedColorsDarken = {
  baseColorDarken: '#e0e0e0',
  contrastHighColorDarken: '#c3c5c8',
  successColorDarken: '#017d14',
  errorColorDarken: '#d30303',
  hoverColorDarken: '#c4001a',
};

const themeLightElectricDarken: ThemedColorsDarken = {
  ...themeLightDarken,
  hoverColorDarken: '#0084b7',
};

const themeDarkElectricDarken: ThemedColorsDarken = {
  ...themeDarkDarken,
  hoverColorDarken: '#0084b7',
};

const themedColorsDarkenMap: { [key in Theme]: ThemedColorsDarken } = {
  light: themeLightDarken,
  dark: themeDarkDarken,
  'light-electric': themeLightElectricDarken,
  'dark-electric': themeDarkElectricDarken,
};

const getStaticThemedColors = (theme: Theme): ThemedColors => {
  const {
    base: baseColor,
    brand: brandColor,
    background: { base: backgroundColor, surface: backgroundSurfaceColor },
    contrast: { low: contrastLowColor, medium: contrastMediumColor, high: contrastHighColor },
    state: { hover: hoverColor, active: activeColor, focus: focusColor, disabled: disabledColor },
    notification: {
      error: errorColor,
      errorSoft: errorSoftColor,
      success: successColor,
      successSoft: successSoftColor,
      warning: warningColor,
      warningSoft: warningSoftColor,
      neutral: neutralColor,
      neutralSoft: neutralSoftColor,
    },
  } = color[theme];

  const { baseColorDarken, contrastHighColorDarken, successColorDarken, errorColorDarken, hoverColorDarken } =
    themedColorsDarkenMap[theme];

  return {
    baseColor,
    baseColorDarken,
    brandColor,
    backgroundColor,
    backgroundSurfaceColor,
    contrastLowColor,
    contrastMediumColor,
    contrastHighColor,
    contrastHighColorDarken,
    hoverColor,
    hoverColorDarken,
    activeColor,
    focusColor,
    disabledColor,
    errorColor,
    errorColorDarken,
    errorSoftColor,
    successColor,
    successColorDarken,
    successSoftColor,
    warningColor,
    warningSoftColor,
    neutralColor,
    neutralSoftColor,
  };
};

const formatValues = (obj: object): string => {
  return JSON.stringify(obj, null, 2)
    .replace(/"([a-zA-Z]+)":/g, '$1:') // remove quotes around keys that don't need it
    .replace(/"/g, "'"); // replace quotes
};

const generateColorsMap = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const targetDirectory = path.resolve(rootDirectory, './src/styles');
  const targetFilename = 'colors.ts';
  const targetPath = path.resolve(targetDirectory, targetFilename);

  const themedColorsMap = `const themedColorsMap: { [key in Theme]: ThemedColors } = ${formatValues({
    light: getStaticThemedColors('light'),
    dark: getStaticThemedColors('dark'),
    'light-electric': getStaticThemedColors('light-electric'),
    'dark-electric': getStaticThemedColors('dark-electric'),
  })};`;

  const fileContent = fs.readFileSync(targetPath, 'utf8');
  const newFileContent = fileContent.replace(
    /(\/\* Auto Generated Start \*\/\s)(?:.|\s)*?(\s\/\* Auto Generated End \*\/)/,
    `$1${themedColorsMap}$2`
  );
  fs.writeFileSync(targetPath, newFileContent);
  console.log(`Injected static colors map into '${targetPath}'`);
};

generateColorsMap();
