import * as fs from 'fs';
import * as path from 'path';

type Framework = 'react' | 'angular';

const BUNDLE_TYPE_FILE_NAME = 'bundle.d.ts';
const WRAPPER_PROJECT_PATH = 'projects/components-wrapper/src/lib';
const rootDirectory = path.resolve(__dirname, '..');

const getFilePathDest = (framework: Framework): string => {
  return path.resolve(rootDirectory, `../components-${framework}/${WRAPPER_PROJECT_PATH}/${BUNDLE_TYPE_FILE_NAME}`);
};

// We have to deliver the type file to the wrapper packages, because we do not provide the components package
const copyTypesToWrapper = (framework: Framework): void => {
  const filePath = `dist/types/${BUNDLE_TYPE_FILE_NAME}`;
  const filePathSource = path.resolve(rootDirectory, filePath);
  const filePathDest = getFilePathDest(framework);

  const fileContent = fs.readFileSync(filePathSource, 'utf8').toString();

  // remove global declaration of `const ROLLUP_REPLACE_IS_STAGING: string;`
  const result = fileContent.replace(/declare global {\n\tconst ROLLUP_REPLACE_IS_STAGING: string;\n}\n/, '');
  fs.writeFileSync(filePathDest, result);

  console.log(`Copied '${filePath}' –> 'components-${framework}/${WRAPPER_PROJECT_PATH}/${BUNDLE_TYPE_FILE_NAME}'`);
};

// To ensure the from stencil generated wrapper use the right imports, we have to rename them.
const updateGeneratedWrapper = (framework: Framework): void => {
  console.log(`Updating generated wrapper in "components-${framework}"`);
  copyTypesToWrapper(framework);

  let targetFileName = '';
  if (framework === 'angular') {
    targetFileName = 'proxies.ts';
  } else if (framework === 'react') {
    targetFileName = 'components-provider.ts';
  }

  const filePath = path.normalize(`../components-${framework}/projects/components-wrapper/src/lib/${targetFileName}`);
  const fileContent = fs.readFileSync(filePath, 'utf8').toString();

  // replace imports from '@porsche-design-system/components' with './bundle';
  const replaceValue = `'./${BUNDLE_TYPE_FILE_NAME.substr(0, BUNDLE_TYPE_FILE_NAME.indexOf('.'))}'`;
  const result = fileContent.replace(/'@porsche-design-system\/components'/g, replaceValue);

  fs.writeFileSync(filePath, result);

  console.log(`Updated import of "${targetFileName}": '@porsche-design-system/components' –> ${replaceValue}`);

  // React uses the alias JSX for LocalJSX, so we have to provide it
  if (framework === 'react') {
    const filePathDest = getFilePathDest(framework);
    const fileContent = fs.readFileSync(filePathDest, 'utf8').toString();
    const replaceContent = fileContent.replace('export {};', 'export { LocalJSX as JSX };');
    const appendContent = '/// <reference types="react" /> \n\n' + replaceContent;

    fs.writeFileSync(filePathDest, appendContent);
    console.log(`Updated export alias of "components-react"`);
  }
};

updateGeneratedWrapper('angular');
updateGeneratedWrapper('react');
