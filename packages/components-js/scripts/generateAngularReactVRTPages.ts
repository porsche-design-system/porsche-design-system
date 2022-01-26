import * as fs from 'fs';
import * as path from 'path';
import { pascalCase } from 'change-case';
import * as globby from 'globby';
import { convertToAngular } from '@porsche-design-system/storefront/src/utils/convertToAngular';
import { convertToReact } from '@porsche-design-system/storefront/src/utils/convertToReact';

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

const generateVRTPages = (htmlFileContentMap: { [key: string]: string }, framework: 'angular' | 'react'): void => {
  const comment = '/* Auto Generated File */';

  Object.entries(htmlFileContentMap)
    .filter((_, i) => i === 2)
    .forEach(([fileName, fileContent]) => {
      fileContent = fileContent.trim();

      // extract and replace style if there is any
      const styleRegEx = /\s*<style.*>((?:.|\s)*?)<\/style>\s*/;
      let [, style] = fileContent.match(styleRegEx) || [];
      fileContent = fileContent.replace(styleRegEx, '\n');

      // extract and replace script if there is any
      const scriptRegEx = /\s*<script.*>((?:.|\s)*?)<\/script>\s*/;
      let [, script] = fileContent.match(scriptRegEx) || [];
      console.log(script);

      // TODO: transform script content

      const usesComponentsReady = !!script?.match('componentsReady()');

      // extract and replace template if there is any
      const templateRegEx = /(<template.*>(?:.|\s)*?<\/template>)/;
      let [, template] = fileContent.match(templateRegEx) || [];

      // TODO: transform template content

      fileContent = fileContent.trim();

      if (framework === 'angular') {
        style = style?.trim().replace(/(\n)/g, '$1    ');
        const styles = style ? `\n  styles: [\n    \`\n      ${style}\n    \`,\n  ],` : '';

        const angularImports = ['ChangeDetectionStrategy', 'Component', script && 'OnInit'].filter((x) => x).join(', ');
        const pdsImports = usesComponentsReady
          ? `import { componentsReady } from '@porsche-design-system/components-angular';`
          : '';
        const imports = [`import { ${angularImports} } from '@angular/core';`, pdsImports].filter((x) => x).join('\n');

        const classImplements = script ? 'implements OnInit ' : '';

        template = template?.replace(/template/g, '$1div *ngIf="allReady" ');
        template = template?.replace(/(<\/)template+(>)/g, '$1div>');
        fileContent = fileContent.replace(templateRegEx, template);
        fileContent = fileContent.replace(scriptRegEx, '\n');

        fileContent = `${comment}
${imports}

@Component({
  selector: 'page-${fileName}',${styles}
  template: \`
    ${convertToAngular(fileContent.replace(/(\n)([ <]+)/g, '$1    $2'))}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
${
  classImplements === 'implements OnInit '
    ? `export class ${pascalCase(fileName)}Component ${classImplements} {
  public allReady: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    ${script}
  }
}`
    : `export class ${pascalCase(fileName)}Component ${classImplements} {}`
}`;
        fileName = `${fileName}.component.ts`;
        fileName = path.resolve(rootDirectory, '../components-angular/src/app/pages', fileName);
      } else if (framework === 'react') {
        style = style?.trim().replace(/(\n)/g, '$1  ');
        const styleConst = style ? `\n  const style = \`\n    ${style}\n  \`;\n` : '';
        const styleJsx = style ? '\n      <style children={style} />\n' : '';

        const reactImports = '';
        const array = Array.from(fileContent.matchAll(/<(p-[\w-]+)/g))
          .map(([, tagName]) => tagName)
          .filter((tagName, index, arr) => arr.findIndex((t) => t === tagName) === index)
          .map((tagName) => pascalCase(tagName));
        const pdsImports = [...array, usesComponentsReady && 'componentsReady'].filter((x) => x).join(', ');
        const imports = [reactImports, `import { ${pdsImports} } from '@porsche-design-system/components-react';`]
          .filter((x) => x)
          .join('\n');

        fileContent = `${comment}
${imports}

export const ${pascalCase(fileName)}Page = (): JSX.Element => {${styleConst}
  return (
    <>${styleJsx}
      ${convertToReact(fileContent.replace(/(\n)([ <]+)/g, '$1      $2'))}
    </>
  );
};
`;

        fileName = `${pascalCase(fileName)}.tsx`;
        fileName = path.resolve(rootDirectory, '../components-react/src/pages', fileName);
      }

      // TODO: what about barrel file?
      // TODO: what about routing?

      fs.writeFileSync(fileName, fileContent);
      //console.log(`Generated ${fileName.replace(path.resolve(rootDirectory, '..'), '')}`);
    });
};

generateAngularReactVRTPages();
