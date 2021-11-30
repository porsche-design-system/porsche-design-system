import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-popover',
  template: `
    <div class="playground light" title="should render multiple popovers" style="height: 800px; width: 100%">
      <span style="position: absolute; top: 20vh; left: 20vw">
        <p-popover>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna
        </p-popover>
      </span>

      <span style="position: absolute; top: 50vh; left: 50vw">
        <p-popover>
          <span
            >Some slotted and deeply nested <a href="#">linked</a>, <b>bold</b>, <strong>strong</strong>,
            <em>emphasized</em> and <i>italic</i> text</span
          >
        </p-popover>
      </span>

      <span style="position: absolute; bottom: 20vh; right: 20vw">
        <p-popover>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna
        </p-popover>
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent implements OnInit {
  ngOnInit() {
    document.addEventListener(
      'mousedown',
      (e) => {
        e.stopPropagation();
      },
      true
    );
  }
}
