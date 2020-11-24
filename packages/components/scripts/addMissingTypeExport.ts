import * as path from 'path';
import * as fs from 'fs';

// dts-bundler doesnt bundle the import of HTMLStencilElement and EventEmitter.
// We have to export them beforehand to ensure it gets included in the bundle.d.ts file
const addMissingHTMLStencilElementExport = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const missingExport = `export { HTMLStencilElement, EventEmitter } from './stencil-public-runtime';`;
  const fileName = 'dist/types/components.d.ts';
  const filePath = path.resolve(rootDirectory, fileName);
  const fileContent = fs.readFileSync(filePath).toString();

  if (!fileContent.includes(missingExport)) {
    fs.writeFileSync(filePath, `${fileContent}${missingExport}`);
    console.log(`Added to "${fileName}": ${missingExport}`);
  }
};

addMissingHTMLStencilElementExport();
