/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-button-skeleton',
  styles: [
    `
      p-button:not(:last-child) {
        margin-right: 0.5rem;
      }
    `,
  ],
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
    // TODO: wait for components ready
    customElements.whenDefined('p-button').then(() => {
      document.querySelectorAll('p-button').forEach((button) => {
        button.classList.remove('hydrated');
      });
    });
  }
}
