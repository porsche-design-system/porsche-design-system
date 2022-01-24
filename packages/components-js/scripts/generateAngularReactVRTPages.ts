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
        fileName = `${fileName}.component.ts`;
        fileName = path.resolve(rootDirectory, '../components-angular/src/app/pages', fileName);

        fileContent = `<div class="playground light" title="should render accordion on light background">
                <p-accordion [heading]="'Some heading'">
                  {{ content }}
                </p-accordion>
            </div>`;
      } else if (frameWorkType === 'react') {
        fileName = `${pascalCase(fileName)}.tsx`;

        fileName = path.resolve(rootDirectory, '../components-react/src/pages', fileName);
        fileContent = `
           <div className="playground light" title="should render accordion on light background">
              <PAccordion heading="Some heading">{content}</PAccordion>
            </div>

            <div className="playground dark" title="should render accordion on dark background">
              <PAccordion heading="Some heading" theme="dark">
                {content}
              </PAccordion>
            </div>`;
      }
      fs.writeFileSync(fileName, fileContent);
      console.log(`Generated ${fileName}`);
    });
};

generateAngularReactVRTPages();
