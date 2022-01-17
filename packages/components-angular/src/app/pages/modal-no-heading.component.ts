import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-modal-np-heading',
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
    <div class="playground light" title="should display close button on the correct position without a heading">
      <p-content-wrapper>
        <div style="background: deeppink; height: 100vh"></div>
      </p-content-wrapper>
      <p-modal [open]="true"> Some Content without a heading</p-modal>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalNoHeadingComponent {}
