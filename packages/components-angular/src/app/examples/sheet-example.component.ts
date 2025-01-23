import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-sheet-example',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Sheet</p-button>
    <p-sheet [open]="isSheetOpen" (dismiss)="onDismiss()" [aria]="{ 'aria-label': 'A slightly more detailed label' }">
      <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
      <p-text>Some Content</p-text>
    </p-sheet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SheetExampleComponent {
  isSheetOpen = false;

  onOpen() {
    this.isSheetOpen = true;
  }
  onDismiss() {
    this.isSheetOpen = false;
  }
}
