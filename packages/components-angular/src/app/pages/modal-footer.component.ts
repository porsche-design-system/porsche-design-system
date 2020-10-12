import { Component } from '@angular/core';

@Component({
  selector: 'page-modal-footer',
  styles: [
    `
      .playground {
        height: 500px;
        padding: 0;
      }
    `
  ],
  template: `
    <div class="playground light" title="should show modal with footer and without close button on light background">
      <p-modal [heading]="'Some Heading'" [open]="'true'" [disableCloseButton]="'true'">
        Some Content
        <p-modal-footer>
          <p-button>Confirm</p-button>
          <p-button variant="tertiary">Cancel</p-button>
        </p-modal-footer>
      </p-modal>
    </div>
  `
})
export class ModalFooterComponent {
  constructor() {
    document.body.style.height = '500px';
  }
}
