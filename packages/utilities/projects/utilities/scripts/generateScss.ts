import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import * as border from '../src/js/border';
import * as dropShadow from '../src/js/dropShadow';
import * as font from '../src/js/font';
import * as frostedGlass from '../src/js/frostedGlass';
import * as gradient from '../src/js/gradient';
import * as grid from '../src/js/grid/gridStyle';
import * as gridGap from '../src/js/grid/gridGap';
import * as gridFull from '../src/js/grid/gridFull';
import * as gridFullOffset from '../src/js/grid/gridFullOffset';
import * as gridWide from '../src/js/grid/gridWide';
import * as gridWideOffset from '../src/js/grid/gridWideOffset';
import * as gridExtended from '../src/js/grid/gridExtended';
import * as gridExtendedOffset from '../src/js/grid/gridExtendedOffset';
import * as gridBasic from '../src/js/grid/gridBasic';
import * as gridBasicOffset from '../src/js/grid/gridBasicOffset';
import * as gridNarrow from '../src/js/grid/gridNarrow';
import * as gridNarrowOffset from '../src/js/grid/gridNarrowOffset';
import * as theme from '../src/js/theme';
import * as spacing from '../src/js/spacing';
import * as heading from '../src/js/typography/heading';
import * as text from '../src/js/typography/text';
import * as display from '../src/js/typography/display';
import * as breakpoint from '../src/js/mediaQuery/breakpoint';
import { paramCase, camelCase } from 'change-case';
import { getCss } from '@porsche-design-system/shared';

const targetDirectory = './src/scss/lib';

interface Object {
  [k: string]: {} | Object;
}
const flattenObject = (obj: Object, prefix = ''): { [key: string]: string } => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = camelCase((prefix.length ? prefix + '-' : '') + k);
    if (typeof obj[k] === 'object') {
      Object.assign(acc, flattenObject(obj[k], pre));
    } else {
      // @ts-ignore
      acc[pre] = obj[k];
    }
    return acc;
  }, {});
};

const cleanLib = (): void => {
  fs.rmSync(path.normalize(targetDirectory), { force: true, recursive: true });
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });
};

const writeFile = async (filename: string, content: string): Promise<void> => {
  const targetPath = path.normalize(`${targetDirectory}/_${paramCase(filename)}.scss`);
  const contentFormatted = (await prettier.format(content, { parser: 'scss', printWidth: 120 }))
    .replace(/calc\s+\(/g, 'calc(') // fix issue with prettier
    .replace(/\s*\/\s*/g, '/'); // fix issue with prettier
  fs.writeFileSync(targetPath, contentFormatted);
  console.log(`Auto generated SCSS file: ${targetPath}`);
};

interface Variables {
  [k: string]: {} | Variables;
}
const generateVariables = async (variables: Variables): Promise<void> => {
  for (const [filename, map] of Object.entries(variables)) {
    const mapFlattened = flattenObject(map);
    const content = Object.entries(mapFlattened)
      .map(([k, v]) => `$pds-${paramCase(k)}: ${v};`)
      .join('\n');

    await writeFile(filename, content);
  }
};

interface Mixins {
  [k: string]: {} | Mixins;
}
const generateMixins = async (mixins: Mixins): Promise<void> => {
  for (const [filename, map] of Object.entries(mixins)) {
    const content = Object.entries(map)
      .map(([k, v]) => {
        const scss = getCss({ _key_: v }).replace(
          /\._key_ {([A-Za-z0-9:\-/.'"[\]()%,;\s*+]*)}/g, // search for styles only
          '$1'
        );
        return `@mixin ${paramCase(`pds-${k.replace(/Style$/, '')}`)} {${scss}}`;
      })
      .join('\n\n');

    await writeFile(filename, content);
  }
};

(async () => {
  cleanLib();

  await generateVariables({
    border,
    font,
    theme,
    spacing,
    breakpoint,
    gridGap,
    gridFull,
    gridFullOffset,
    gridWide,
    gridWideOffset,
    gridExtended,
    gridExtendedOffset,
    gridBasic,
    gridBasicOffset,
    gridNarrow,
    gridNarrowOffset,
  });

  await generateMixins({
    heading,
    text,
    display,
    grid,
    dropShadow,
    frostedGlass,
    gradient,
  });
})();
