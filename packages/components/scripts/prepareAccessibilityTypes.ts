import * as path from 'path';
import * as fs from 'fs';

const prepareAccessibilityTypes = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const reactTypesFile = path.resolve(rootDirectory, '../../node_modules/@types/react/index.d.ts');
  const reactTypes = fs.readFileSync(reactTypesFile, 'utf-8');

  const [, ariaRawTypes] = /interface AriaAttributes ({(?:.|\s)*?})/.exec(reactTypes) ?? [];
  const ariaTypes = `export type AriaAttributes = ${ariaRawTypes.replace(/ {8}/g, '  ').replace(/ {4}/g, '')};`;
  const content = ['/* Auto Generated Below */', "type Booleanish = boolean | 'true' | 'false';", ariaTypes].join(
    '\n\n'
  );

  const fileName = 'src/accessibility-types.ts';
  const filePath = path.resolve(rootDirectory, fileName);

  fs.writeFileSync(filePath, content);
  console.log(`Generated accessibility types into '${fileName}'`);
};

prepareAccessibilityTypes();
