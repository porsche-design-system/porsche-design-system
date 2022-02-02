/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-button',
  styles: [
    `
      p-button:not(:last-child) {
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render button primary with label">
      <p-button [variant]="'primary'">Some label</p-button>
      <p-button [variant]="'primary'" [disabled]="true">Some label</p-button>
      <p-button [variant]="'primary'" [loading]="true">Some label</p-button>
    </div>
    <div class="playground dark" title="should render button primary with label on dark theme">
      <p-button [variant]="'primary'" [theme]="'dark'">Some label</p-button>
      <p-button [variant]="'primary'" [theme]="'dark'" [disabled]="true">Some label</p-button>
      <p-button [variant]="'primary'" [theme]="'dark'" [loading]="true">Some label</p-button>
    </div>

    <div class="playground light" title="should render button primary without label">
      <p-button [variant]="'primary'" [hideLabel]="true">Some label</p-button>
      <p-button [variant]="'primary'" [hideLabel]="true" [disabled]="true">Some label</p-button>
      <p-button [variant]="'primary'" [hideLabel]="true" [loading]="true">Some label</p-button>
    </div>
    <div class="playground dark" title="should render button primary without label on dark theme">
      <p-button [variant]="'primary'" [hideLabel]="true" [theme]="'dark'">Some label</p-button>
      <p-button [variant]="'primary'" [hideLabel]="true" [theme]="'dark'" [disabled]="true">Some label</p-button>
      <p-button [variant]="'primary'" [hideLabel]="true" [theme]="'dark'" [loading]="true">Some label</p-button>
    </div>

    <div class="playground light" title="should render button secondary with label">
      <p-button>Some label</p-button>
      <p-button [disabled]="true">Some label</p-button>
      <p-button [loading]="true">Some label</p-button>
    </div>
    <div class="playground dark" title="should render button secondary with label on dark theme">
      <p-button [theme]="'dark'">Some label</p-button>
      <p-button [theme]="'dark'" [disabled]="true">Some label</p-button>
      <p-button [theme]="'dark'" [loading]="true">Some label</p-button>
    </div>

    <div class="playground light" title="should render button secondary without label">
      <p-button [hideLabel]="true">Some label</p-button>
      <p-button [hideLabel]="true" [disabled]="true">Some label</p-button>
      <p-button [hideLabel]="true" [loading]="true">Some label</p-button>
    </div>
    <div class="playground dark" title="should render button secondary without label on dark theme">
      <p-button [hideLabel]="true" [theme]="'dark'">Some label</p-button>
      <p-button [hideLabel]="true" [theme]="'dark'" [disabled]="true">Some label</p-button>
      <p-button [hideLabel]="true" [theme]="'dark'" [loading]="true">Some label</p-button>
    </div>

    <div class="playground light" title="should render button tertiary with label">
      <p-button [variant]="'tertiary'">Some label</p-button>
      <p-button [variant]="'tertiary'" [disabled]="true">Some label</p-button>
      <p-button [variant]="'tertiary'" [loading]="true">Some label</p-button>
    </div>
    <div class="playground dark" title="should render button tertiary with label on dark theme">
      <p-button [variant]="'tertiary'" [theme]="'dark'">Some label</p-button>
      <p-button [variant]="'tertiary'" [theme]="'dark'" [disabled]="true">Some label</p-button>
      <p-button [variant]="'tertiary'" [theme]="'dark'" [loading]="true">Some label</p-button>
    </div>

    <div class="playground light" title="should render button tertiary without label">
      <p-button [variant]="'tertiary'" [hideLabel]="true">Some label</p-button>
      <p-button [variant]="'tertiary'" [hideLabel]="true" [disabled]="true">Some label</p-button>
      <p-button [variant]="'tertiary'" [hideLabel]="true" [loading]="true">Some label</p-button>
    </div>
    <div class="playground dark" title="should render button tertiary without label on dark theme">
      <p-button [variant]="'tertiary'" [hideLabel]="true" [theme]="'dark'">Some label</p-button>
      <p-button [variant]="'tertiary'" [hideLabel]="true" [theme]="'dark'" [disabled]="true">Some label</p-button>
      <p-button [variant]="'tertiary'" [hideLabel]="true" [theme]="'dark'" [loading]="true">Some label</p-button>
    </div>

    <div class="playground light" title="should render button secondary with responsive label">
      <p-button [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }">Some label</p-button>
    </div>

    <div class="playground light" title="should render button secondary with specific icon">
      <p-button [icon]="'delete'">Some label</p-button>
      <p-button [iconSource]="'./assets/icon-custom-kaixin.svg'">Some label</p-button>
    </div>

    <div class="playground light" title="should render button with multiline label">
      <p-button style="width: 240px">Lorem ipsum dolor sit amet, consetetur sadipscing</p-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
