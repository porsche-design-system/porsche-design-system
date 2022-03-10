/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-button-skeleton',
  template: `
    <div class="playground light" title="should render button skeleton">
      <p-button>Some label</p-button>
    </div>
    <div class="playground dark" title="should render button skeleton on dark theme">
      <p-button [theme]="'dark'">Some label</p-button>
    </div>

    <div class="playground light" title="should render button skeleton without label">
      <p-button [hideLabel]="true">Some label</p-button>
    </div>
    <div class="playground dark" title="should render button skeleton without label on dark theme">
      <p-button [hideLabel]="true" [theme]="'dark'">Some label</p-button>
    </div>

    <div class="playground light" title="should render button skeleton with multiline label">
      <p-button style="width: 240px">Lorem ipsum dolor sit amet, consetetur sadipscing</p-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-button').forEach((button) => {
        button.classList.remove('hydrated');
      });
    });
  }
}
