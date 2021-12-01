import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-popover',
  template: `
    <div class="playground light" title="should render multiple popovers" style="height: 500px;">
      <p-popover style="top: 50%; left: 50%; margin: -12px 0 0 -12px">
        <span
          >Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,
          <em>emphasized</em> and <i>italic</i> text</span
        >
      </p-popover>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {}
