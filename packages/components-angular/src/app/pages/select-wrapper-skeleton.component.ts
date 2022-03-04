/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-select-wrapper-skeleton',
  template: `
    <div class="playground light" title="should render select skeleton with label">
      <p-select-wrapper [label]="'Some label'">
        <select [name]="'some-name'">
          <option [value]="'a'">Option A</option>
          <option [value]="'b'">Option B</option>
          <option [value]="'c'">Option C</option>
        </select>
      </p-select-wrapper>
    </div>
    <div class="playground dark" title="should render select skeleton with label on dark theme">
      <p-select-wrapper [label]="'Some label'" [theme]="'dark'">
        <select [name]="'some-name'">
          <option [value]="'a'">Option A</option>
          <option [value]="'b'">Option B</option>
          <option [value]="'c'">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render select skeleton with description">
      <p-select-wrapper [description]="'Some description'">
        <select [name]="'some-name'">
          <option [value]="'a'">Option A</option>
          <option [value]="'b'">Option B</option>
          <option [value]="'c'">Option C</option>
        </select>
      </p-select-wrapper>
    </div>
    <div class="playground dark" title="should render select skeleton with description on dark theme">
      <p-select-wrapper [description]="'Some description'" [theme]="'dark'">
        <select [name]="'some-name'">
          <option [value]="'a'">Option A</option>
          <option [value]="'b'">Option B</option>
          <option [value]="'c'">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render select skeleton with label and description">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'">
        <select [name]="'some-name'">
          <option [value]="'a'">Option A</option>
          <option [value]="'b'">Option B</option>
          <option [value]="'c'">Option C</option>
        </select>
      </p-select-wrapper>
    </div>
    <div class="playground dark" title="should render select skeleton with label and description on dark theme">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'" [theme]="'dark'">
        <select [name]="'some-name'">
          <option [value]="'a'">Option A</option>
          <option [value]="'b'">Option B</option>
          <option [value]="'c'">Option C</option>
        </select>
      </p-select-wrapper>
    </div>

    <div class="playground light" title="should render select skeleton without label and without description">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true">
        <select [name]="'some-name'">
          <option [value]="'a'">Option A</option>
          <option [value]="'b'">Option B</option>
          <option [value]="'c'">Option C</option>
        </select>
      </p-select-wrapper>
    </div>
    <div class="playground dark" title="should render select skeleton without label and without description on dark theme">
      <p-select-wrapper [label]="'Some label'" [description]="'Some description'" [hideLabel]="true" [theme]="'dark'">
        <select [name]="'some-name'">
          <option [value]="'a'">Option A</option>
          <option [value]="'b'">Option B</option>
          <option [value]="'c'">Option C</option>
        </select>
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
