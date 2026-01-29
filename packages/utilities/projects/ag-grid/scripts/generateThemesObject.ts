import {
  borderRadiusLg,
  borderRadiusMd,
  borderRadiusSm,
  borderRadiusXl,
  borderWidthRegular,
  borderWidthThin,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastHighDark,
  colorContrastHighLight,
  colorContrastLowDark,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorContrastMedium,
  colorContrastMediumDark,
  colorContrastMediumLight,
  colorDisabledDark,
  colorDisabledLight,
  colorErrorDark,
  colorErrorLight,
  colorFocusDark,
  colorFocusLight,
  colorFrostedDark,
  colorFrostedLight,
  colorFrostedSoftDark,
  colorFrostedSoftLight,
  colorInfoDark,
  colorInfoLight,
  colorInfoLowDark,
  colorInfoLowLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccessDark,
  colorSuccessLight,
  colorSurfaceDark,
  colorSurfaceLight,
  fontFamilyPorscheNext,
  fontSizeSm,
  fontSizeXs,
  fontWeightSemiBold,
  spacingStaticXs,
} from '@porsche-design-system/tokens';
import * as fs from 'fs';
import * as path from 'path';

const styles = {
  borderRadiusLg,
  borderWidthThin,
  borderRadiusMd,
  borderRadiusSm,
  borderRadiusXl,
  borderWidthRegular,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastHighDark,
  colorContrastHighLight,
  colorContrastLowDark,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorContrastMedium,
  colorContrastMediumDark,
  colorContrastMediumLight,
  colorDisabledDark,
  colorDisabledLight,
  colorErrorDark,
  colorErrorLight,
  colorFocusDark,
  colorFocusLight,
  colorFrostedDark,
  colorFrostedLight,
  colorFrostedSoftDark,
  colorFrostedSoftLight,
  colorInfoDark,
  colorInfoLight,
  colorInfoLowDark,
  colorInfoLowLight,
  colorPrimaryDark,
  colorPrimaryLight,
  colorSuccessDark,
  colorSuccessLight,
  colorSurfaceDark,
  colorSurfaceLight,
  fontFamilyPorscheNext,
  fontSizeSm,
  fontSizeXs,
  fontWeightSemiBold,
  spacingStaticXs,
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
