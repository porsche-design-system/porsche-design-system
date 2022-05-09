import { Component } from '@angular/core';

@Component({
  selector: 'text-field-wrapper-example',
  template: `
    <p-text-field-wrapper [label]="'Label responsive'" [description]="'Some description'">
      <input [type]="'text'" [value]="'Responsive label and description'" [imask]="{ mask: 'DD.MM.YYY' }" />
    </p-text-field-wrapper>
  `,
})
export class TextFieldWrapperExampleComponent {}
