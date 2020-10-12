import { Component } from '@angular/core';

@Component({
  selector: 'page-modal-basic',
  styles: [
    `
      .playground {
        height: 500px;
        padding: 0;
      }
    `
  ],
  template: `
    <div class="playground light" title="should show basic modal on light background">
      <p-modal [heading]="'Some Heading'" [open]="'true'">
        Some Content
      </p-modal>
    </div>
  `
})
export class ModalBasicComponent {
  constructor() {
    document.body.style.height = '500px';
  }
}
