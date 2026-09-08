import {
  colorCanvas,
  colorContrastLow,
  colorContrastLower,
  colorErrorLow,
  colorFocus,
  colorFrosted,
  colorFrostedSoft,
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

// These mirror the values used in the actual Stencil components.
const pdsCompactScalingFactor = 9 / 14;

/**
 * Helper to parse a token like '4px' or '1rem' into a numeric px value.
 * Supports 'px' and 'rem' (assuming 16px root).
 */
const parseTokenPx = (token: string): number => {
  if (token.endsWith('rem')) {
    return Number.parseFloat(token) * 16;
  }
  if (token.endsWith('px')) {
    return Number.parseFloat(token);
  }
  return Number.parseFloat(token);
};

// Border width used by PDS checkbox and switch (not a token, but a consistent PDS value)
const borderWidthThinPx = 1;

const pdsCheckboxBaseRem = 1.75;
const pdsCheckboxSize = pdsCheckboxBaseRem * 16; // 28px
const pdsCheckboxSizeCompact = Math.round(pdsCompactScalingFactor * pdsCheckboxSize); // 18px

// PDS Switch: buttonWidth = scaling × 3rem, buttonHeight = scaling × 1.75rem
// switchInset = spacingStaticXs - borderWidthThin
const pdsSwitchWidthBaseRem = 3;
const pdsSwitchWidth = pdsSwitchWidthBaseRem * 16; // 48px
const pdsSwitchHeight = pdsCheckboxBaseRem * 16; // 28px (same base as checkbox)
const pdsSwitchInset = parseTokenPx(spacingStaticXs) - borderWidthThinPx; // 4 - 1 = 3px
const pdsSwitchWidthCompact = Math.round(pdsCompactScalingFactor * pdsSwitchWidth); // 31px
const pdsSwitchHeightCompact = Math.round(pdsCompactScalingFactor * pdsSwitchHeight); // 18px
const pdsSwitchInsetCompact = Math.round(pdsCompactScalingFactor * pdsSwitchInset); // 2px

// PDS Icon: defaults to leadingNormal ≈ 24px
const pdsIconSize = 24;
const pdsIconSizeCompact = pdsCheckboxSizeCompact; // aligned with compact checkbox

// AG Grid spacing (grid-specific)
const gridSpacing = 10;
const gridSpacingCompact = 2;
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
  colorErrorLow,
  colorFocus,
  colorFrosted,
  colorFrostedSoft,
  colorInfoLow,
  colorPrimary,
  colorSuccess,
  colorSurface,
  fontPorscheNext,
  typescaleSm,
  typescaleXs,
  fontWeightSemibold,
  spacingStaticXs,
  // Component sizing (derived from PDS component)
  pdsCheckboxBorderWidth: borderWidthThinPx,
  pdsSwitchWidth,
  pdsSwitchHeight,
  pdsSwitchInset,
  pdsSwitchWidthCompact,
  pdsSwitchHeightCompact,
  pdsSwitchInsetCompact,
  pdsIconSize,
  pdsIconSizeCompact,
  gridSpacing,
  gridSpacingCompact,
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
