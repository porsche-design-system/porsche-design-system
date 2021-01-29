import { Component } from '@angular/core';

@Component({
  selector: 'page-core-initializer-prefixed',
  template: `
    <div class="playground light">
      <p-text-field-wrapper [label]="'Some Label'" [description]="'Some Description'">
        <input type="text" />
      </p-text-field-wrapper>

      <my-prefix-p-text-field-wrapper p-text-field-wrapper [label]="'Some Label'" [description]="'Some Description'">
        <input type="text" />
      </my-prefix-p-text-field-wrapper>
    </div>
  `,
})
export class CoreInitializerPrefixedComponent {}
