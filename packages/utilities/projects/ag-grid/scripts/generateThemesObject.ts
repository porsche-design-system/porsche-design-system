import {
  colorCanvas,
  colorContrastLow,
  colorContrastLower,
  colorDisabled,
  colorErrorLow,
  colorFocus,
  colorFrosted,
  colorFrostedSoft,
  colorInfo,
  colorInfoLow,
  colorPrimary,
  colorSuccess,
  colorSuccessFrostedSoft,
  colorSuccessLow,
  colorSurface,
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
  colorSuccessFrostedSoft,
  radiusMd,
  colorSuccessLow,
  radiusSm,
  radiusXl,
  colorCanvas,
  colorContrastLower,
  colorContrastLow,
  colorDisabled,
  colorErrorLow,
  colorFocus,
  colorFrosted,
  colorFrostedSoft,
  colorInfo,
  colorInfoLow,
  colorPrimary,
  colorSuccess,
  colorSurface,
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
