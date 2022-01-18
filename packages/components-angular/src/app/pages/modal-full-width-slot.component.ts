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
    <div class="playground light" title="should display a full width image when using .stretch-to-full-modal-width">
      <p-content-wrapper>
        <div style="background: deeppink; height: 100vh"></div>
      </p-content-wrapper>
      <p-modal [open]="true"
        ><div class="stretch-to-full-modal-width">
          <div style="background: deeppink; width: 100%; height: 200px"></div>
        </div>
        Some Content below a full width slotted div</p-modal
      >
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFullWidthSlotComponent {}
