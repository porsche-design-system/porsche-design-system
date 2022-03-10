/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-link-skeleton',
  template: `
    <div class="playground light" title="should render link skeleton with label">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'">Some label</p-link>
    </div>
    <div class="playground dark" title="should render link skeleton with label on dark theme">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'" [theme]="'dark'">Some label</p-link>
    </div>

    <div class="playground light" title="should render link skeleton without label">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'" [hideLabel]="true">Some label</p-link>
    </div>
    <div class="playground dark" title="should render link skeleton without label on dark theme">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some label</p-link>
    </div>

    <div class="playground light" title="should render link skeleton with multiline label">
      <p-link style="width: 240px" [href]="'https://www.porsche.com'">Lorem ipsum dolor sit amet, consetetur sadipscing</p-link>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-link').forEach((link) => {
        link.classList.remove('hydrated');
      });
    });
  }
}
