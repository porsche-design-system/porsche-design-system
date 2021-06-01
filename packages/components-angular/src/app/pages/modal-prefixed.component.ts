import { Component } from '@angular/core';

@Component({
  selector: 'page-modal-prefixed',
  styles: [
    `
      .playground {
        height: 500px;
        padding: 0;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should show prefixed modal on light background">
      <my-prefix-p-modal p-modal [heading]="'Some Heading'" [open]="true">Some Content</my-prefix-p-modal>
    </div>
  `,
})
export class ModalPrefixedComponent {
  constructor() {
    document.body.style.height = '500px';
  }
}
