import { convertToAngular } from '@porsche-design-system/shared/utils/convertToAngular';
import { pascalCase } from 'change-case';
import { byAlphabet, comment, iconsRegEx, templateRegEx } from './generateVRTPages';

export type AngularCharacteristics = {
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
  characteristics: AngularCharacteristics
): { fileName: string; fileContent: string } => {
  const { usesOnInit, usesSetAllReady, usesComponentsReady, usesToast, isIconPage, usesQuerySelector } =
    characteristics;

  // imports
  const angularImports = [
    'ChangeDetectionStrategy',
    'Component',
    ...(usesOnInit ? ['OnInit'] : []),
    ...(usesSetAllReady ? ['ChangeDetectorRef'] : []),
  ]
    .sort(byAlphabet)
    .join(', ');

  const pdsImports = [
    ...(usesSetAllReady || usesComponentsReady ? ['componentsReady'] : []),
    ...(usesToast ? ['ToastManager'] : []),
  ]
    .sort(byAlphabet)
    .join(', ');

  const imports = [
    `import { ${angularImports} } from '@angular/core';`,
    pdsImports && `import { ${pdsImports} } from '@porsche-design-system/components-angular';`,
    isIconPage && `import { ICON_NAMES } from '@porsche-design-system/icons';`,
  ]
    .filter(Boolean)
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
    .replace(/ data-prefix="my-prefix"/g, '') // get rid of marker
    .replace(/(\n)([ <>]+)/g, '$1    $2') // fix indentation
    .replace(/\\/g, '\\\\') // fix \\ in generated output
    .replace(/`/g, '\\`'); // fix \` in generated output

  const templateContent = convertToAngular(fileContent)
    .replace('[heading]="718"', '[heading]="\'718\'"') // fix "Type 'number' is not assignable to type 'string'"
    .replace(/(<iframe \[src]="'[^"]*)/g, '$1 | safe'); // Fix iframe loading

  fileContent = `${comment}
${imports}

@Component({
  selector: 'page-${fileName}',${styles}
  template: \`
    ${templateContent}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ${pascalCase(fileName)}Component ${classImplements}{${classImplementation}}
`;

  fileName = `${fileName}.component.ts`;

  return { fileName, fileContent };
};
