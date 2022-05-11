import { Component } from '@angular/core';
import { MaskedRange } from 'imask';

/*
tsconfig.json:
...
"compilerOptions": {
  ...
  "paths": {
-   "@porsche-design-system/components-angular": ["dist/components-wrapper"]
+   "@porsche-design-system/components-angular": ["dist/components-wrapper"],
+   "@angular/!*": ["node_modules/@angular/!*"]
...
*/

@Component({
  selector: 'text-field-wrapper-example',
  template: `
    <p-text-field-wrapper [label]="'Some label'">
      <input [type]="'text'" [imask]="mask" />
    </p-text-field-wrapper>
  `,
})
export class TextFieldWrapperExampleComponent {
  public mask = {
    lazy: false,
    mask: 'MM/DD/YYYY',
    blocks: {
      YYYY: {
        mask: MaskedRange,
        from: 1900,
        to: 2100,
        placeholderChar: 'Y',
      },
      MM: {
        mask: MaskedRange,
        from: 1,
        to: 12,
        placeholderChar: 'M',
      },
      DD: {
        mask: MaskedRange,
        from: 1,
        to: 31,
        placeholderChar: 'D',
      },
    },
  };
}
