/* Auto Generated File */
// @ts-nocheck
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-modal-fullscreen',
  styles: [
    `
      .playground {
        height: 500px;
        padding: 0;
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
  template: `
    <div class="playground light" title="should show fullscreen modal on light background">
      <p-modal [heading]="'Some Heading with a very long title across multiple lines'" [open]="true" [fullscreen]="true">
        Some Content
      </p-modal>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFullscreenComponent {}
