import * as path from 'path';
import * as fs from 'fs';
import { AriaRole } from '../src/aria-types';

const prepareAriaTypes = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const reactTypesFile = path.resolve(rootDirectory, '../../node_modules/@types/react/index.d.ts');
  const reactTypes = fs.readFileSync(reactTypesFile, 'utf8');

  const [, ariaRawTypes] = /interface AriaAttributes ({[\s\S]*?})/.exec(reactTypes) || [];
  const [, ariaRoleRawTypes] = /(type AriaRole [\s\S]*?\))/.exec(reactTypes) || [];
  const ariaTypes = `export type AriaAttributes = ${ariaRawTypes
    .replace(/}/g, '  role?: AriaRole; }')
    .replace(/ {8}/g, '  ')
    .replace(/ {4}/g, '')};`;
  const ariaRoleTypes = `export ${ariaRoleRawTypes.replace(/ {8}/g, '  ')};`;
  const content = [
    '/* Auto Generated Below */',
    "type Booleanish = boolean | 'true' | 'false';",
    ariaTypes,
    ariaRoleTypes,
  ].join('\n\n');

  const fileName = 'src/aria-types.ts';
  const filePath = path.resolve(rootDirectory, fileName);

  fs.writeFileSync(filePath, content);
  console.log(`Generated aria types into '${fileName}'`);
};

prepareAriaTypes();
