import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-popover',
  template: `
    <div class="playground light" title="should render multiple popovers" style="height: 500px">
      <span style="position: absolute; top: 20%; left: 50vw; transform: translate(-50%)">
        <p-popover>
          <span
            >Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text</span
          >
        </p-popover>
      </span>
      <span style="position: absolute; top: 55%; left: 50vw; transform: translate(-50%)">
        <p-popover [direction]="'top'">Top Direction</p-popover>
      </span>
      <span style="position: absolute; top: 60%; left: 50vw; transform: translate(-50%)">
        <p-popover [description]="'Some description via prop'"></p-popover>
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {}
