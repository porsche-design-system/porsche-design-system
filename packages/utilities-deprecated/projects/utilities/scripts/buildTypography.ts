import * as fs from 'fs';
import * as path from 'path';
import { font, fontWeight, mediaQuery } from '../src/js';
import { pascalCase } from 'change-case';

const buildTypography = (): void => {
  const { family, size, weight } = font;

  const fontBase = {
    fontFamily: family,
    fontWeight: weight.semibold,
  };

  const title = {
    large: {
      ...fontBase,
      ...size['32'],
      [mediaQuery('s', 'm')]: { fontSize: size['42'].fontSize },
      [mediaQuery('m', 'l')]: { fontSize: size['52'].fontSize },
      [mediaQuery('l', 'xl')]: { fontSize: size['62'].fontSize },
      [mediaQuery('xl')]: { fontSize: size['72'].fontSize },
    },
  };

  const headline = {
    '1': {
      ...fontBase,
      ...size['28'],
      [mediaQuery('s', 'm')]: { fontSize: size['36'].fontSize },
      [mediaQuery('m', 'l')]: { fontSize: size['44'].fontSize },
      [mediaQuery('l', 'xl')]: { fontSize: size['52'].fontSize },
      [mediaQuery('xl')]: { fontSize: size['60'].fontSize },
    },
    '2': {
      ...fontBase,
      ...size['24'],
      [mediaQuery('s', 'm')]: { fontSize: size['30'].fontSize },
      [mediaQuery('m', 'l')]: { fontSize: size['36'].fontSize },
      [mediaQuery('l', 'xl')]: { fontSize: size['42'].fontSize },
      [mediaQuery('xl')]: { fontSize: size['48'].fontSize },
    },
    '3': {
      ...fontBase,
      ...size['20'],
      [mediaQuery('s', 'm')]: { fontSize: size['24'].fontSize },
      [mediaQuery('m', 'l')]: { fontSize: size['28'].fontSize },
      [mediaQuery('l', 'xl')]: { fontSize: size['32'].fontSize },
      [mediaQuery('xl')]: { fontSize: size['36'].fontSize },
    },
    '4': {
      ...fontBase,
      ...size['16'],
      [mediaQuery('s', 'm')]: { fontSize: size['18'].fontSize },
      [mediaQuery('m', 'l')]: { fontSize: size['20'].fontSize },
      [mediaQuery('l', 'xl')]: { fontSize: size['22'].fontSize },
      [mediaQuery('xl')]: { fontSize: size['24'].fontSize },
    },
    '5': {
      ...fontBase,
      ...size['16'],
    },
  };

  const baseText = {
    fontFamily: font.family,
    fontWeight: font.weight.regular,
  };

  const text = {
    xSmall: { ...baseText, ...font.size.xSmall },
    small: { ...baseText, ...font.size.small },
    medium: { ...baseText, ...font.size.medium },
    large: { ...baseText, ...font.size.large },
    xLarge: { ...baseText, ...font.size.xLarge },
  };

  const flippedFontWeightMap = Object.entries(fontWeight)
    .map(([key, value]) => [value, key])
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});

  const formatValues = (obj: object): string =>
    JSON.stringify(obj, null, 2)
      .replace(/("fontFamily": .*)/, 'fontFamily,') // use reference
      .replace(/"fontWeight": (\d*)/, (match, group) => `fontWeight: fontWeight.${flippedFontWeightMap[group]}`) // use reference
      .replace(/"([a-zA-Z]+)":/g, '$1:') // remove quotes around keys that don't need it
      .replace(/"/g, "'"); // replace quotes

  const objectToConst = (obj: object, constName: string): string =>
    Object.entries(obj)
      .map(([key, value]) => `export const ${constName + pascalCase(key)} = ${formatValues(value)};`)
      .concat(
        `export const ${constName} = {
  ${Object.keys(obj)
    .map((key) => `${key}: ${constName + pascalCase(key)}`)
    .join(',\n  ')}
};`
      )
      .join('\n\n');

  const imports = "import { fontFamily, fontWeight } from '../variables';";
  const titles = objectToConst(title, 'title');
  const headlines = objectToConst(headline, 'headline');
  const texts = objectToConst(text, 'text');

  const content = ['/* Auto Generated File */', imports, titles, headlines, texts].join('\n\n');

  const file = path.normalize('./src/js/functions/typography.ts');

  fs.writeFileSync(file, content);
};

buildTypography();
