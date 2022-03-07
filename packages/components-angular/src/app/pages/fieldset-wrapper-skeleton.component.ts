/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-fieldset-wrapper-skeleton',
  styles: [
    `
      p-fieldset-wrapper > *:not(:last-child) {
        margin-bottom: 2px;
      }
    `,
  ],
  template: `
    <div
      class="playground light"
      title="should render fieldset skeleton with label and text-field-wrapper with defined spacing"
    >
      <p-fieldset-wrapper [label]="'Some label'">
        <p-text-field-wrapper [label]="'Some label'">
          <input [type]="'text'" [name]="'some-name'" />
        </p-text-field-wrapper>
      </p-fieldset-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetWrapperSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-fieldset-wrapper p-text-field-wrapper').forEach((fieldset) => {
        fieldset.classList.remove('hydrated');
      });
    });
  }
}
