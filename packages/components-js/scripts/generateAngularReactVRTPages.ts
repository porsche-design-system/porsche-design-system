import * as fs from 'fs';
import * as path from 'path';
import { paramCase, pascalCase } from 'change-case';
import * as globby from 'globby';
const rootDirectory = path.resolve(__dirname, '..');

const generateAngularReactVRTPages = (): void => {
  const pagesDirectory = path.resolve(rootDirectory, './src/pages');
  const htmlFiles = globby.sync(`${pagesDirectory}/**/*.html`);

  const htmlFileContentMap: { [key: string]: string } = htmlFiles
    .map((filePath) => [path.basename(filePath).split('.')[0], fs.readFileSync(filePath, 'utf8')])
    .reduce((result, [key, content]) => ({ ...result, [key]: content }), {});
  generateVRTPages(htmlFileContentMap, 'angular');
  generateVRTPages(htmlFileContentMap, 'react');
};
const generateVRTPages = (htmlFileContentMap: { [key: string]: string }, frameWorkType: 'angular' | 'react'): void => {
  Object.entries(htmlFileContentMap)
    .filter((_, i) => i === 0)
    .forEach(([fileName, fileContent]) => {
      if (frameWorkType === 'angular') {
        fileContent = `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-${fileName}',
  template: \`${fileContent}\`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${pascalCase(fileName)}Component {}`;
        fileName = `${fileName}.component.ts`;
        fileName = path.resolve(rootDirectory, '../components-angular/src/app/pages', fileName);
      } else if (frameWorkType === 'react') {
        fileContent = `import { P${pascalCase(fileName)} } from '@porsche-design-system/components-react';

export const ${pascalCase(fileName)}Page = (): JSX.Element => {
  return (
    <>
      ${fileContent}
    </>
  );
};`;
        fileName = `${pascalCase(fileName)}.tsx`;
        fileName = path.resolve(rootDirectory, '../components-react/src/pages', fileName);
      }
      fs.writeFileSync(fileName, fileContent);
      console.log(`Generated ${fileName}`);
    });
};

generateAngularReactVRTPages();
