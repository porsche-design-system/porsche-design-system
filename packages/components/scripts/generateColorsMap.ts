import type { Theme } from '@porsche-design-system/utilities-v2';
import type { ThemedColors } from '../src/styles';
import * as path from 'path';
import * as fs from 'fs';
import { color } from '@porsche-design-system/utilities-v2';
import tinycolor2 from 'tinycolor2';

const darkenColor = (color: string) => tinycolor2(color).darken(12).toHexString();

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

  return {
    baseColor,
    baseColorDarken: darkenColor(baseColor),
    brandColor,
    backgroundColor,
    backgroundSurfaceColor,
    contrastLowColor,
    contrastMediumColor,
    contrastHighColor,
    contrastHighColorDarken: darkenColor(contrastHighColor),
    hoverColor,
    hoverColorDarken: darkenColor(hoverColor),
    activeColor,
    focusColor,
    disabledColor,
    errorColor,
    errorColorDarken: darkenColor(errorColor),
    errorSoftColor,
    successColor,
    successColorDarken: darkenColor(successColor),
    successSoftColor,
    warningColor,
    warningSoftColor,
    neutralColor,
    neutralSoftColor,
  };
};

const themedColorsMap: { [key in Theme]: ThemedColors } = {
  light: getStaticThemedColors('light'),
  dark: getStaticThemedColors('dark'),
  'light-electric': getStaticThemedColors('light-electric'),
  'dark-electric': getStaticThemedColors('dark-electric'),
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

  const content = `const themedColorsMap: { [key in Theme]: ThemedColors } = ${formatValues(themedColorsMap)};`;

  const fileContent = fs.readFileSync(targetPath, 'utf8');
  const newFileContent = fileContent.replace(
    /(\/\* Auto Generated Start \*\/\s)(?:.|\s)*?(\s\/\* Auto Generated End \*\/)/,
    `$1${content}$2`
  );
  fs.writeFileSync(targetPath, newFileContent);
  console.log(`Injected static colors map into '${targetPath}'`);
};

generateColorsMap();
