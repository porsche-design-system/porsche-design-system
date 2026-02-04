import {
  colorCanvasDark,
  colorCanvasLight,
  colorContrastLowDark,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorDisabledDark,
  colorDisabledLight,
  colorErrorLowDark,
  colorErrorLowLight,
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
  colorSuccessFrostedSoftDark,
  colorSuccessFrostedSoftLight,
  colorSuccessLight,
  colorSuccessLowDark,
  colorSuccessLowLight,
  colorSurfaceDark,
  colorSurfaceLight,
  fontPorscheNext,
  fontWeightSemibold,
  radiusLg,
  radiusMd,
  radiusSm,
  radiusXl,
  spacingStaticXs,
  typescaleSm,
  typescaleXs,
} from '@porsche-design-system/tokens';
import * as fs from 'fs';
import * as path from 'path';

const styles = {
  radiusLg,
  borderWidthThin: '1px',
  colorSuccessFrostedSoftDark,
  colorSuccessFrostedSoftLight,
  radiusMd,
  colorSuccessLowDark,
  colorSuccessLowLight,
  radiusSm,
  radiusXl,
  colorCanvasDark,
  colorCanvasLight,
  colorContrastLowDark,
  colorContrastLowerDark,
  colorContrastLowerLight,
  colorContrastLowLight,
  colorDisabledDark,
  colorDisabledLight,
  colorErrorLowDark,
  colorErrorLowLight,
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
  fontPorscheNext,
  typescaleSm,
  typescaleXs,
  fontWeightSemibold,
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
