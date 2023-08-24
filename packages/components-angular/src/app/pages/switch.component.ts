/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-switch',
  template: `
    <div class="playground light auto-layout" title="should render with defaults">
      <p-switch>Some label</p-switch>
    </div>

    <div class="playground light auto-layout" title="should render in state checked">
      <p-switch [checked]="true">Some label</p-switch>
    </div>

    <div class="playground light auto-layout" title="should render in state disabled">
      <p-switch [disabled]="true">Some label</p-switch>
      <p-switch [disabled]="true" [checked]="true">Some label</p-switch>
    </div>

    <div class="playground light auto-layout" title="should render in state loading">
      <p-switch [loading]="true">Some label</p-switch>
      <p-switch [loading]="true" [checked]="true">Some label</p-switch>
    </div>

    <div class="playground light auto-layout" title="should align label to the left">
      <p-switch [alignLabel]="'left'">Some label</p-switch>
    </div>

    <div class="playground light auto-layout" title="should align label to the left or right depending on viewport">
      <p-switch [alignLabel]="{ base: 'left', xs: 'right', s: 'left', m: 'right', l: 'left', xl: 'right' }">
        Some label
      </p-switch>
    </div>

    <div class="playground light auto-layout" title="should render without label">
      <p-switch [hideLabel]="true">Some label</p-switch>
    </div>
    <div class="playground light auto-layout" title="should render with or without label depending on viewport">
      <p-switch [hideLabel]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }">Some label</p-switch>
    </div>

    <div class="playground light auto-layout" title="should render with stretched label">
      <p-switch [stretch]="true">Some label</p-switch>
      <p-switch [stretch]="true" [alignLabel]="'left'">Some label</p-switch>
    </div>
    <div class="playground light auto-layout" title="should render with stretched label depending on viewport">
      <p-switch [stretch]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }">Some label</p-switch>
    </div>

    <div class="playground light" title="should render with multiline label">
      <p-switch style="max-width: 15rem">
        This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
      </p-switch>
      <p-switch style="max-width: 15rem" [alignLabel]="'left'">
        This is the first time I've seen the word Pneumonoultramicroscopicsilicovolcanoconiosis. It's a long one.
      </p-switch>
    </div>

    <div class="playground light auto-layout" title="should render with slotted and deeply nested anchor">
      <p-switch>
        <span>
          Some slotted and deeply nested <a [href]="'#'">anchor</a>, <b>bold</b>, <strong>strong</strong>,
          <em>emphasized</em> and <i>italic</i> text.
        </span>
      </p-switch>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent {}
