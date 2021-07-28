import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-form-wrapper-binding',
  template: `
    <div class="playground light">
      <p-radio-button-wrapper [label]="'Some Label'">
        <input [type]="'radio'" />
      </p-radio-button-wrapper>

      <p-checkbox-wrapper [label]="'Some Label'">
        <input [type]="'checkbox'" />
      </p-checkbox-wrapper>

      <p-text-field-wrapper [label]="'Some Label'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormWrapperBindingComponent {}
