import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-canvas-example',
  styles: [
    `
      body {
        overflow-x: hidden;
      }

      p-canvas::part(header) {
        background: #d1fbc6;
      }

      p-canvas::part(main) {
        background: #bed0ff;
      }

      p-canvas::part(footer) {
        background: #f7c6fb;
      }

      p-canvas::part(sidebar-start) {
        background: #ffbebe;
      }

      p-canvas::part(sidebar-end) {
        background: #ffbebe;
      }

      .module {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
      }

      .tile {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: #fff;
      }

      .tile--full {
        grid-column: var(--pds-grid-span-full);
      }

      .tile--one-half {
        grid-column: var(--pds-grid-span-one-half);
      }

      .tile--one-third {
        grid-column: var(--pds-grid-span-one-third);
      }

      .tile--two-thirds {
        grid-column: var(--pds-grid-span-two-thirds);
      }
    `,
  ],
  template: `
    <p-canvas
      [sidebarStartWidth]="'medium'"
      [sidebarEndWidth]="'medium'"
      (dismissSidebarStart)="onDismissSidebarStart()"
      [sidebarStartOpen]="isSidebarStartOpen"
      (dismissSidebarEnd)="onDismissSidebarEnd()"
      [sidebarEndOpen]="isSidebarEndOpen"
    >
      <div slot="header">
        <p-tag color="background-base">Header</p-tag>
        <p-button-pure icon="menu-lines" (click)="onToggleSidebarStart()">Toggle Sidebar Start</p-button-pure>
        <p-button-pure icon="menu-lines" (click)="onToggleSidebarEnd()">Toggle Sidebar End</p-button-pure>
      </div>

      <div class="module">
        <div class="tile tile--full">Full</div>
      </div>
      <div class="module">
        <div class="tile tile--one-half">One Half</div>
        <div class="tile tile--one-half">One Half</div>
      </div>
      <div class="module">
        <div class="tile tile--one-third">One Third</div>
        <div class="tile tile--one-third">One Third</div>
        <div class="tile tile--one-third">One Third</div>
      </div>
      <div class="module">
        <div class="tile tile--one-third">One Third</div>
        <div class="tile tile--two-thirds">Two Thirds</div>
      </div>

      <div slot="footer">
        <p-tag color="background-base">Footer</p-tag>
      </div>
      <div slot="sidebar-start">
        <p-tag color="background-base">Sidebar</p-tag>
      </div>
      <div slot="sidebar-end">
        <p-tag color="background-base">Sidebar</p-tag>
      </div>
    </p-canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasExampleComponent {
  isSidebarStartOpen = false;
  isSidebarEndOpen = false;

  onToggleSidebarStart() {
    this.isSidebarStartOpen = !this.isSidebarStartOpen;
  }
  onDismissSidebarStart() {
    this.isSidebarStartOpen = false;
  }
  onToggleSidebarEnd() {
    this.isSidebarEndOpen = !this.isSidebarEndOpen;
  }
  onDismissSidebarEnd() {
    this.isSidebarEndOpen = false;
  }
}
