import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CanvasSidebarStartUpdateEventDetail,
  PorscheDesignSystemModule,
} from '@porsche-design-system/components-angular';
import { breakpointS } from '@porsche-design-system/components-angular/emotion';

@Component({
  selector: 'page-canvas-example',
  styles: [
    `
      .-col-span-full-1 {
        grid-column: 1 / -1;
      }

      .-col-span-full-2 {
        grid-column: 2 / -2;
      }

      .-col-span-full-3 {
        grid-column: 3 / -3;
      }

      .-col-span-4 {
        grid-column: span 4;
      }

      .tile {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: lightpink;
      }
    `,
  ],
  template: `
    <p-canvas
      [sidebarStartOpen]="isSidebarStartOpen"
      [sidebarEndOpen]="isSidebarEndOpen"
      (sidebarStartUpdate)="onSidebarStartUpdate($event)"
      (sidebarEndDismiss)="onSidebarEndDismiss()"
    >
      <a slot="title" href="#">App Name</a>

      <p-button
        slot="header-end"
        icon="configurate"
        variant="secondary"
        [compact]="true"
        [hideLabel]="true"
        (click)="onSidebarEndOpen()"
        >Open sidebar
      </p-button>

      <div class="-p-canvas-grid">
        <p-text class="-col-span-full-1">Content</p-text>

        <div class="tile -col-span-4">Grid span 4x</div>
        <div class="tile -col-span-4">Grid span 4x</div>
        <div class="tile -col-span-4">Grid span 4x</div>

        <div class="tile -col-span-full-1">12 Grid columns</div>
        <div class="tile -col-span-full-2">10 Grid columns</div>
        <div class="tile -col-span-full-3">8 Grid columns</div>
      </div>

      <div slot="footer" class="-p-canvas-grid">
        <p-text class="-col-span-full-1">Footer</p-text>
        <div class="tile -col-span-full-1">12 Grid columns</div>
      </div>

      <div slot="sidebar-start">
        <p-text>Sidebar Start</p-text>
      </div>

      <p-heading slot="sidebar-end-header" tag="h2" size="small"> Sidebar End Header </p-heading>

      <div slot="sidebar-end">
        <p-text>Sidebar End</p-text>
      </div>
    </p-canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class CanvasExampleComponent {
  // initially, sidebar should be closed on mobile and opened on desktop
  isSidebarStartOpen: boolean = window.matchMedia(`(min-width: ${breakpointS}px)`).matches;
  isSidebarEndOpen: boolean = false;

  onSidebarStartUpdate(e: CustomEvent<CanvasSidebarStartUpdateEventDetail>) {
    this.isSidebarStartOpen = e.detail.open;
  }

  onSidebarEndOpen() {
    this.isSidebarEndOpen = true;
  }

  onSidebarEndDismiss() {
    this.isSidebarEndOpen = false;
  }
}
