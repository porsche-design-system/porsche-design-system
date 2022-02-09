/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-link-social',
  styles: [
    `
      p-link-social:not(:last-child) {
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render with label">
      <p-link-social [href]="'https://www.facebook.com'" [icon]="'logo-facebook'">Some label</p-link-social>
      <p-link-social [icon]="'logo-facebook'"><a [href]="'https://www.facebook.com'">Some label</a></p-link-social>
    </div>
    <div class="playground dark" title="should render on dark theme">
      <p-link-social [href]="'https://www.facebook.com'" [icon]="'logo-facebook'" [theme]="'dark'">Some label</p-link-social>
      <p-link-social [icon]="'logo-facebook'" [theme]="'dark'"><a [href]="'https://www.facebook.com'">Some label</a></p-link-social>
    </div>

    <div class="playground light" title="should render without label">
      <p-link-social [href]="'https://www.facebook.com'" [icon]="'logo-facebook'" [hideLabel]="true">Some label</p-link-social>
      <p-link-social [icon]="'logo-facebook'" [hideLabel]="true">
        <a [href]="'https://www.facebook.com'">Some label</a>
      </p-link-social>
    </div>
    <div class="playground dark" title="should render without label on dark theme">
      <p-link-social [href]="'https://www.facebook.com'" [icon]="'logo-facebook'" [hideLabel]="true" [theme]="'dark'">
        Some label
      </p-link-social>
      <p-link-social [icon]="'logo-facebook'" [hideLabel]="true" [theme]="'dark'">
        <a [href]="'https://www.facebook.com'">Some label</a>
      </p-link-social>
    </div>

    <div class="playground light" title="should render with responsive label">
      <p-link-social
        [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
        [href]="'https://www.facebook.com'"
        [icon]="'logo-facebook'"
      >
        Some label
      </p-link-social>
    </div>

    <div class="playground light" title="should render with specific icon">
      <p-link-social [icon]="'logo-delicious'" [href]="'https://www.delicious.com'">Some label</p-link-social>
      <p-link-social [iconSource]="'./assets/icon-custom-kaixin.svg'" [href]="'https://www.kaixin.com'">Some label</p-link-social>
    </div>

    <div class="playground light" title="should render with multiline label">
      <p-link-social style="width: 240px" [icon]="'logo-facebook'" [href]="'https://www.facebook.com'">
        Lorem ipsum dolor sit amet, consetetur sadipscing
      </p-link-social>
      <p-link-social style="width: 240px" [icon]="'logo-facebook'">
        <a [href]="'https://www.facebook.com'">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
      </p-link-social>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkSocialComponent {}
