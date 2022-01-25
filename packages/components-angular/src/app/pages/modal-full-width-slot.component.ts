import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-modal-full-width-slot',
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
    <div class="playground light" title="should display a full width div when using .stretch-to-full-modal-width">
      <p-content-wrapper>
        <div style="background: deeppink; height: 100vh"></div>
      </p-content-wrapper>
      <p-modal [open]="true" [aria]="{ 'aria-label': 'Some Heading' }">
        <div class="stretch-to-full-modal-width" style="background: deeppink; height: 200px"></div>
        <p-text>Some Content between two full width slotted divs</p-text>
        <div class="stretch-to-full-modal-width" style="background: deeppink; height: 200px"></div>
        <p-text>Some Content between two full width slotted divs</p-text>
        <div class="stretch-to-full-modal-width" style="background: deeppink; height: 200px"></div>
      </p-modal>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFullWidthSlotComponent {}
