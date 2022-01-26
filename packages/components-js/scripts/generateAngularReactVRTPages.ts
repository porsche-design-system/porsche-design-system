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
    .filter((_, i) => i <= 2)
    .forEach(([fileName, fileContent]) => {
      fileContent = fileContent.trim();

      // extract and replace style if there is any
      const styleRegEx = /\s*<style.*>((?:.|\s)*?)<\/style>\s*/;
      let [, style] = fileContent.match(styleRegEx) || [];
      fileContent = fileContent.replace(styleRegEx, '\n');

      // extract and replace script if there is any
      const scriptRegEx = /\s*<script.*>((?:.|\s)*?)<\/script>\s*/;
      let [, script] = fileContent.match(scriptRegEx) || [];
      fileContent = fileContent.replace(scriptRegEx, '\n');
      console.log(script);
      // TODO: transform script content

      const usesComponentsReady = !!script?.match('componentsReady()');

      // extract template if there is any, replacing is framework specific
      const templateRegEx = /(<template.*>(?:.|\s)*?<\/template>)/;
      let [, template] = fileContent.match(templateRegEx) || [];

      fileContent = fileContent.trim();

      if (framework === 'angular') {
        // imports
        const angularImports = [
          'ChangeDetectionStrategy',
          'Component',
          ...(usesComponentsReady && ['OnInit', 'ChangeDetectorRef']),
        ]
          .sort()
          .filter((x) => x)
          .join(', ');
        const pdsImports = usesComponentsReady
          ? `import { componentsReady } from '@porsche-design-system/components-angular';`
          : '';
        const imports = [`import { ${angularImports} } from '@angular/core';`, pdsImports].filter((x) => x).join('\n');

        // decorator
        style = style?.trim().replace(/(\n)/g, '$1    ');
        const styles = style ? `\n  styles: [\n    \`\n      ${style}\n    \`,\n  ],` : '';

        // implementation
        const classImplements = usesComponentsReady ? 'implements OnInit ' : '';
        const classImplementation = usesComponentsReady
          ? `
  public allReady: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    componentsReady().then(() => {
      this.allReady = true;
      this.cdr.markForCheck();
    });
  }
`
          : '';

        // conditional template rendering
        template = template
          ?.replace(/<template/g, '<div *ngIf="allReady"') // // add condition and replace opening tag
          .replace(/<\/template>/g, '</div>'); // replace closing tag
        fileContent = fileContent.replace(templateRegEx, template);

        fileContent = `${comment}
${imports}

@Component({
  selector: 'page-${fileName}',${styles}
  template: \`
    ${convertToAngular(fileContent.replace(/(\n)([ <>]+)/g, '$1    $2'))}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${pascalCase(fileName)}Component ${classImplements}{${classImplementation}}
`;

        fileName = `${fileName}.component.ts`;
        fileName = path.resolve(rootDirectory, '../components-angular/src/app/pages', fileName);
      } else if (framework === 'react') {
        // imports
        const reactImports = (usesComponentsReady ? ['useEffect', 'useState'] : []).filter((x) => x).join(', ');
        const componentImports = Array.from(fileContent.matchAll(/<(p-[\w-]+)/g))
          .map(([, tagName]) => tagName)
          .filter((tagName, index, arr) => arr.findIndex((t) => t === tagName) === index)
          .map((tagName) => pascalCase(tagName));
        const pdsImports = [...componentImports, usesComponentsReady && 'componentsReady']
          .sort()
          .filter((x) => x)
          .join(', ');
        const imports = [
          `import { ${pdsImports} } from '@porsche-design-system/components-react';`,
          reactImports && `import { ${reactImports} } from 'react';`,
        ]
          .filter((x) => x)
          .join('\n');

        // implementation
        style = style?.trim();
        const styleConst = style ? `const style = \`\n  ${style}\n\`;` : '';
        const styleJsx = style ? '\n      <style children={style} />\n' : '';

        const state = usesComponentsReady
          ? `const [allReady, setAllReady] = useState(false);
useEffect(() => {
  componentsReady().then(() => {
    setAllReady(true);
  });
}, []);`
          : '';
        const componentLogic = [styleConst, state]
          .filter((x) => x)
          .join('\n')
          .replace(/^(.)/, '\n$1') // leading new line
          .replace(/(.)$/, '$1\n') // trailing new line
          .replace(/(\n)(.)/g, '$1  $2'); // fix indentation

        // conditional template rendering
        template = template
          ?.replace(/<template/g, '{allReady && (\n  <div') // add condition and replace opening tag
          .replace(/<\/template>/g, '</div>\n)}') // replace closing tag
          .replace(/(\n)([ <)}]+)/g, '$1  $2'); // fix indentation
        fileContent = fileContent.replace(templateRegEx, template);

        fileContent = `${comment}
${imports}

export const ${pascalCase(fileName)}Page = (): JSX.Element => {${componentLogic}
  return (
    <>${styleJsx}
      ${convertToReact(fileContent.replace(/(\n)([ <>]+)/g, '$1      $2'))}
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
      console.log(`Generated ${fileName.replace(path.resolve(rootDirectory, '..'), '')}`);
    });
};

generateAngularReactVRTPages();
