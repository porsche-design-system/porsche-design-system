/* Auto Generated File */
// @ts-nocheck
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-modal-prefixed',
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
    <div class="playground light" title="should show prefixed modal on light background">
      <my-prefix-p-content-wrapper p-content-wrapper>
        <div style="background: deeppink; height: 100vh"></div>
      </my-prefix-p-content-wrapper>
      <my-prefix-p-modal p-modal [heading]="'Some Heading'" [open]="true">Some Content</my-prefix-p-modal>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPrefixedComponent {}
