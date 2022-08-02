import { Component } from '@angular/core';

@Component({
  selector: 'text-field-wrapper-example-search',
  template: `
    <p-text-field-wrapper>
      <input [type]="'search'" />
    </p-text-field-wrapper>
  `,
})
export class TextFieldWrapperExampleSearchComponent {}
