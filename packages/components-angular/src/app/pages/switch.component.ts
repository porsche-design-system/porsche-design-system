/* Auto Generated File */
// @ts-nocheck
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-switch',
  styles: [
    `
      p-switch ~ p-switch {
        margin-top: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render with defaults">
      <p-switch>Some label</p-switch>
    </div>
    <div class="playground dark" title="should render with defaults with dark theme">
      <p-switch [theme]="'dark'">Some label</p-switch>
    </div>

    <div class="playground light" title="should render in state checked">
      <p-switch [checked]="true">Some label</p-switch>
    </div>
    <div class="playground dark" title="should render in state checked mode with dark theme">
      <p-switch [checked]="true" [theme]="'dark'">Some label</p-switch>
    </div>

    <div class="playground light" title="should render in state disabled">
      <p-switch [disabled]="true">Some label</p-switch>
      <p-switch [disabled]="true" [checked]="true">Some label</p-switch>
    </div>

    <div class="playground dark" title="should render in state disabled with dark theme">
      <p-switch [disabled]="true" [theme]="'dark'">Some label</p-switch>
      <p-switch [disabled]="true" [checked]="true" [theme]="'dark'">Some label</p-switch>
    </div>

    <div class="playground light" title="should render in state loading">
      <p-switch [loading]="true">Some label</p-switch>
      <p-switch [loading]="true" [checked]="true">Some label</p-switch>
    </div>

    <div class="playground dark" title="should render in state loading with dark theme">
      <p-switch [loading]="true" [theme]="'dark'">Some label</p-switch>
      <p-switch [loading]="true" [checked]="true" [theme]="'dark'">Some label</p-switch>
    </div>

    <div class="playground light" title="should align label to the left">
      <p-switch [alignLabel]="'left'">Some label</p-switch>
    </div>
    <div class="playground light" title="should align label to the left or right depending on viewport">
      <p-switch [alignLabel]="{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }">
        Some label
      </p-switch>
    </div>

    <div class="playground light" title="should render without label">
      <p-switch [hideLabel]="true">Some label</p-switch>
    </div>
    <div class="playground light" title="should render with or without label depending on viewport">
      <p-switch [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }">Some label</p-switch>
    </div>

    <div class="playground light" title="should render with stretched label">
      <p-switch [stretch]="true">Some label</p-switch>
      <p-switch [stretch]="true" [alignLabel]="'left'">Some label</p-switch>
    </div>
    <div class="playground light" title="should render with stretched label depending on viewport">
      <p-switch [stretch]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }">Some label</p-switch>
    </div>

    <div class="playground light" title="should render with multiline label">
      <p-switch style="width: 240px">
        This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
      </p-switch>
      <p-switch style="width: 240px" [alignLabel]="'left'">
        This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
      </p-switch>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent {}
