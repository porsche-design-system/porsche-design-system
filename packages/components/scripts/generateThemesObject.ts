import type { Theme } from '@porsche-design-system/utilities-v2';
import type { ThemedColors } from '../src/styles';
import * as path from 'path';
import * as fs from 'fs';
import { themeLight, themeDark } from '@porsche-design-system/utilities-v2';
import tinycolor2 from 'tinycolor2';
import { pascalCase } from 'change-case';

const darkenColor = (color: string) => tinycolor2(color).darken(12).toHexString().toUpperCase();
const darkenColorSlightly = (color: string) => tinycolor2(color).darken(6).desaturate(37).toHexString().toUpperCase();

const lightenColor = (color: string) => tinycolor2(color).lighten(12).toHexString().toUpperCase();
const lightenColorSlightly = (color: string) => tinycolor2(color).lighten(6).desaturate(37).toHexString().toUpperCase();

const getStaticThemedColors = (theme: Theme): ThemedColors => {
  const {
    primary: primaryColor,
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
      info: infoColor,
      infoSoft: infoSoftColor,
    },
  } = {
    light: themeLight,
    dark: themeDark,
  }[theme];

  return {
    primaryColor,
    primaryColorDarken: darkenColor(primaryColor),
    backgroundColor,
    // TODO: since such colors are being used only in Tag, it makes sense to move such colors into tag utils,
    //  in order to decrease the chances to use the wrong colors
    backgroundColorDarken: darkenColor(backgroundColor),
    backgroundColorLighten: lightenColor(backgroundColor),
    backgroundSurfaceColor,
    backgroundSurfaceColorDarken: darkenColor(backgroundSurfaceColor),
    backgroundSurfaceColorLighten: lightenColor(backgroundSurfaceColor),
    contrastLowColor,
    contrastMediumColor,
    contrastHighColor,
    contrastHighColorDarken: darkenColor(contrastHighColor),
    contrastHighColorLighten: lightenColor(contrastHighColor),
    hoverColor,
    hoverColorDarken: darkenColor(hoverColor),
    activeColor,
    focusColor,
    disabledColor,
    errorColor,
    errorColorDarken: darkenColor(errorColor),
    errorSoftColor,
    errorSoftColorDarken: darkenColorSlightly(errorSoftColor),
    errorSoftColorLighten: lightenColorSlightly(errorSoftColor),
    successColor,
    successColorDarken: darkenColor(successColor),
    successSoftColor,
    successSoftColorDarken: darkenColorSlightly(successSoftColor),
    successSoftColorLighten: lightenColorSlightly(successSoftColor),
    warningColor,
    warningSoftColor,
    warningSoftColorDarken: darkenColorSlightly(warningSoftColor),
    warningSoftColorLighten: lightenColorSlightly(warningSoftColor),
    infoColor,
    infoSoftColor,
    infoSoftColorDarken: darkenColorSlightly(infoSoftColor),
    infoSoftColorLighten: lightenColorSlightly(infoSoftColor),
  };
};

const themes: { [key in Theme]: ThemedColors } = {
  light: getStaticThemedColors('light'),
  dark: getStaticThemedColors('dark'),
  auto: getStaticThemedColors('light'),
};

const objectToConst = (obj: object, constName: string): string =>
  (Object.entries(obj) as [Theme, ThemedColors][])
    .map(([theme, colors]) => `const ${constName + pascalCase(theme)} = ${formatValues(theme, colors)};`)
    .concat(
      `const ${constName}s = {
  ${Object.keys(obj)
    .map((key) => `'${key}': ${constName + pascalCase(key)}`)
    .join(',\n  ')}
};`
    )
    .join('\n\n');

const formatValues = (theme: Theme, colors: ThemedColors): string => {
  const isBaseTheme = ['light', 'dark'].includes(theme);

  // reduce themed colors object for themes other than base theme 'light' and 'dark'
  const reducedThemedColors: Partial<ThemedColors> = Object.fromEntries(
    (Object.entries(colors) as [keyof ThemedColors, string][]).filter(([key, color]) => {
      const { light: lightTheme, dark: darkTheme } = themes;
      return (
        isBaseTheme ||
        (/^light-/i.test(theme) && lightTheme[key] !== color) ||
        (/^dark-/i.test(theme) && darkTheme[key] !== color)
      );
    })
  );

  // clean up colors object
  let result = JSON.stringify(reducedThemedColors, null, 2)
    .replace(/"([a-zA-Z]+)":/g, '$1:') // remove quotes around keys that don't need it
    .replace(/"/g, "'"); // replace quotes

  // colors object composition with base themes
  if (!isBaseTheme) {
    result = result.replace(/^{/, `{\n  ...theme${/dark-/i.test(theme) ? 'Dark' : 'Light'},`);
  }

  return result;
};

const generateThemesObject = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const targetDirectory = path.resolve(rootDirectory, './src/styles');
  const targetFilename = 'colors.ts';
  const targetPath = path.resolve(targetDirectory, targetFilename);

  const content = objectToConst(themes, 'theme');

  const fileContent = fs.readFileSync(targetPath, 'utf8');
  const newFileContent = fileContent.replace(
    /(\/\* Auto Generated Start \*\/\s)[\s\S]*?(\s\/\* Auto Generated End \*\/)/,
    `$1${content}$2`
  );
  fs.writeFileSync(targetPath, newFileContent);
  console.log(`Injected static colors map into '${targetPath}'`);
};

generateThemesObject();
