/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-button-pure-skeleton',
  styles: [
    `
      p-button:not(:last-child) {
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render button skeleton">
      <p-button-pure>Some label</p-button-pure>
    </div>
    <div class="playground dark" title="should render button skeleton on dark theme">
      <p-button-pure [theme]="'dark'">Some label</p-button-pure>
    </div>

    <div class="playground light" title="should render button skeleton without label">
      <p-button-pure [hideLabel]="true">Some label</p-button-pure>
    </div>
    <div class="playground dark" title="should render button skeleton without label on dark theme">
      <p-button-pure [hideLabel]="true" [theme]="'dark'">Some label</p-button-pure>
    </div>

    <div class="playground light" title="should render button skeleton with multiline label">
      <p-button-pure style="width: 240px">Lorem ipsum dolor sit amet, consetetur sadipscing</p-button-pure>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPureSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-button-pure').forEach((button) => {
        button.classList.remove('hydrated');
      });
    });
  }
}
