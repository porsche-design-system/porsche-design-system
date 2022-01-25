import * as fs from 'fs';
import * as path from 'path';
import { pascalCase } from 'change-case';
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
  const comment = '/* Auto Generated File */';

  Object.entries(htmlFileContentMap)
    .filter((_, i) => i === 1)
    .forEach(([fileName, fileContent]) => {
      fileContent = fileContent.trim();

      // extract and replace style if there is any
      const styleRegEx = /<style.*>((?:.|\s)*?)<\/style>\s*/;
      let [, style] = fileContent.match(styleRegEx) || [];
      fileContent = fileContent.replace(styleRegEx, '');

      // extract and replace script if there is any
      const scriptRegEx = /<script.*>((?:.|\s)*?)<\/script>\s*/;
      let [, script] = fileContent.match(scriptRegEx) || [];
      fileContent = fileContent.replace(scriptRegEx, '');
      // TODO: transform script content

      fileContent = fileContent.trim();

      if (frameWorkType === 'angular') {
        style = style.trim().replace(/(\n)/g, '$1    ');
        const styles = style ? `\n  styles: [\n    \`\n      ${style}\n    \`,\n  ],` : '';

        fileContent = `${comment}
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-${fileName}',${styles}
  template: \`
    ${fileContent.replace(/(\n)/g, '$1    ')}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${pascalCase(fileName)}Component {}`;

        fileName = `${fileName}.component.ts`;
        fileName = path.resolve(rootDirectory, '../components-angular/src/app/pages', fileName);
      } else if (frameWorkType === 'react') {
        style = style.trim().replace(/(\n)/g, '$1  ');
        const styleConst = style ? `\n  const style = \`\n    ${style}\n  \`;\n` : '';
        const styleJsx = style ? '\n      <style children={style} />\n' : '';

        fileContent = `${comment}
import { P${pascalCase(fileName)} } from '@porsche-design-system/components-react';

export const ${pascalCase(fileName)}Page = (): JSX.Element => {${styleConst}
  return (
    <>${styleJsx}
      ${fileContent.replace(/(\n)/g, '$1      ')}
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
