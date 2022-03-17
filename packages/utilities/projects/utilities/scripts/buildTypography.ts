import type { FontSizeLineHeight, FontWeight } from '../src/jss/font/font-shared';
import * as fs from 'fs';
import * as path from 'path';
import { font } from '../src/jss/font/font';
import { mediaQueryMin, mediaQueryMinMax, breakpoint } from '../src/jss/media-query';
import { pascalCase } from 'change-case';
import type { JssStyle } from 'jss';

/**
 * This script is quite confusing. What happens is:
 * 1. build barreled objects for `title`, `headline` and `text` with media query functions based on central fontSize definitions
 * 2. process these objects into strings so that we can write them into files later
 * 3. during processing keys and values like media queries, fontFamily and fontWeight are made references again that need to be imported
 * 4. write each child object into a separate file and combine them in the barreled object of the initial structure for a nice dependency tree
 */
const buildTypography = (): void => {
  const { family, weight, size } = font;

  // font-style font-variant font-weight font-size/line-height font-family
  const fontShortHandTemplate = `normal normal fontWeight fontSize/lineHeight ${family}`;

  const getFontShortHandJssStyle = ({ fontSize, lineHeight }: FontSizeLineHeight, fontWeight: FontWeight): JssStyle => {
    const fontValue = fontShortHandTemplate
      .replace('fontWeight', `${weight[fontWeight]}`)
      .replace('fontSize', fontSize)
      .replace('lineHeight', `${lineHeight}`);

    return { font: fontValue };
  };

  const fontSize: { [key: number]: FontSizeLineHeight } = {
    12: size.xSmall,
    16: size.small,
    18: { fontSize: '1.125rem', lineHeight: 1.5555555556 },
    20: { fontSize: '1.25rem', lineHeight: 1.4 },
    22: { fontSize: '1.375rem', lineHeight: 1.4545454545 },
    24: size.medium,
    28: { fontSize: '1.75rem', lineHeight: 1.4285714286 },
    30: { fontSize: '1.875rem', lineHeight: 1.3333333333 },
    32: { fontSize: '2rem', lineHeight: 1.375 },
    36: size.large,
    42: { fontSize: '2.625rem', lineHeight: 1.2380952381 },
    44: { fontSize: '2.75rem', lineHeight: 1.1818181818 },
    48: { fontSize: '3rem', lineHeight: 1.25 },
    52: size.xLarge,
    60: { fontSize: '3.75rem', lineHeight: 1.2 },
    62: { fontSize: '3.875rem', lineHeight: 1.2258064516 },
    72: { fontSize: '4.5rem', lineHeight: 1.2222222222 },
    84: { fontSize: '5.25rem', lineHeight: 1.1904761905 },
  };

  const title = {
    large: {
      ...getFontShortHandJssStyle(fontSize[32], 'semibold'),
      [mediaQueryMinMax('s', 'm')]: fontSize[42],
      [mediaQueryMinMax('m', 'l')]: fontSize[52],
      [mediaQueryMinMax('l', 'xl')]: fontSize[62],
      [mediaQueryMin('xl')]: fontSize[72],
    },
  };

  const headline = {
    '1': {
      ...getFontShortHandJssStyle(fontSize[28], 'semibold'),
      [mediaQueryMinMax('s', 'm')]: fontSize[36],
      [mediaQueryMinMax('m', 'l')]: fontSize[44],
      [mediaQueryMinMax('l', 'xl')]: fontSize[52],
      [mediaQueryMin('xl')]: fontSize[60],
    },
    '2': {
      ...getFontShortHandJssStyle(fontSize[24], 'semibold'),
      [mediaQueryMinMax('s', 'm')]: fontSize[30],
      [mediaQueryMinMax('m', 'l')]: fontSize[36],
      [mediaQueryMinMax('l', 'xl')]: fontSize[42],
      [mediaQueryMin('xl')]: fontSize[48],
    },
    '3': {
      ...getFontShortHandJssStyle(fontSize[20], 'semibold'),
      [mediaQueryMinMax('s', 'm')]: fontSize[24],
      [mediaQueryMinMax('m', 'l')]: fontSize[28],
      [mediaQueryMinMax('l', 'xl')]: fontSize[32],
      [mediaQueryMin('xl')]: fontSize[36],
    },
    '4': {
      ...getFontShortHandJssStyle(fontSize[16], 'semibold'),
      [mediaQueryMinMax('s', 'm')]: fontSize[18],
      [mediaQueryMinMax('m', 'l')]: fontSize[20],
      [mediaQueryMinMax('l', 'xl')]: fontSize[22],
      [mediaQueryMin('xl')]: fontSize[24],
    },
    '5': {
      ...getFontShortHandJssStyle(fontSize[16], 'semibold'),
    },
  };

  const text = {
    xSmall: getFontShortHandJssStyle(font.size.xSmall, 'regular'),
    small: getFontShortHandJssStyle(font.size.small, 'regular'),
    medium: getFontShortHandJssStyle(font.size.medium, 'regular'),
    large: getFontShortHandJssStyle(font.size.large, 'regular'),
    xLarge: getFontShortHandJssStyle(font.size.xLarge, 'regular'),
  };

  const getFlippedMap = (map: { [key: string]: number }): { [key: number]: string } => {
    return Object.entries(map)
      .map(([key, value]) => [value, key])
      .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
  };

  const flippedFontWeightMap = getFlippedMap(weight);
  const flippedBreakpointMap = getFlippedMap(breakpoint);

  const formatValues = (obj: object): string =>
    JSON.stringify(obj, null, 2)
      .replace(
        /("font": )"(\w+) (\w+) (\w+) ([\w\/\.]+) (.+)"/,
        (match, key, fontStyle, fontVariant, fontWeight, fontSizeLineHeight, fontFamily) => {
          return `${key}\`\${fontStyle} \${fontVariant} \${fontWeight.${flippedFontWeightMap[fontWeight]}} ${fontSizeLineHeight} \${fontFamily}\``;
        }
      ) // use const references in string interpolation instead of hardcoded strings
      .replace(
        /"@media\s\(min-width:\s(\d*)px\)\sand\s\(max-width:\s(\d*)px\)"/g,
        (match, minBreakpoint, maxBreakpoint) =>
          `[mediaQueryMinMax('${flippedBreakpointMap[minBreakpoint]}', '${
            flippedBreakpointMap[parseInt(maxBreakpoint, 10) + 1]
          }')]`
      ) // use style helper + reference
      .replace(
        /"@media\s\(min-width:\s(\d*)px\)"/,
        (match, minBreakpoint) => `[mediaQueryMin('${flippedBreakpointMap[minBreakpoint]}')]`
      ) // use style helper + reference
      .replace(/"([a-zA-Z]+)":/g, '$1:') // remove quotes around keys that don't need it
      .replace(/"/g, "'"); // replace quotes

  const objectToConstArr = (obj: object, constName: string): { constName: string; content: string }[] => {
    return Object.entries(obj)
      .map(([key, value]) => ({
        constName: constName + pascalCase(key),
        content: `export const ${constName + pascalCase(key)} = ${formatValues(value)};`,
      }))
      .concat({
        constName,
        content: `export const ${constName} = {
  ${Object.keys(obj)
    .map((key) => `${key}: ${constName + pascalCase(key)}`)
    .join(',\n  ')}
};`,
      });
  };

  const targetDirectory = path.normalize('./src/jss/typography/lib');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const comment = '/* Auto Generated File */';
  const fontImport = "import { fontFamily, fontStyle, fontVariant, fontWeight } from '../../font/font';";
  const mediaQueryImport = "import { mediaQueryMin, mediaQueryMinMax } from '../../media-query';";

  const inputs: { fileName: string; imports: string[]; contents: object }[] = [
    { fileName: 'title', imports: [fontImport, mediaQueryImport], contents: title },
    { fileName: 'headline', imports: [fontImport, mediaQueryImport], contents: headline },
    { fileName: 'text', imports: [fontImport], contents: text },
  ];

  inputs
    .map(({ fileName, imports, contents }) => {
      const contentObjects = objectToConstArr(contents, fileName);
      const childImports = contentObjects.slice(0, -1).map(({ constName }) => constName);

      return contentObjects.map(({ constName, content }) => ({
        fileName: constName,
        content: [
          [
            comment,
            constName === fileName
              ? childImports.map((childImport) => `import { ${childImport} } from './${childImport}';`)
              : imports,
          ]
            .flat()
            .join('\n'),
          content,
          ...(constName === fileName ? [`export { ${childImports.join(', ')} };\n`] : []),
        ].join('\n\n'),
      }));
    })
    .flat()
    .forEach(({ fileName, content }) => {
      const targetFilename = `${fileName}.ts`;
      const targetPath = path.resolve(targetDirectory, targetFilename);

      fs.writeFileSync(targetPath, content);
    });
};

buildTypography();
