/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-link',
  styles: [
    `
      p-link:not(:last-child) {
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render primary with label">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [variant]="'primary'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>
    <div class="playground dark" title="should render primary with label on dark theme">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'" [theme]="'dark'">Some label</p-link>
      <p-link [variant]="'primary'" [theme]="'dark'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light" title="should render primary without label">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'" [hideLabel]="true">Some label</p-link>
      <p-link [variant]="'primary'" [hideLabel]="true"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>
    <div class="playground dark" title="should render primary without label on dark theme">
      <p-link [variant]="'primary'" [href]="'https://www.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some label</p-link>
      <p-link [variant]="'primary'" [hideLabel]="true" [theme]="'dark'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light" title="should render secondary with label">
      <p-link [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>
    <div class="playground dark" title="should render secondary with label on dark theme">
      <p-link [theme]="'dark'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [theme]="'dark'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light" title="should render secondary without label">
      <p-link [href]="'https://www.porsche.com'" [hideLabel]="true">Some label</p-link>
      <p-link [hideLabel]="true"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>
    <div class="playground dark" title="should render secondary without label on dark theme">
      <p-link [theme]="'dark'" [href]="'https://www.porsche.com'" [hideLabel]="true">Some label</p-link>
      <p-link [hideLabel]="true" [theme]="'dark'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light" title="should render tertiary with label">
      <p-link [variant]="'tertiary'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [variant]="'tertiary'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>
    <div class="playground dark" title="should render tertiary with label on dark theme">
      <p-link [variant]="'tertiary'" [href]="'https://www.porsche.com'" [theme]="'dark'">Some label</p-link>
      <p-link [variant]="'tertiary'" [theme]="'dark'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light" title="should render tertiary without label">
      <p-link [variant]="'tertiary'" [href]="'https://www.porsche.com'" [hideLabel]="true">Some label</p-link>
      <p-link [variant]="'tertiary'" [hideLabel]="true"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>
    <div class="playground dark" title="should render tertiary without label on dark theme">
      <p-link [variant]="'tertiary'" [href]="'https://www.porsche.com'" [hideLabel]="true" [theme]="'dark'">Some label</p-link>
      <p-link [variant]="'tertiary'" [hideLabel]="true" [theme]="'dark'"><a [href]="'https://www.porsche.com'">Some label</a></p-link>
    </div>

    <div class="playground light" title="should render secondary with responsive label">
      <p-link [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }" [href]="'https://www.porsche.com'">
        Some label
      </p-link>
    </div>

    <div class="playground light" title="should render secondary with specific icon">
      <p-link [icon]="'phone'" [href]="'https://www.porsche.com'">Some label</p-link>
      <p-link [iconSource]="'./assets/icon-custom-kaixin.svg'" [href]="'https://www.porsche.com'">Some label</p-link>
    </div>

    <div class="playground light" title="should render with multiline label">
      <p-link style="width: 240px" [href]="'https://www.porsche.com'">Lorem ipsum dolor sit amet, consetetur sadipscing</p-link>
      <p-link style="width: 240px">
        <a [href]="'https://www.porsche.com'">Lorem ipsum dolor sit amet, consetetur sadipscing</a>
      </p-link>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {}
