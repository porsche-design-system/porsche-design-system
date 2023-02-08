import { pascalCase } from 'change-case';
import { convertToAngular } from '@porsche-design-system/storefront/src/utils/convertToAngular';
import { byAlphabet, iconsRegEx, templateRegEx } from './generateVRTPages';

type Characteristics = {
  usesOnInit: boolean;
  usesSetAllReady: boolean;
  usesComponentsReady: boolean;
  usesToast: boolean;
  isIconPage: boolean;
  usesQuerySelector: boolean;
};

export const convertToAngularVRTPage = (
  fileName: string,
  fileContent: string,
  template: string,
  style: string,
  script: string,
  toastText: string,
  characteristics: Characteristics
): { fileName: string; fileContent: string } => {
  const { usesOnInit, usesSetAllReady, usesComponentsReady, usesToast, isIconPage, usesQuerySelector } =
    characteristics;

  const comment = '/* Auto Generated File */';

  // imports
  const angularImports = [
    'ChangeDetectionStrategy',
    'Component',
    usesOnInit && 'OnInit',
    usesSetAllReady && 'ChangeDetectorRef',
  ]
    .filter((x) => x)
    .sort(byAlphabet)
    .join(', ');

  const pdsImports = [(usesSetAllReady || usesComponentsReady) && 'componentsReady', usesToast && 'ToastManager']
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
  const classImplements = usesOnInit ? 'implements OnInit ' : '';
  let classImplementation = '';
  if (usesSetAllReady) {
    classImplementation = `public allReady: boolean = false;

constructor(private cdr: ChangeDetectorRef) {}

ngOnInit() {
  componentsReady().then(() => {
    this.allReady = true;
    this.cdr.markForCheck();
  });
}`;
  } else if (isIconPage) {
    classImplementation = `public icons = ICON_NAMES;`;
  } else if (usesToast) {
    classImplementation = `constructor(private toastManager: ToastManager) {}

ngOnInit() {
  this.toastManager.addMessage({ text: ${toastText} });
}`;
  } else if (usesQuerySelector) {
    classImplementation = `ngOnInit() {
  ${script}
}`;
  }

  classImplementation = classImplementation
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

  fileContent = fileContent
    .replace(/(\n)([ <>]+)/g, '$1    $2') // fix indentation
    .replace(/\\/g, '\\\\') // fix \\ in generated output
    .replace(/`/g, '\\`'); // fix \` in generated output

  fileContent = `${comment}
${imports}

@Component({
  selector: 'page-${fileName}',${styles}
  template: \`
    ${convertToAngular(fileContent)}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${pascalCase(fileName)}Component ${classImplements}{${classImplementation}}
`;

  fileName = `${fileName}.component.ts`;

  return { fileName, fileContent };
};
