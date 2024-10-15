import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-canvas-example',
  styles: [
    `
      body {
        overflow-x: hidden;
      }

      .tile {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: lightpink;
      }

      .tile--full {
        grid-column: var(--p-canvas-grid-span-full);
      }

      .tile--one-half {
        grid-column: var(--p-canvas-grid-span-one-half);
      }

      .tile--one-third {
        grid-column: var(--p-canvas-grid-span-one-third);
      }

      .tile--two-thirds {
        grid-column: var(--p-canvas-grid-span-two-thirds);
      }
    `,
  ],
  template: `
    <p-canvas>
      <a slot="title" href="#">App Name</a>

      <div class="p-module p-module--subgrid">
        <div class="tile tile--full">Full</div>
      </div>
      <div class="p-module p-module--subgrid">
        <div class="tile tile--one-half">One Half</div>
        <div class="tile tile--one-half">One Half</div>
      </div>
      <div class="p-module p-module--subgrid">
        <div class="tile tile--one-third">One Third</div>
        <div class="tile tile--one-third">One Third</div>
        <div class="tile tile--one-third">One Third</div>
      </div>
      <div class="p-module p-module--subgrid">
        <div class="tile tile--one-third">One Third</div>
        <div class="tile tile--two-thirds">Two Thirds</div>
      </div>

      <div slot="footer">
        <p-text>Footer</p-text>
      </div>
      <div slot="sidebar-start">
        <p-text>Sidebar Start</p-text>
      </div>
      <div slot="sidebar-end">
        <p-text>Sidebar End</p-text>
      </div>
    </p-canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasExampleComponent {}
