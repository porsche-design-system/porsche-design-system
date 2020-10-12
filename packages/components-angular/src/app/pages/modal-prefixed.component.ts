import { Component } from '@angular/core';

@Component({
  selector: 'page-modal-prefixed',
  styles: [
    `
      .playground {
        height: 500px;
        padding: 0;
      }
    `
  ],
  template: `
    <div class="playground light" title="should show prefixed modal on light background">
      <my-prefix-p-modal [heading]="'Some Heading'" [open]="'true'">
        Some Content
        <my-prefix-p-modal-footer>
          <my-prefix-p-button>Confirm</my-prefix-p-button>
          <my-prefix-p-button variant="tertiary">Cancel</my-prefix-p-button>
        </my-prefix-p-modal-footer>
      </my-prefix-p-modal>
    </div>
  `
})
export class ModalPrefixedComponent {
  constructor() {
    document.body.style.height = '500px';
  }
}
