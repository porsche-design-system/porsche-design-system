import { font } from '@porsche-design-system/utilities-v2';
import * as path from 'path';
import * as fs from 'fs';

const buildStaticLineHeightMap = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');

  const fileName = 'src/utils/line-height.ts';
  const filePath = path.resolve(rootDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const lineHeightMap = Object.entries(font.size)
    .map<[number, number]>(([key, val]) => [parseInt(key, 10), val.lineHeight as number])
    .filter(([key]) => !isNaN(key as any));

  const staticValues = `// prettier-ignore
const STATIC_VALUES: [number, number][] = ${JSON.stringify(lineHeightMap)};`;

  const newFileContent = fileContent.replace(
    /(\/\* Auto Generated Start \*\/\s)(?:.|\s)*?(\s\/\* Auto Generated End \*\/)/,
    `$1${staticValues}$2`
  );

  fs.writeFileSync(filePath, newFileContent);
  console.log(`Injected static lineHeightMap values into '${fileName}'`);
};

buildStaticLineHeightMap();
