import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import * as font from '../src/jss/font';
import * as theme from '../src/jss/theme';
import * as spacing from '../src/jss/spacing';
import * as colorExternal from '../src/jss/colorExternal';
import * as heading from '../src/jss/typography/heading';
import * as text from '../src/jss/typography/text';
import * as breakpoint from '../src/jss/breakpoint';
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

const writeFile = (filename: string, content: string): void => {
  const targetPath = path.normalize(`${targetDirectory}/_${paramCase(filename)}.scss`);
  const contentFormatted = prettier.format(content, { parser: 'scss', printWidth: 120 });
  fs.writeFileSync(targetPath, contentFormatted);
  console.log(`Auto generated SCSS file: ${targetPath}`);
};

interface Variables {
  [k: string]: {} | Variables;
}
const generateVariables = (variables: Variables): void => {
  for (const [filename, map] of Object.entries(variables)) {
    const mapFlattened = flattenObject(map);
    const content = Object.entries(mapFlattened)
      .map(([k, v]) => `$pds-${paramCase(k)}: ${v};`)
      .join('\n');

    writeFile(filename, content);
  }
};

interface Mixins {
  [k: string]: {} | Mixins;
}
const generateMixins = (mixins: Mixins): void => {
  for (const [filename, map] of Object.entries(mixins)) {
    const content = Object.entries(map)
      .map(
        ([k, v]) =>
          `@mixin ${paramCase(`pds-${k}`)} {${getCss({ _key_: v }).replace(
            /\._key_ {([A-Za-z0-9:\-\/.'"\[\]()%,;\s]*)}/g, // search for styles only
            '$1'
          )}}`
      )
      .join('\n\n');

    writeFile(filename, content);
  }
};

cleanLib();
generateVariables({ font, theme, spacing, colorExternal, breakpoint });
generateMixins({ heading, text });
