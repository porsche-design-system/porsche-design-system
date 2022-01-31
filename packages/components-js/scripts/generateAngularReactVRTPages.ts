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
    // TODO: filter blacklisted files that make no sense to vrt test?
    .map((filePath) => [path.basename(filePath).split('.')[0], fs.readFileSync(filePath, 'utf8')])
    .reduce((result, [key, content]) => ({ ...result, [key]: content }), {});

  generateVRTPages(htmlFileContentMap, 'angular');
  generateVRTPages(htmlFileContentMap, 'react');
};

const sortFunc = (a: string, b: string): number => a.toLowerCase().localeCompare(b.toLowerCase());

const generateVRTPages = (htmlFileContentMap: { [key: string]: string }, framework: 'angular' | 'react'): void => {
  const comment = '/* Auto Generated File */\n// @ts-nocheck';

  Object.entries(htmlFileContentMap)
    .filter((_, i) => i < 44) // for easy debugging
    // TODO: icon, flex, overview, table
    // .filter(([component]) => component === 'overview') // for easy debugging
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
      script = script?.trim();
      // TODO: transform script content
      console.log(script);

      const usesComponentsReady = script?.includes('componentsReady()');
      const usesIconNames = script?.includes('ICON_NAMES');
      const usesQuerySelector = script?.includes('querySelector');
      const usesPrefixing = fileContent.match(/<[a-z-]+-p-[\w-]+/);
      const usesToast = script?.includes('p-toast');
      const [, toastText] = script?.match(/text:\s?(['`].*?['`])/) || [];
      console.log('usesPrefixing', usesPrefixing);

      script = script?.includes('ICON_NAMES')
        ? `fetch('assets/assets.js')
    .then((res) => res.text())
    .then((content) => {
      const [, str] = /const ICON_NAMES = (.*);/.exec(content);
      const ICON_NAMES = eval(str);
    })`
        : script;

      //icon--- extract icons holder if there is any, replacing is frameworr specific
      const iconsRegEx = /(<div class="[^"]*?overview[^"]*?" [^]*?>)/;
      let [, iconsHolder] = fileContent.match(iconsRegEx) || [];

      // extract template if there is any, replacing is framework specific
      const templateRegEx = /(<template.*>(?:.|\s)*?<\/template>)/;
      let [, template] = fileContent.match(templateRegEx) || [];

      const textareaRegEx = /<textarea>(.*?)<\/textarea>/g;
      let [, textarea] = fileContent.match(textareaRegEx) || [];

      fileContent = fileContent.trim();

      if (framework === 'angular') {
        // imports
        const angularImports = [
          'ChangeDetectionStrategy',
          'Component',
          script && 'OnInit',
          usesComponentsReady && 'ChangeDetectorRef',
        ]
          .filter((x) => x)
          .sort(sortFunc)
          .join(', ');

        const pdsImports = [
          usesComponentsReady && 'componentsReady',
          usesIconNames && 'IconName',
          usesToast && 'ToastManager',
        ]
          .filter((x) => x)
          .sort(sortFunc)
          .join(', ');

        const pdsAssetsImports = usesIconNames ? `import { ICON_NAMES } from '@porsche-design-system/assets';` : '';

        const imports = [
          `import { ${angularImports} } from '@angular/core';`,
          pdsImports && `import { ${pdsImports} } from '@porsche-design-system/components-angular';`,
          pdsAssetsImports,
        ]
          .filter((x) => x)
          .join('\n');

        // decorator
        style = style?.trim().replace(/(\n)/g, '$1    ');
        const styles = style ? `\n  styles: [\n    \`\n      ${style}\n    \`,\n  ],` : '';

        // implementation
        const classImplements = script ? 'implements OnInit ' : '';
        const classImplementation = (
          usesComponentsReady
            ? `public allReady: boolean = false;

constructor(private cdr: ChangeDetectorRef) {}

ngOnInit() {
  componentsReady().then(() => {
    this.allReady = true;
    this.cdr.markForCheck();
  });
}
`
            : usesIconNames
            ? `public icons = ICON_NAMES as IconName[];\n ngOnInit() {\n  ${script}\n}`
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
          ?.replace(/<template/g, '<div *ngIf="allReady"') // // add condition and replace opening tag
          .replace(/<\/template>/g, '</div>'); // replace closing tag
        fileContent = fileContent.replace(templateRegEx, template);

        // prefixing
        fileContent = fileContent.replace(/(<[\w-]+(p-[\w-]+))/g, '$1 $2');

        // create list of p-icons
        iconsHolder = iconsHolder?.replace(
          />(.*?)/g,
          `>
  <p-icon *ngFor="let icon of icons"
    [name]="icon"
    [size]="'inherit'"
    [color]="'inherit'"
    attr.aria-label]="icon + 'icon'"
  ></p-icon>`
        );
        fileContent = fileContent.replace(iconsRegEx, iconsHolder);

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
        const reactImports = [
          (usesComponentsReady || usesQuerySelector) && 'useEffect',
          usesComponentsReady && 'useState',
        ]
          .filter((x) => x)
          .join(', ');
        const componentImports = Array.from(fileContent.matchAll(/<(?:.*)(p-[\w-]+)/g))
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
          .sort(sortFunc)
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

        const useStateOrEffect = usesComponentsReady
          ? `const [allReady, setAllReady] = useState(false);
useEffect(() => {
  componentsReady().then(() => {
    setAllReady(true);
  });
}, []);`
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
          .join('\n')
          .replace(/^(.)/, '\n$1') // leading new line if there is any content
          .replace(/(.)$/, '$1\n') // trailing new line if there is any content
          .replace(/(\n)(.)/g, '$1  $2'); // fix indentation

        // conditional template rendering
        template = template
          ?.replace(/<template/g, '{allReady && (\n  <div') // add condition and replace opening tag
          .replace(/<\/template>/g, '</div>\n)}') // replace closing tag
          .replace(/(\n)([ <)}]+)/g, '$1  $2'); // fix indentation
        fileContent = fileContent.replace(templateRegEx, template);

        // prefixing
        if (usesPrefixing) {
          const [, prefix] = fileContent.match(/<([\w-]+)-p-[\w-]+/) || [];
          console.log('prefix', prefix);
          fileContent = fileContent.replace(new RegExp(`(<\/?)${prefix}-`, 'g'), '$1');
        }

        // attribute conversion
        // TODO: textarea defaultValue
        const attr = textarea?.match(/<textarea>(.*?)<\/textarea>/g).map(function (val) {
          return val.replace(/<\/?textarea>/g, '');
        });
        textarea = textarea
          ?.replace(/<textarea>/g, `<textarea defaultValue="${attr[0]}">`)
          .replace(/<textarea.*>(.*?)<\/textarea>/g, ''); //how can i replace everythings between tags with ''?

        fileContent = fileContent.replace(textareaRegEx, textarea);

        fileContent = fileContent.replace(/ v(alue=)/g, ' defaultV$1'); // for input
        fileContent = fileContent.replace(/ c(hecked)/g, ' defaultC$1'); // for checkbox + radio

        const fragmentTag = usesPrefixing ? 'PorscheDesignSystemProvider' : '';

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
        fileName = path.resolve(rootDirectory, '../components-react/src/pages', fileName);
      }

      // TODO: what about barrel file?
      // TODO: what about routing?

      fs.writeFileSync(fileName, fileContent);
      console.log(`Generated ${fileName.replace(path.resolve(rootDirectory, '..'), '')}`);
    });
};

generateAngularReactVRTPages();
