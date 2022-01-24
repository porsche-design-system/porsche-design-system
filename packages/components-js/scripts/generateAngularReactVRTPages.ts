import * as fs from 'fs';
import * as path from 'path';
import { paramCase } from 'change-case';
import * as globby from 'globby';

const generateAngularReactVRTPages = (): void => {
  const rootDirectory = path.resolve(__dirname, '..');
  const pagesDirectory = path.resolve(rootDirectory, './src/pages');
  const htmlFiles = globby.sync(`${pagesDirectory}/**/*.html`);

  const htmlFileContentMap: { [key: string]: string } = htmlFiles
    .map((filePath) => [path.basename(filePath).split('.')[0], fs.readFileSync(filePath, 'utf8')])
    .reduce((result, [key, content]) => ({ ...result, [key]: content }), {});

  Object.entries(htmlFileContentMap)
    .filter((_, i) => i === 0)
    .forEach(([fileName, fileContent]) => {
      console.log(fileName);
      console.log(fileContent);
    });

  const content = ``;

  // const targetDirectory = path.normalize('./projects/components-wrapper/lib');
  // fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  // const targetFileName = 'chunksManifest.ts';
  // const targetFile = path.resolve(targetDirectory, targetFileName);
  // fs.writeFileSync(targetFile, content);
  //
  // console.log(`Generated ${targetFileName} for ${Object.keys(manifest).length} chunks`);
};

generateAngularReactVRTPages();
