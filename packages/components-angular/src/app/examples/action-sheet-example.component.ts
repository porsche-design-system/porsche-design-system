import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-action-sheet-example',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Action Sheet</p-button>
    <p-action-sheet [open]="isActionSheetOpen" (dismiss)="onDismiss()" [aria]="{ 'aria-label': 'A slightly more detailed label' }">
      <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
      <p-text>Some Content</p-text>
    </p-action-sheet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ActionSheetExampleComponent {
  isActionSheetOpen = false;

  onOpen() {
    this.isActionSheetOpen = true;
  }
  onDismiss() {
    this.isActionSheetOpen = false;
  }
}
