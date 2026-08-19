import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule, type SheetDismissEventDetail } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-sheet-example',
  template: `
    <p-button type="button" [aria]="{ 'aria-haspopup': 'dialog' }" (click)="onOpen()">Open Sheet</p-button>
    <p-text>Last dismissed via: {{ dismissReason ?? 'not dismissed yet' }}</p-text>
    <p-sheet
      [open]="isSheetOpen"
      (dismiss)="onDismiss($event)"
      [aria]="{ 'aria-label': 'A slightly more detailed label' }"
    >
      <p-heading slot="header" size="large" tag="h2">Some Heading</p-heading>
      <p-text>Some Content</p-text>
    </p-sheet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule],
})
export class SheetExampleComponent {
  isSheetOpen = false;
  dismissReason?: SheetDismissEventDetail['reason'];

  onOpen() {
    this.isSheetOpen = true;
  }
  onDismiss(e: CustomEvent<SheetDismissEventDetail>) {
    this.dismissReason = e.detail.reason;
    this.isSheetOpen = false;
  }
}
