import * as path from 'path';
import * as fs from 'fs';

// dts-bundler doesnt bundle the import of HTMLStencilElement and EventEmitter.
// We have to export them beforehand to ensure it gets included in the bundle.d.ts file
const addMissingHTMLStencilElementExport = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const missingExport = `export { HTMLStencilElement, EventEmitter } from './stencil-public-runtime';`;
  const fileName = 'dist/types/components.d.ts';
  const filePath = path.resolve(rootDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // Stencil 5 imports its own types from '@stencil/core/runtime' here, which would leave the bundle with an import of
  // a package our consumers don't have. The types are part of the generated './stencil-public-runtime' as well.
  let newFileContent = fileContent.replace(/from ["']@stencil\/core\/runtime["']/g, "from './stencil-public-runtime'");

  if (newFileContent.includes('@stencil/core/runtime')) {
    throw new Error(`Failed replacing the import of '@stencil/core/runtime' in '${fileName}'.`);
  }

  if (!newFileContent.includes(missingExport)) {
    newFileContent += missingExport;
    console.log(`Added to '${fileName}': ${missingExport}`);
  }

  if (newFileContent !== fileContent) {
    fs.writeFileSync(filePath, newFileContent);
  }
};

addMissingHTMLStencilElementExport();
