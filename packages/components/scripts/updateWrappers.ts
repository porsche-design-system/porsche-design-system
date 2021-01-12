import * as fs from 'fs';
import * as path from 'path';

type Framework = 'react' | 'angular';

const BUNDLE_TYPE_FILE_NAME = 'bundle.d.ts';
const WRAPPER_PROJECT_PATH = 'projects/components-wrapper/src/lib';
const rootDirectory = path.resolve(__dirname, '..');

const getBundleFilePathForFramework = (framework: Framework): string => {
  return path.resolve(rootDirectory, `../components-${framework}/${WRAPPER_PROJECT_PATH}/${BUNDLE_TYPE_FILE_NAME}`);
};

// We have to deliver the type file to the wrapper packages, because we do not provide the components package
const copyTypesToWrapper = (framework: Framework): void => {
  const filePath = `dist/types/${BUNDLE_TYPE_FILE_NAME}`;
  const filePathSource = path.resolve(rootDirectory, filePath);
  const filePathDest = getBundleFilePathForFramework(framework);

  const fileContent = fs.readFileSync(filePathSource, 'utf8');

  // remove global declaration of `const ROLLUP_REPLACE_IS_STAGING: string;`
  let result = fileContent.replace(/declare global {\n\tconst ROLLUP_REPLACE_IS_STAGING: string;\n}\n/, '');

  // bring back JSX export
  result = result.replace('export {};', 'export { LocalJSX as JSX };');

  fs.writeFileSync(filePathDest, result);

  console.log(`Copied '${filePath}' –> 'components-${framework}/${WRAPPER_PROJECT_PATH}/${BUNDLE_TYPE_FILE_NAME}'`);
};

// To ensure the from stencil generated wrapper use the right imports, we have to rename them.
const updateGeneratedWrapper = (framework: Framework): void => {
  console.log(`Updating generated wrapper in "components-${framework}"`);
  copyTypesToWrapper(framework);

  if (framework === 'react') {
    const bundleFilePath = getBundleFilePathForFramework(framework);
    const bundleFileContent = fs.readFileSync(bundleFilePath, 'utf8');

    // add missing reference for react types in bundle.d.ts
    const newContent = `/// <reference types='react' />\n\n${bundleFileContent}`;

    fs.writeFileSync(bundleFilePath, newContent);
    console.log(`Added react types to "components-react"`);
  } else if (framework === 'angular') {
    const wrapperFileName = 'proxies.ts';

    const wrapperFilePath = path.normalize(`../components-${framework}/${WRAPPER_PROJECT_PATH}/${wrapperFileName}`);
    const wrapperFileContent = fs.readFileSync(wrapperFilePath, 'utf8');

    // replace imports from '@porsche-design-system/components' with './bundle';
    const replaceValue = `'./${BUNDLE_TYPE_FILE_NAME.substr(0, BUNDLE_TYPE_FILE_NAME.indexOf('.'))}'`;
    let result = wrapperFileContent.replace(/'@porsche-design-system\/components'/g, replaceValue);

    // rewire and replace imports from non public @porsche-design-system/components in generated wrapper

    const componentsPkgBase = path.resolve(require.resolve('@porsche-design-system/components'), '..');
    const importMatches = result.match(/(.*?@porsche-design-system\/components.*)/g) ?? []; // detect imports from components
    const missingBundleImports = ['EventEmitter']; // array for missing imports that will be added in the end

    importMatches.forEach((match) => {
      const importPath = match.substr(
        match.indexOf('/dist/') + 6,
        match.indexOf(';') - 1 - match.indexOf('/dist/') - 6
      );
      const importFilePath = path.resolve(componentsPkgBase, `${importPath}.d.ts`); // build absolute path to imported file from components
      const importFileContent = fs.readFileSync(importFilePath, 'utf8'); // read imported file
      const importedEvents = importFileContent.match(/(.*?EventEmitter<(.|\s)*?>)/g) ?? []; // extract generics of EventEmitter<GENERIC>

      // extract imported interface from something like: import { Button as IButton } from '...'
      const importedInterface = match.substr(match.indexOf('as') + 3, match.indexOf('}') - 1 - match.indexOf('as') - 3);
      console.log(`Replacing import of: ${importedInterface}`);
      result = result.replace(match, ''); // get rid of old import

      importedEvents.forEach((event) => {
        // extract event name and value of EventEmitter generic
        const [, eventName, eventValue] = event.trim().match(/^(\w+).*EventEmitter((?:.|\s)*)/) ?? [];
        result = result.replace(`${importedInterface}['${eventName}']`, `EventEmitter${eventValue}`); // inline event value

        // extract non primitive types which we need to import
        const regex = /\W([A-Z]\w+)/g;
        let typeMatch = regex.exec(eventValue);
        while (typeMatch !== null) {
          const [, nonPrimitiveType] = typeMatch;
          console.log(`Found non primitive type: ${nonPrimitiveType}`);
          missingBundleImports.push(nonPrimitiveType); // save non primitive type to array

          typeMatch = regex.exec(eventValue); // loop again in case of multiple matches
        }
      });
    });

    // get rid of duplicates
    const uniqueMissingImports = missingBundleImports.filter((x, i, a) => a.indexOf(x) === i);

    if (uniqueMissingImports.length) {
      console.log('Adding missing imports:', uniqueMissingImports.join(', '));
      const searchString = `import { Components } from './bundle';`;
      const replaceString = searchString.replace(' }', `, ${uniqueMissingImports.join(', ')} }`);
      result = result.replace(searchString, replaceString);
    }

    fs.writeFileSync(wrapperFilePath, result);
    console.log(`Updated import of "${wrapperFileName}": '@porsche-design-system/components' –> ${replaceValue}`);
  }
};

updateGeneratedWrapper('angular');
updateGeneratedWrapper('react');
