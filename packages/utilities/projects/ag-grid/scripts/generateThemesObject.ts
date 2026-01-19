import {
  borderRadiusMedium,
  borderRadiusSmall,
  borderWidthBase,
  fontFamily,
  fontSizeTextSmall,
  fontSizeTextXSmall,
  fontWeightSemiBold,
  spacingStaticXSmall,
  themeDarkBackgroundBase,
  themeDarkBackgroundFrosted,
  themeDarkBackgroundSurface,
  themeDarkContrastHigh,
  themeDarkContrastLow,
  themeDarkContrastMedium,
  themeDarkNotificationError,
  themeDarkNotificationInfo,
  themeDarkNotificationSuccess,
  themeDarkPrimary,
  themeDarkStateDisabled,
  themeDarkStateFocus,
  themeDarkStateHover,
  themeLightBackgroundBase,
  themeLightBackgroundFrosted,
  themeLightBackgroundSurface,
  themeLightContrastHigh,
  themeLightContrastLow,
  themeLightContrastMedium,
  themeLightNotificationError,
  themeLightNotificationInfo,
  themeLightNotificationSuccess,
  themeLightPrimary,
  themeLightStateDisabled,
  themeLightStateFocus,
  themeLightStateHover,
} from '@porsche-design-system/emotion';
import * as fs from 'fs';
import * as path from 'path';

const styles = {
  borderRadiusMedium,
  borderRadiusSmall,
  fontFamily,
  fontSizeTextSmall,
  fontSizeTextXSmall,
  fontWeightSemiBold,
  themeDarkBackgroundBase,
  themeDarkBackgroundFrosted,
  themeDarkBackgroundSurface,
  themeDarkContrastLow,
  themeDarkContrastMedium,
  themeDarkNotificationError,
  themeDarkNotificationInfo,
  themeDarkPrimary,
  themeDarkStateDisabled,
  themeDarkStateFocus,
  themeDarkStateHover,
  themeLightBackgroundBase,
  themeLightBackgroundFrosted,
  themeLightBackgroundSurface,
  themeLightContrastLow,
  themeLightContrastMedium,
  themeLightNotificationError,
  themeLightNotificationInfo,
  themeLightPrimary,
  themeLightStateDisabled,
  themeLightStateFocus,
  themeLightStateHover,
  themeDarkContrastHigh,
  themeLightContrastHigh,
  borderWidthBase,
  spacingStaticXSmall,
  themeDarkNotificationSuccess,
  themeLightNotificationSuccess,
  themeLightBackgroundSurfaceDarken: themeLightBackgroundSurface,
  themeDarkBackgroundSurfaceDarken: themeDarkBackgroundSurface,
  themeLightSuccessColorDarken: themeLightNotificationSuccess,
  themeDarkSuccessColorDarken: themeDarkNotificationSuccess,
};

const generateThemesObject = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const targetDirectory = path.resolve(rootDirectory, './src');
  const targetFilename = 'styles.ts';
  const targetPath = path.resolve(targetDirectory, targetFilename);

  const content = Object.entries(styles)
    .map(([token, value]) => `export const ${token} = ${typeof value === 'number' ? value : `"${value}"`};`)
    .join('\n');

  const fileContent = fs.readFileSync(targetPath, 'utf8');
  const newFileContent = fileContent.replace(
    /(\/\* Auto Generated Start \*\/\s)[\s\S]*?(\s\/\* Auto Generated End \*\/)/,
    `$1${content}$2`
  );
  fs.writeFileSync(targetPath, newFileContent);
  console.log(`Injected static colors map into '${targetPath}'`);
};

generateThemesObject();
