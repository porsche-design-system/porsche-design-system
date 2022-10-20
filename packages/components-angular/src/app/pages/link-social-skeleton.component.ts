/* Auto Generated File */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { componentsReady } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-link-social-skeleton',
  template: `
    <div class="playground light" title="should render link social skeleton with label">
      <p-link-social [href]="'https://www.facebook.com'" [icon]="'logo-facebook'">Some label</p-link-social>
    </div>
    <div class="playground dark" title="should render link social skeleton on dark theme">
      <p-link-social [href]="'https://www.facebook.com'" [icon]="'logo-facebook'" [theme]="'dark'">Some label</p-link-social>
    </div>

    <div class="playground light" title="should render link social skeleton without label">
      <p-link-social [href]="'https://www.facebook.com'" [icon]="'logo-facebook'" [hideLabel]="true">Some label</p-link-social>
    </div>
    <div class="playground dark" title="should render link social skeleton without label on dark theme">
      <p-link-social [href]="'https://www.facebook.com'" [icon]="'logo-facebook'" [hideLabel]="true" [theme]="'dark'">
        Some label
      </p-link-social>
    </div>

    <div class="playground light" title="should render link social skeleton with specific icon">
      <p-link-social [icon]="'logo-delicious'" [href]="'https://www.delicious.com'">Some label</p-link-social>
    </div>

    <div class="playground light" title="should render link social skeleton with multiline label">
      <p-link-social style="width: 240px" [icon]="'logo-facebook'" [href]="'https://www.facebook.com'">
        Lorem ipsum dolor sit amet, consetetur sadipscing
      </p-link-social>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkSocialSkeletonComponent implements OnInit {
  ngOnInit() {
    componentsReady().then(() => {
      document.querySelectorAll('p-link-social').forEach((link) => {
        link.classList.remove('hydrated');
      });
    });
  }
}
