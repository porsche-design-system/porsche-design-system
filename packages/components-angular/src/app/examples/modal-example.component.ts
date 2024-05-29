import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-modal-example',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Modal</p-button>
    <p-modal [open]="isModalOpen" (dismiss)="onDismiss()" [aria]="{ 'aria-label': 'Some Heading' }">
      <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
      <p-text>Some Content</p-text>
      <p-button-group slot="footer">
        <p-button type="button">Save</p-button>
        <p-button type="button" [variant]="'tertiary'" [icon]="'close'" (click)="onDismiss()">Close</p-button>
      </p-button-group>
    </p-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalExampleComponent {
  isModalOpen = false;

  onOpen() {
    this.isModalOpen = true;
  }
  onDismiss() {
    this.isModalOpen = false;
  }
}
