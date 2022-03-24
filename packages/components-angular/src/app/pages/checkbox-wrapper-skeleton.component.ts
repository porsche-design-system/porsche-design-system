/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-checkbox-wrapper-skeleton',
  template: `
    <div class="playground light" title="should render checkbox skeleton with label">
      <p-checkbox-wrapper [label]="'Some label'">
        <input [type]="'checkbox'" />
      </p-checkbox-wrapper>
    </div>

    <div class="playground light" title="should render checkbox skeleton without label">
      <p-checkbox-wrapper [label]="'Some label'" [hideLabel]="true">
        <input [type]="'checkbox'" />
      </p-checkbox-wrapper>
    </div>

    <div class="playground light" title="should render checkbox skeleton with multiline label">
      <p-checkbox-wrapper [label]="'Lorem ipsum dolor sit amet, consetetur sadipscing'" style="width: 240px">
        <input [type]="'checkbox'" />
      </p-checkbox-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxWrapperSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-checkbox-wrapper').forEach((checkbox) => {
        checkbox.classList.remove('hydrated');
      });
    });
  }
}
