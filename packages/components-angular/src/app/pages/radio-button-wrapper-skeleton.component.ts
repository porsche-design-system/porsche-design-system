/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-radio-button-wrapper-skeleton',
  styles: [
    `
      .playground > * {
        margin-bottom: 2px;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render radio button skeleton with label">
      <p-radio-button-wrapper [label]="'Some label'">
        <input [type]="'radio'" [name]="'some-name-1'" />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render radio button skeleton without label">
      <p-radio-button-wrapper [label]="'Some label'" [hideLabel]="true">
        <input [type]="'radio'" [name]="'some-name-2'" />
      </p-radio-button-wrapper>
    </div>

    <div class="playground light" title="should render radio button skeleton with multiline label">
      <p-radio-button-wrapper
        [label]="'Lorem ipsum dolor sit amet, consetetur sadipscing'"
        [state]="'error'"
        [message]="'At vero eos et accusam et justo duo dolores et ea rebum.'"
        style="width: 240px"
      >
        <input [type]="'radio'" [name]="'some-name-11'" />
      </p-radio-button-wrapper>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonWrapperSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-radio-button-wrapper').forEach((radioButton) => {
        radioButton.classList.remove('hydrated');
      });
    });
  }
}
