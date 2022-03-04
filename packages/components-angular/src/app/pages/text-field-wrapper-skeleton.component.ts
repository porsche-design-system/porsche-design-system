/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-text-field-wrapper-skeleton',
  template: `
    <div class="playground light" title="should render text field skeleton with label">
      <p-text-field-wrapper [label]="'Label'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render text field skeleton with description">
      <p-text-field-wrapper [description]="'Some description'">
        <input [type]="'text'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render text field skeleton with label, description and placeholder">
      <p-text-field-wrapper [label]="'Label with description and placeholder'" [description]="'Some description'">
        <input [type]="'text'" [placeholder]="'Some placeholder'" />
      </p-text-field-wrapper>
    </div>

    <div class="playground light" title="should render text field skeleton without label and without description">
      <p-text-field-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true">
        <input [type]="'text'" [value]="'Without label and description'" />
      </p-text-field-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldWrapperSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-text-field-wrapper').forEach((textField) => {
        textField.classList.remove('hydrated');
      });
    });
  }
}
