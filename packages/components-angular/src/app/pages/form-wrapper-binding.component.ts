import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'form-wrapper-binding',
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
})
export class FormWrapperBindingComponent implements OnInit {
  public isEnabled = false;

  public ngOnInit() {
    setTimeout(() => (this.isEnabled = true), 1000);
  }
}
