/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-modal-basic',
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
    <div class="playground light" title="should show basic modal on light background">
      <p-content-wrapper>
        <div style="background: deeppink; height: 100vh"></div>
      </p-content-wrapper>
      <p-modal [heading]="'Some Heading'" [open]="true">Some Content</p-modal>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBasicComponent {}
