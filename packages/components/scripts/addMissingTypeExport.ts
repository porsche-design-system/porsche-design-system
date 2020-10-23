// dts-bundler doesnt bundle the import of HTMLStencilElement. We have to export it beforehand to ensure it gets included in the bundle.d.ts file
import * as path from 'path';
import * as fs from 'fs';

const addMissingHTMLStencilElementExport = () => {
  const rootDirectory = path.resolve(__dirname, '..');
  const appendData = "export { HTMLStencilElement } from './stencil-public-runtime';";
  const filePath = path.resolve(rootDirectory, `dist/types/components.d.ts`);
  const fileContent = fs.readFileSync(filePath).toString();

  if (!fileContent.includes(appendData)) {
    fs.writeFileSync(filePath, fileContent + appendData);
    console.log('Added export ' + appendData + '\n\n');
  }
};

addMissingHTMLStencilElementExport();
