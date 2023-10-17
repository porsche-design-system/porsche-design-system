import * as path from 'path';
import * as fs from 'fs';

const prepareAriaTypes = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const reactTypesFile = path.resolve(rootDirectory, '../../node_modules/@types/react/index.d.ts');
  const reactTypes = fs.readFileSync(reactTypesFile, 'utf8');

  const [, ariaRawTypes] = /interface AriaAttributes ({[\s\S]*?})/.exec(reactTypes) || [];
  const [, ariaRoleRawTypes] = /(type AriaRole [\s\S]*?\))/.exec(reactTypes) || [];
  const ariaTypes = `export type AriaAttributes = ${ariaRawTypes
    .replace(
      /}/g,
      '  /** All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions */\n  role?: AriaRole;\n}'
    )
    .replace(/ {8}/g, '  ')
    .replace(/ {4}/g, '')};`;
  const ariaRoleTypes = `export ${ariaRoleRawTypes.replace(/ {8}/g, '  ').replace(/\n {2,}\| \(string & \{}\)/g, '')};`;
  const content = [
    '/* Auto Generated Below */\n/* eslint-disable @typescript-eslint/quotes */',
    "type Booleanish = boolean | 'true' | 'false';",
    ariaTypes,
    ariaRoleTypes,
  ].join('\n\n');

  const fileName = 'src/types/aria-types.d.ts';
  const filePath = path.resolve(rootDirectory, fileName);

  fs.writeFileSync(filePath, content);
  console.log(`Generated aria types into '${fileName}'`);
};

prepareAriaTypes();
