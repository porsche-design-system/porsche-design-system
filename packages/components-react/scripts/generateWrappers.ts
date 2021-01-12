import * as fs from 'fs';
import * as path from 'path';

const BASE_DIRECTORY = path.normalize('./projects/components-wrapper/src/lib');
const TARGET_DIRECTORY = path.resolve(BASE_DIRECTORY, 'components');

const getComponentFileName = (component: string, withOutExtension?: boolean): string =>
  `${component.replace('p-', '')}.wrapper${withOutExtension ? '' : '.tsx'}`;

const generateComponentWrapper = (component: string, componentInterface: string): void => {
  const content = 'export {}';
  const targetFileName = getComponentFileName(component);
  const targetFile = path.resolve(TARGET_DIRECTORY, targetFileName);

  fs.writeFileSync(targetFile, content);
  console.log(`Generated wrapper: ${targetFileName}`);
};

const generateWrappers = (): void => {
  // read bundle.d.ts as the base of everything
  const bundleDtsFileName = 'bundle.d.ts';
  const bundleDtsFile = path.resolve(BASE_DIRECTORY, bundleDtsFileName);
  const bundleDtsContent = fs.readFileSync(bundleDtsFile, 'utf8');
  let [, rawIntrinsicElements] = /interface IntrinsicElements ({(?:\s|.)*?})/.exec(bundleDtsContent) ?? [];

  rawIntrinsicElements = rawIntrinsicElements.replace(/ (\w+);/g, " '$1',");
  const intrinsicElements = eval(`(${rawIntrinsicElements})`);

  console.log(`Found ${Object.keys(intrinsicElements).length} intrinsicElements in ${bundleDtsFileName}`);

  if (!fs.existsSync(TARGET_DIRECTORY)) {
    fs.mkdirSync(TARGET_DIRECTORY);
  }

  // components
  Object.entries(intrinsicElements).forEach(([component, componentInterface]) =>
    generateComponentWrapper(component, componentInterface as string)
  );

  // barrel file
  const targetFileName = 'index.ts';
  const targetFile = path.resolve(TARGET_DIRECTORY, targetFileName);
  const content = Object.keys(intrinsicElements)
    .map((item) => `export * from './${getComponentFileName(item, true)}';`)
    .join('\n');

  fs.writeFileSync(targetFile, content);
  console.log(`Generated barrel:  ${targetFileName}`);
};

generateWrappers();
