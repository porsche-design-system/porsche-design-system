import * as fs from 'fs';
import * as path from 'path';
import { capitalCase, paramCase, pascalCase } from 'change-case';
import * as globby from 'globby';
import { convertToAngular } from '@porsche-design-system/storefront/src/utils/convertToAngular';
import { convertToReact } from '@porsche-design-system/storefront/src/utils/convertToReact';

const PAGES_TO_SKIP: string[] = ['table'];

type Framework = 'angular' | 'react';

const rootDirectory = path.resolve(__dirname, '..');
const angularPagesDirectory = path.resolve(rootDirectory, '../components-angular/src/app/pages');
const reactPagesDirectory = path.resolve(rootDirectory, '../components-react/src/pages');

const generateAngularReactVRTPages = (): void => {
  const pagesDirectory = path.resolve(rootDirectory, './src/pages');
  const htmlFiles = globby.sync(`${pagesDirectory}/**/*.html`);

  const htmlFileContentMap: { [key: string]: string } = htmlFiles
    .filter((file) => !PAGES_TO_SKIP.map((page) => `${page}.html`).some((page) => file.endsWith(page)))
    .map((filePath) => [path.parse(filePath).name, fs.readFileSync(filePath, 'utf8')])
    .reduce((result, [key, content]) => ({ ...result, [key]: content }), {});

  generateVRTPages(htmlFileContentMap, 'angular');
  generateVRTPages(htmlFileContentMap, 'react');
};

const byAlphabet = (a: string, b: string): number => a.toLowerCase().localeCompare(b.toLowerCase());

const writeFile = (filePath: string, content: string): void => {
  fs.writeFileSync(filePath, content);
  console.log(`Generated ${filePath.replace(path.resolve(rootDirectory, '..'), '')}`);
};

const getRoutes = (importPaths: string[], framework: Framework): string => {
  const componentSuffix = framework === 'angular' ? '' : 'Page';

  return (
    importPaths
      .map((importPath) =>
        [
          '{',
          ...[
            `name: '${capitalCase(importPath)}'`,
            `component: fromPages.${pascalCase(importPath)}${componentSuffix}`,
            `path: '/${paramCase(importPath)}'`,
          ].map((x) => `  ${x},`),
          '}',
        ]
          .map((x) => `    ${x}`)
          .join('\n')
      )
      .join(',\n') + ','
  );
};

const generateVRTPages = (htmlFileContentMap: { [key: string]: string }, framework: Framework): void => {
  const comment = '/* Auto Generated File */';
  const pagesDirectory = framework === 'angular' ? angularPagesDirectory : reactPagesDirectory;

  const importPaths = Object.entries(htmlFileContentMap)
    // .filter(([component]) => component === 'icon') // for easy debugging
    .map(([fileName, fileContent]) => {
      fileContent = fileContent.trim();

      // extract and replace style if there is any
      const styleRegEx = /\s*<style.*>((?:.|\s)*?)<\/style>\s*/;
      let [, style] = fileContent.match(styleRegEx) || [];
      fileContent = fileContent.replace(styleRegEx, '\n');

      // extract and replace script if there is any
      const scriptRegEx = /\s*<script.*>((?:.|\s)*?)<\/script>\s*/;
      let [, script] = fileContent.match(scriptRegEx) || [];
      fileContent = fileContent.replace(scriptRegEx, '\n');
      script = script?.trim().replace(/([\w.#'()\[\]]+)(\.\w+\s=)/g, '($1 as any)$2'); // handle untyped prop assignments

      const usesComponentsReady = script?.includes('componentsReady()');
      const usesQuerySelector = script?.includes('querySelector');
      const usesPrefixing = !!fileContent.match(/<[a-z-]+-p-[\w-]+/);
      const usesToast = script?.includes('p-toast');
      const [, toastText] = script?.match(/text:\s?(['`].*?['`])/) || [];

      const isOverviewPage = fileName === 'overview';
      const isIconPage = fileName === 'icon';
      const iconsRegEx = /(<div class="playground[\sa-z]+overview".*?>)\n(<\/div>)/;

      // extract template if there is any, replacing is framework specific
      const templateRegEx = /( *<template.*>(?:.|\s)*?<\/template>)/;
      let [, template] = fileContent.match(templateRegEx) || [];

      fileContent = fileContent.trim();

      if (framework === 'angular') {
        // imports
        const angularImports = [
          'ChangeDetectionStrategy',
          'Component',
          script && !isIconPage && 'OnInit',
          usesComponentsReady && 'ChangeDetectorRef',
        ]
          .filter((x) => x)
          .sort(byAlphabet)
          .join(', ');

        const pdsImports = [
          usesComponentsReady && 'componentsReady',
          usesToast && 'ToastManager',
          isIconPage && 'IconName',
        ]
          .filter((x) => x)
          .sort(byAlphabet)
          .join(', ');

        const imports = [
          `import { ${angularImports} } from '@angular/core';`,
          pdsImports && `import { ${pdsImports} } from '@porsche-design-system/components-angular';`,
          isIconPage && `import { ICON_NAMES } from '@porsche-design-system/assets';`,
        ]
          .filter((x) => x)
          .join('\n');

        // decorator
        style = style?.trim().replace(/(\n)/g, '$1    ');
        const styles = style ? `\n  styles: [\n    \`\n      ${style}\n    \`,\n  ],` : '';

        // implementation
        const classImplements = script && !isIconPage ? 'implements OnInit ' : '';
        const classImplementation = (
          usesComponentsReady
            ? `public allReady: boolean = false;

constructor(private cdr: ChangeDetectorRef) {}

ngOnInit() {
  componentsReady().then(() => {
    this.allReady = true;
    this.cdr.markForCheck();
  });
}`
            : isIconPage
            ? `public icons = ICON_NAMES as IconName[];`
            : usesToast
            ? `constructor(private toastManager: ToastManager) {}

ngOnInit() {
  this.toastManager.addMessage({ text: ${toastText} });
}`
            : usesQuerySelector
            ? `ngOnInit() {\n  ${script}\n}`
            : ''
        )
          .replace(/^(.)/, '\n$1') // leading new line if there is any content
          .replace(/(.)$/, '$1\n') // trailing new line if there is any content
          .replace(/(\n)(.)/g, '$1  $2'); // fix indentation

        // conditional template rendering
        template = template
          ?.replace(/<template/g, '<div *ngIf="allReady"') // add condition and replace opening tag
          .replace(/<\/template>/g, '</div>'); // replace closing tag
        fileContent = fileContent.replace(templateRegEx, template);

        // prefixing
        fileContent = fileContent.replace(/(<[\w-]+(p-[\w-]+))/g, '$1 $2');

        // icons
        if (isIconPage) {
          fileContent = fileContent.replace(
            iconsRegEx,
            `$1
  <p-icon
    *ngFor="let icon of icons"
    [name]="icon"
    [size]="'inherit'"
    [color]="'inherit'"
    [attr.aria-label]="icon + ' icon'"
  ></p-icon>
$2`
          );
        }

        fileContent = `${comment}
${imports}

@Component({
  selector: 'page-${fileName}',${styles}
  template: \`
    ${convertToAngular(
      fileContent
        .replace(/(\n)([ <>]+)/g, '$1    $2')
        .replace(/(<p-[a-z]+ .+?>)(\`)(<\/p-[a-z]+>)/g, '$1\\`$3')
        .replace(/(<p-[a-z]+ .+?>)(\\)(<\/p-[a-z]+>)/g, '$1\\\\$3')
    )}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${pascalCase(fileName)}Component ${classImplements}{${classImplementation}}
`;

        fileName = `${fileName}.component.ts`;
      } else if (framework === 'react') {
        // imports
        const reactImports = [
          (usesComponentsReady || usesQuerySelector) && !isIconPage && 'useEffect',
          usesComponentsReady && 'useState',
        ]
          .filter((x) => x)
          .sort(byAlphabet)
          .join(', ');
        const componentImports = Array.from(fileContent.matchAll(/<(?:[a-z-]*)(p-[\w-]+)/g))
          .map(([, tagName]) => tagName)
          .filter((tagName, index, arr) => arr.findIndex((t) => t === tagName) === index)
          .map((tagName) => pascalCase(tagName));
        const pdsImports = [
          ...componentImports,
          usesComponentsReady && 'componentsReady',
          usesPrefixing && 'PorscheDesignSystemProvider',
          usesToast && 'useToastManager',
        ]
          .filter((x) => x)
          .sort(byAlphabet)
          .join(', ');
        const imports = [
          `import { ${pdsImports} } from '@porsche-design-system/components-react';`,
          reactImports && `import { ${reactImports} } from 'react';`,
          isIconPage && `import { ICON_NAMES } from '@porsche-design-system/assets';`,
        ]
          .filter((x) => x)
          .join('\n');

        // implementation
        style = style?.trim();
        const styleConst = style ? `const style = \`\n  ${style}\n\`;` : '';
        const styleJsx = style ? '\n      <style children={style} />\n' : '';

        const useStateOrEffect = usesComponentsReady
          ? `const [allReady, setAllReady] = useState(false);
useEffect(() => {
  componentsReady().then(() => {
    setAllReady(true);
  });
}, []);`
          : isIconPage
          ? ''
          : usesToast
          ? `const { addMessage } = useToastManager();
useEffect(() => {
  addMessage({ text: ${toastText} });
}, [addMessage]);
`
          : usesQuerySelector
          ? `useEffect(() => {
  ${script}
}, []);`
          : '';

        const componentLogic = [useStateOrEffect, styleConst]
          .filter((x) => x)
          .join('\n\n')
          .replace(/^(.)/, '\n$1') // leading new line if there is any content
          .replace(/(.)$/, '$1\n') // trailing new line if there is any content
          .replace(/(\n)(.)/g, '$1  $2'); // fix indentation

        // conditional template rendering
        template = template
          ?.replace(/( *)<template/g, '$1{allReady && (\n$1<div') // add condition and replace opening tag
          .replace(/( *)<\/template>/g, '$1</div>\n$1)}') // replace closing tag
          .replace(/(\n)( +<)/g, '$1  $2'); // fix indentation
        fileContent = fileContent.replace(templateRegEx, template);

        // prefixing
        const [, prefix] = fileContent.match(/<([\w-]+)-p-[\w-]+/) || [];
        if (usesPrefixing) {
          fileContent = fileContent.replace(new RegExp(`(<\/?)${prefix}-`, 'g'), '$1');
        }

        // icons
        if (isIconPage) {
          fileContent = fileContent.replace(
            iconsRegEx,
            `$1
  {ICON_NAMES.map((x) => (
    <PIcon key={x} name={x as any} size="inherit" color="inherit" aria-label={\`\${x} icon\`} />
  ))}
$2`
          );
        }

        // attribute conversion
        fileContent = fileContent
          .replace(/(<textarea.*)>\s*(.+?)\s*(<\/textarea>)/g, '$1 defaultValue="$2">$3')
          .replace(/(<input(?:.|\n)*?) v(alue=)/g, '$1 defaultV$2') // for input
          .replace(/(<input(?:.|\n)*?) c(hecked)/g, '$1 defaultC$2'); // for checkbox + radio

        fileContent = fileContent.replace(/(<em>emphasized<\/em>)/g, "{' '}$1"); // for forced whitespace

        if (isOverviewPage) {
          // wrap right column with PorscheDesignSystemProvider
          let i = 0;
          fileContent = fileContent.replace(/\n  <div style="flex: 1">(?:.|\s)*?\n  <\/div>/g, (match) => {
            if (i === 1) {
              match = match
                .replace(
                  match,
                  `\n<PorscheDesignSystemProvider prefix="${prefix}">${match}\n</PorscheDesignSystemProvider>`
                )
                .replace(/(\n)(.)/g, '$1  $2'); // fix indentation
            }
            i++;
            return match;
          });
        }

        const fragmentTag = usesPrefixing && !isOverviewPage ? 'PorscheDesignSystemProvider' : '';

        fileContent = `${comment}
${imports}

export const ${pascalCase(fileName)}Page = (): JSX.Element => {${componentLogic}
  return (
    <${fragmentTag}>${styleJsx}
      ${convertToReact(fileContent.replace(/(\n)([ <>]+)/g, '$1      $2'))}
    </${fragmentTag}>
  );
};
`;

        fileName = `${pascalCase(fileName)}.tsx`;
      }

      writeFile(path.resolve(pagesDirectory, fileName), fileContent);

      return './' + path.parse(fileName).name;
    })
    .sort(byAlphabet);

  // TODO: what about barrel file?
  // TODO: what about routing?
  const routes = getRoutes(importPaths, framework);

  if (framework === 'angular') {
  } else if (framework === 'react') {
    const separator = '/* Auto Generated Below */';
    const imports = [separator, ...importPaths.map((x) => `export * from '${x}';`)].join('\n');

    const barreFilePath = path.resolve(pagesDirectory, 'index.ts');
    const barrelFileContent = fs.readFileSync(barreFilePath, 'utf8');
    const newBarrelFileContent = [barrelFileContent.split(separator)[0].trim(), imports].join('\n\n') + '\n';

    writeFile(barreFilePath, newBarrelFileContent);

    const routesFilePath = path.resolve(pagesDirectory, '../routes.ts');
    const routesFileContent = fs.readFileSync(routesFilePath, 'utf8');
    const newRoutesFileContent = routesFileContent.replace(
      /(\/\* Auto Generated Start \*\/\n)(?:.|\s)*?(\s+\/\* Auto Generated End \*\/)/,
      `$1${routes}$2`
    );
    writeFile(routesFilePath, newRoutesFileContent);
  }
};

generateAngularReactVRTPages();
