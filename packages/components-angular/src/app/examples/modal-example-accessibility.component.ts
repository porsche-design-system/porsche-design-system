import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-modal-example-accessibility',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="handleModalOpen()">Open Modal</p-button>
    <p-modal [open]="isModalOpen" (close)="handleModalClose()">
      <p-text>Some Content</p-text>
      <p-button-group class="footer">
        <p-button>Save</p-button>
        <p-button type="button" [variant]="'tertiary'" [icon]="'close'">Close</p-button>
      </p-button-group>
    </p-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalExampleAccessibilityComponent {
  isModalOpen = false;

  handleModalOpen() {
    this.isModalOpen = true;
  }
  handleModalClose() {
    this.isModalOpen = false;
  }
}
