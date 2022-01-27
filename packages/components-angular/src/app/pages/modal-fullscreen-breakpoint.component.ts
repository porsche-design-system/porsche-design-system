import { Component } from '@angular/core';

@Component({
  selector: 'page-modal-fullscreen-breakpoint',
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
      <p-content-wrapper>
        <div style="background: deeppink; height: 100vh"></div>
      </p-content-wrapper>
      <p-modal
        [heading]="'Some Heading with a very long title across multiple lines'"
        [open]="true"
        [fullscreen]="{ base: true, xs: false, s: true, m: false, l: true, xl: false }"
      >
        Some Content
      </p-modal>
    </div>
  `,
})
export class ModalFullscreenBreakpointComponent {}
