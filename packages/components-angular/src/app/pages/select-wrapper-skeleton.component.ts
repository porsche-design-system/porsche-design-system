/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-wrapper-skeleton',
  template: `
    <div class="playground light" title="should render select skeleton with label">
      <p-select-wrapper [label]="'Some label'">
        <select></select>
      </p-select-wrapper>
    </div>
    <div class="playground dark" title="should render select skeleton with label on dark theme">
      <p-select-wrapper [label]="'Some label'" [theme]="'dark'">
        <select></select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render select skeleton with description">
      <p-select-wrapper [description]="'Some description'">
        <select></select>
      </p-select-wrapper>
    </div>
    <div class="playground dark" title="should render select skeleton with description on dark theme">
      <p-select-wrapper [description]="'Some description'" [theme]="'dark'">
        <select></select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render select skeleton with label and description">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'">
        <select></select>
      </p-select-wrapper>
    </div>
    <div class="playground dark" title="should render select skeleton with label and description on dark theme">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'" [theme]="'dark'">
        <select></select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render select skeleton without label and without description">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true">
        <select></select>
      </p-select-wrapper>
    </div>
    <div class="playground dark" title="should render select skeleton without label and without description on dark theme">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true" [theme]="'dark'">
        <select></select>
      </p-select-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWrapperSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-select-wrapper').forEach((select) => {
        select.classList.remove('hydrated');
      });
    });
  }
}
