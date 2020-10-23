// dts-bundler doesnt bundle the import of HTMLStencilElement. We have to export it beforehand to ensure it gets included in the bundle.d.ts file
import * as path from 'path';
import * as fs from 'fs';

const addMissingHTMLStencilElementExport = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const addedContent = "export { HTMLStencilElement } from './stencil-public-runtime';";
  const filePath = path.resolve(rootDirectory, `dist/types/components.d.ts`);
  const fileContent = fs.readFileSync(filePath).toString();

  if (!fileContent.includes(addedContent)) {
    fs.writeFileSync(filePath, fileContent + addedContent);
    console.log('Added export ' + addedContent);
  }
};

addMissingHTMLStencilElementExport();
