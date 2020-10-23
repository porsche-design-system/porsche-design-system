import * as fs from 'fs';
import * as path from 'path';

type Framework = 'react' | 'angular';

const BUNDLE_TYPE_FILE_NAME = 'bundle.d.ts';
const rootDirectory = path.resolve(__dirname, '..');

const getFilePathDest = (framework: Framework): string => {
  return path.resolve(
    rootDirectory,
    `../components-${framework}/projects/components-wrapper/src/lib/${BUNDLE_TYPE_FILE_NAME}`
  );
};

// We have to deliver the type file to the wrapper packages, because we do not provide the components package
const copyTypesToWrapper = (framework: Framework): void => {
  const filePathSource = path.resolve(rootDirectory, `dist/types/${BUNDLE_TYPE_FILE_NAME}`);
  const filePathDest = getFilePathDest(framework);

  fs.copyFileSync(filePathSource, filePathDest);

  console.log(`File "${filePathSource}" copied to "${filePathDest}"`);
};

// To ensure the from stencil generated wrapper use the right imports, we have to rename them.
const updateGeneratedWrapper = (framework: Framework): void => {
  console.log(`Update generated wrapper in "components-${framework}":`);
  copyTypesToWrapper(framework);

  let targetFileName: string;
  if (framework === 'angular') {
    targetFileName = 'components-wrapper.component.ts';
  } else if (framework === 'react') {
    targetFileName = 'components-provider.ts';
  }

  const filePath = path.normalize(`../components-${framework}/projects/components-wrapper/src/lib/${targetFileName}`);
  const fileContent = fs.readFileSync(filePath, 'utf8').toString();
  const replaceValue = `./${BUNDLE_TYPE_FILE_NAME.substr(0, BUNDLE_TYPE_FILE_NAME.indexOf('.'))}`;
  const result = fileContent.replace(/@porsche-design-system\/components/g, replaceValue);
  fs.writeFileSync(filePath, result);

  console.log(`Updated import of "${targetFileName}" from "@porsche-design-system/components" to "${replaceValue}"`);

  // React uses the alias JSX for LocalJSX, so we have to provide it
  if (framework === 'react') {
    const filePathDest = getFilePathDest(framework);
    const fileContent = fs.readFileSync(filePathDest, 'utf8').toString();
    const result = fileContent.replace('export {};', 'export { LocalJSX as JSX };');

    fs.writeFileSync(filePathDest, result);
    console.log(`Updated export alias for "components-react"`);
  }
};

updateGeneratedWrapper('angular');
updateGeneratedWrapper('react');
