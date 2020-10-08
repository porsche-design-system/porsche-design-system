import { Component } from '@angular/core';

@Component({
  selector: 'page-modal',
  template: `
    <div class="playground light" title="should show modal on light background">
      <p-modal [heading]="'Some Heading'" [open]="true">
        Some Content
      </p-modal>
    </div>
  `
})
export class ModalComponent {}
