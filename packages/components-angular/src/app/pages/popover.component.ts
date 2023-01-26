/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-popover',
  template: `
    <div
      class="playground light"
      title="should render multiple popovers on light background"
      style="position: relative; height: 500px"
    >
      <span style="position: absolute; top: 15%; left: 50vw; transform: translate(-50%)">
        <p-popover>
          <span>
            Some slotted and deeply nested <a [href]="'#'">linked</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text
          </span>
        </p-popover>
      </span>
      <span style="position: absolute; top: 55%; left: 50vw; transform: translate(-50%)">
        <p-popover [direction]="'top'">Top direction</p-popover>
      </span>
      <span style="position: absolute; top: 60%; left: 50vw; transform: translate(-50%)">
        <p-popover [description]="'Some description via prop'"></p-popover>
      </span>
    </div>

    <div class="playground dark" title="should render popover on dark background" style="position: relative; height: 200px">
      <span style="position: absolute; top: 60%; left: 50vw; transform: translate(-50%)">
        <p-popover [theme]="'dark'" [direction]="'top'"
          >Some slotted and deeply nested <a [href]="'#'">linked</a>, <b>bold</b>, <strong>strong</strong>,
          <em>emphasized</em> and <i>italic</i> text in theme dark</p-popover
        >
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {}
